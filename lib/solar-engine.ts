import pricingConfig from "./pricing-config.json";

// Type definitions for config validation
interface RegionConfig {
  psh: number;
  label: string;
  panel_derating_factor: number;
}

interface BatteryConfig {
  cost_per_ah: Record<string, number>;
  dod: number;
  efficiency: number;
  min_ah: number;
}

interface InverterConfig {
  cost_per_kva: number;
  safety_margin: number;
  min_kva: number;
}

interface PanelConfig {
  cost_per_watt: number;
  standard_derating: number;
  min_watts: number;
}

interface SolarGenerator {
  name: string;
  max_wh: number;
  cost: number;
  label: string;
}

interface PricingConfigType {
  equipment: {
    panels: PanelConfig;
    batteries: Record<string, BatteryConfig>;
    inverters: {
      pure_sine: InverterConfig;
    };
    solar_generators: SolarGenerator[];
  };
  regions: Record<string, RegionConfig>;
  installation_fee_percentage: number;
}

// Validate config at runtime
const config = pricingConfig as PricingConfigType;

export interface LoadItem {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  hours: number;
}

export interface CalculationResult {
  dailyEnergyWh: number;
  totalWattage: number;
  inverterKva: number;
  panelWattsRequired: number;
  batteryAhRequired: number;
  systemVoltage: number;
  batteryAutonomyDays: number;
  systemType: "custom" | "generator";
  generatorName?: string;
  estimatedCost: {
    min: number;
    max: number;
  };
  breakdown: {
    panels: number;
    batteries: number;
    inverter: number;
    installation: number;
  };
}

export interface SystemCalculationParams {
  loads: LoadItem[];
  region: keyof typeof config.regions;
  batteryType: "lithium" | "tubular";
  systemTypePreference?: "custom" | "generator";
  selectedGeneratorName?: string;
  systemVoltage?: 12 | 24 | 48;
  batteryAutonomyDays?: number;
  costUncertaintyMargin?: number;
}

// Constants
const COST_UNCERTAINTY_MARGIN = 0.1; // ±10% for material/labor variance
const DEFAULT_SYSTEM_VOLTAGE = 48;
const DEFAULT_BATTERY_AUTONOMY = 1;

/**
 * Validates input loads
 */
function validateLoads(loads: LoadItem[]): void {
  if (!loads || loads.length === 0) {
    throw new Error("At least one load is required");
  }

  loads.forEach((load, index) => {
    if (load.watts < 0) {
      throw new Error(`Load ${index}: watts cannot be negative`);
    }
    if (load.quantity < 1) {
      throw new Error(`Load ${index}: quantity must be at least 1`);
    }
    if (load.hours < 0 || load.hours > 24) {
      throw new Error(`Load ${index}: hours must be between 0 and 24`);
    }
  });
}

/**
 * Validates region exists in config
 */
function validateRegion(region: keyof typeof config.regions): RegionConfig {
  const regionConfig = config.regions[region];
  if (!regionConfig) {
    const validRegions = Object.keys(config.regions).join(", ");
    throw new Error(
      `Invalid region "${String(region)}". Valid regions: ${validRegions}`
    );
  }
  return regionConfig;
}

/**
 * Validates battery type exists in config
 */
function validateBatteryType(
  batteryType: "lithium" | "tubular"
): BatteryConfig {
  const batteryConfig = config.equipment.batteries[batteryType];
  if (!batteryConfig) {
    throw new Error(
      `Invalid battery type "${batteryType}". Valid types: lithium, tubular`
    );
  }
  return batteryConfig;
}

/**
 * Gets battery cost per Ah for the specified voltage
 */
function getBatteryCostPerAh(
  batteryConfig: BatteryConfig,
  voltage: number
): number {
  const key = `${voltage}v`;
  const cost = batteryConfig.cost_per_ah[key];
  if (cost === undefined) {
    const validVoltages = Object.keys(batteryConfig.cost_per_ah).join(", ");
    throw new Error(
      `No pricing for ${voltage}V batteries. Available: ${validVoltages}`
    );
  }
  return cost;
}

/**
 * Main solar system calculator
 */
export function calculateSystem(
  params: SystemCalculationParams
): CalculationResult {
  const {
    loads,
    region,
    batteryType,
    systemTypePreference,
    selectedGeneratorName,
    systemVoltage = DEFAULT_SYSTEM_VOLTAGE,
    batteryAutonomyDays = DEFAULT_BATTERY_AUTONOMY,
    costUncertaintyMargin = COST_UNCERTAINTY_MARGIN,
  } = params;

  // Input validation
  validateLoads(loads);
  const regionConfig = validateRegion(region);
  const batteryConfig = validateBatteryType(batteryType);
  const invConfig = config.equipment.inverters.pure_sine;
  const panelConfig = config.equipment.panels;

  if (![12, 24, 48].includes(systemVoltage)) {
    throw new Error("System voltage must be 12V, 24V, or 48V");
  }

  if (batteryAutonomyDays < 1 || batteryAutonomyDays > 30) {
    throw new Error("Battery autonomy must be between 1 and 30 days");
  }

  if (costUncertaintyMargin < 0 || costUncertaintyMargin > 0.5) {
    throw new Error("Cost uncertainty margin must be between 0 and 50%");
  }

  // 1. Total Daily Energy (Wh/day)
  const dailyEnergyWh = loads.reduce(
    (sum, item) => sum + item.watts * item.quantity * item.hours,
    0
  );

  // 2. Total Instantaneous Load (Watts)
  const totalWattage = loads.reduce(
    (sum, item) => sum + item.watts * item.quantity,
    0
  );

  // 3. Inverter Sizing (kVA)
  // Apply safety margin to account for peak loads and power factor
  const inverterWatts = totalWattage * invConfig.safety_margin;
  const inverterKva = Math.max(invConfig.min_kva, Math.ceil(inverterWatts / 1000));

  // 4. Panel Sizing (Watts)
  // (Wh/day * Regional Derating Factor) / Peak Sun Hours
  const panelWattsRequired = Math.max(
    panelConfig.min_watts,
    Math.ceil((dailyEnergyWh * regionConfig.panel_derating_factor) / regionConfig.psh)
  );

  // 5. Battery Sizing (Ah @ system voltage)
  // (Wh/day * Autonomy Days) / (Voltage * Depth of Discharge * Efficiency)
  const batteryAhRequired = Math.max(
    batteryConfig.min_ah,
    Math.ceil(
      (dailyEnergyWh * batteryAutonomyDays) /
        (systemVoltage * batteryConfig.dod * batteryConfig.efficiency)
    )
  );

  // 6. Cost Estimation (Naira)
  const panelCost = panelWattsRequired * panelConfig.cost_per_watt;
  const batteryCostPerAh = getBatteryCostPerAh(batteryConfig, systemVoltage);
  const batteryCost = batteryAhRequired * batteryCostPerAh;
  const inverterCost = inverterKva * invConfig.cost_per_kva;
  const installationCost =
    (panelCost + batteryCost + inverterCost) *
    config.installation_fee_percentage;

  const total = panelCost + batteryCost + inverterCost + installationCost;

  // 7. Check for Solar Generator Alternative
  // If the energy requirement is low enough, recommend a generator instead
  const suitableGenerator = selectedGeneratorName 
    ? config.equipment.solar_generators.find(g => g.name === selectedGeneratorName)
    : config.equipment.solar_generators
        .sort((a, b) => a.max_wh - b.max_wh)
        .find(g => g.max_wh >= dailyEnergyWh);

  const shouldSuggestGenerator = 
    systemTypePreference === "generator" || 
    (systemTypePreference !== "custom" && dailyEnergyWh < 2500);

  if (suitableGenerator && shouldSuggestGenerator) {
    return {
      dailyEnergyWh,
      totalWattage,
      inverterKva: 0, // Not applicable for generators
      panelWattsRequired: 0,
      batteryAhRequired: 0,
      systemVoltage: 12, // Standard internal voltage for small generators
      batteryAutonomyDays: 1,
      systemType: "generator",
      generatorName: suitableGenerator.name,
      estimatedCost: {
        min: suitableGenerator.cost * 0.95,
        max: suitableGenerator.cost * 1.05,
      },
      breakdown: {
        panels: 0,
        batteries: suitableGenerator.cost,
        inverter: 0,
        installation: 0,
      },
    };
  }

  return {
    dailyEnergyWh,
    totalWattage,
    inverterKva,
    panelWattsRequired,
    batteryAhRequired,
    systemVoltage,
    batteryAutonomyDays,
    systemType: "custom",
    estimatedCost: {
      min: total * (1 - costUncertaintyMargin),
      max: total * (1 + costUncertaintyMargin),
    },
    breakdown: {
      panels: panelCost,
      batteries: batteryCost,
      inverter: inverterCost,
      installation: installationCost,
    },
  };
}