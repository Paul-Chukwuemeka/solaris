import React from "react";
import Link from "next/link";
import { Sun, Phone, Mail, MapPin, Globe, Camera, Briefcase } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Sun className="text-primary w-8 h-8" />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight leading-none uppercase">WINE PRESS</span>
              <span className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase leading-none mt-1">Solar Services</span>
            </div>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
            Nigeria's leading provider of smart, reliable solar energy solutions. 
            Empowering homes and businesses with clean energy since 2021.
          </p>
          <div className="flex gap-3">
            {[Globe, Camera, Briefcase].map((Icon, idx) => (
              <a key={idx} href="#" className="p-3 bg-white/5 border border-white/10 rounded-[8px] hover:bg-primary hover:text-slate-950 transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-primary">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
            <li><a href="#services" className="hover:text-primary transition-colors">Our Services</a></li>
            <li><a href="#projects" className="hover:text-primary transition-colors">Project Gallery</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><Link href="/calculator" className="hover:text-primary transition-colors">Solar Calculator</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-primary">Contact Us</h4>
          <ul className="flex flex-col gap-6 text-slate-400 text-sm font-medium">
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>123 Solar Way, Victoria Island,<br />Lagos, Nigeria</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+234 800 SOLAR LIFE</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>hello@winepresssolar.com</span>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-primary">Status</h4>
          <ul className="flex flex-col gap-4 text-slate-400 text-sm font-medium">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li className="mt-4">
              <div className="bg-white/5 p-6 rounded-[8px] border border-white/10">
                <p className="text-[10px] uppercase font-black text-primary mb-2 tracking-widest">Operating Hours</p>
                <p className="text-white font-black text-lg uppercase tracking-tighter">Mon - Sat: 8am - 6pm</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[10px] uppercase tracking-[0.2em] font-black">
        <p>© {currentYear} Wine Press Solar Services.</p>
        <div className="flex gap-8">
          <span>RC: 123456789</span>
          <span>Built for Performance</span>
        </div>
      </div>
    </footer>
  );
}
