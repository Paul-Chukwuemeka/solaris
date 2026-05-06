import React from "react";
import { Award, Users, Heart } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Installations", value: "450+", icon: <Users className="w-6 h-6" /> },
    { label: "States Covered", value: "12", icon: <Award className="w-6 h-6" /> },
    { label: "Customer Satisfaction", value: "98%", icon: <Heart className="w-6 h-6" /> },
  ];

  return (
    <section id="about" className="py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-surface border border-border rounded-[8px] overflow-hidden mt-10 p-2">
                <img 
                  src="https://images.unsplash.com/photo-1624397648246-47ce3a4d8be0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Wine Press Solar technician — professional solar installation engineer in Nigeria"
                  className="w-full h-full object-cover rounded-[4px] grayscale"
                />
              </div>
              <div className="aspect-square bg-primary border border-border rounded-[8px] p-8 flex flex-col justify-end">
                <p className="text-background font-display font-black text-5xl mb-2 tracking-tighter">3+</p>
                <p className="text-background text-[10px] font-black uppercase tracking-widest leading-tight">Years of Solar Excellence</p>
              </div>
              <div className="col-span-2 aspect-[2/1] bg-surface border border-border rounded-[8px] overflow-hidden p-2">
                <img 
                  src="https://images.unsplash.com/photo-1594398901394-4e34939a4fe0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Monocrystalline solar panels installed on a rooftop by Wine Press Solar Services in Nigeria"
                  className="w-full h-full object-cover rounded-[4px] grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            {/* Structural accent block */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-l-4 border-t-4 border-primary/20 pointer-events-none"></div>
          </div>

          <div>
            <h3 className="text-primary font-black tracking-widest uppercase text-xs mb-4 italic">Our Mission</h3>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              Powering the Future of <br />
              <span className="text-primary italic">Nigerian Innovation.</span>
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed mb-10 font-medium">
              Wine Press Solar Services was founded with a single mission: to eliminate the energy barrier for Nigerian households and SMEs. 
              We provide structured, high-availability electricity solutions that serve as the foundation for growth.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t-2 border-border">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-primary mb-3">{stat.icon}</div>
                  <p className="font-display font-black text-3xl text-foreground leading-none mb-2 tracking-tighter">{stat.value}</p>
                  <p className="text-secondary-text text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
