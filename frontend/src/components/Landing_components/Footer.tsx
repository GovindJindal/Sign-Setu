"use client";

import React from 'react';
import { Mail, Twitter, Github, Linkedin, Heart, Hand } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-background pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-tr from-primary to-accent p-0.5 shadow-glow-sm">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
                   <Hand className="h-6 w-6 text-primary" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tighter">SignSetu</span>
            </div>
            <p className="text-muted-foreground text-lg mb-8 max-w-sm leading-relaxed">
              Bridging the gap between spoken language and Indian Sign Language through real-time AI technology. 
              Making communication universal, one gesture at a time.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Github, label: "GitHub" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Mail, label: "Email" },
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className="h-10 w-10 flex items-center justify-center rounded-full glass border border-white/5 text-muted-foreground hover:text-white hover:border-white/20 hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Platform</h3>
            <ul className="space-y-4">
              {["Home", "Features", "How It Works", "Who It's For"].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Foundation</h3>
            <ul className="space-y-4">
              {["Documentation", "Open Source", "ISL Standards", "Impact Labs"].map(item => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-muted-foreground text-sm flex items-center gap-2">
            © 2025 SignSetu. Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in India.
          </div>
          <div className="flex gap-8 text-xs font-medium text-white/30 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>

      {/* Subtle bottom orb */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg h-[200px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}