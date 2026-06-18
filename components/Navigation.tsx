"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Menu, X, Calculator, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "#faq" },
  ];

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-200 border-b ${
        scrolled 
          ? "bg-background border-border" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Sun className="text-primary w-6 h-6" />
          <div className="flex flex-col">
            <span className="font-display font-black text-lg tracking-tight leading-none">Winepress</span>
            <span className="text-[8px] tracking-[0.2em] font-bold text-primary uppercase leading-none mt-1">Solar Services</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="h-6 w-px bg-border mx-2"></div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 border border-border rounded-[8px] hover:bg-surface transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/calculator"
            className="btn-flat btn-primary text-xs uppercase tracking-widest"
          >
            <Calculator className="w-4 h-4" />
            Calculate Cost
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
           <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 border border-border rounded-[8px]"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Flat UI */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border absolute top-full w-full py-8 px-6 flex flex-col gap-6 animate-fade-in shadow-none">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest border-b border-border pb-4"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Link
            href="/calculator"
            className="btn-flat btn-primary"
            onClick={() => setIsOpen(false)}
          >
            <Calculator className="w-5 h-5" />
            Solar Calculator
          </Link>
        </div>
      )}
    </nav>
  );
}
