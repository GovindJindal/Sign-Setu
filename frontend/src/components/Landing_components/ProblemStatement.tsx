"use client";

import React from 'react';
import { motion } from "motion/react";
import { AlertCircle, Users, MessageSquare, Heart, ShieldAlert, Globe } from 'lucide-react';

export default function ProblemStatement() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-red-400 mb-6">
              <ShieldAlert className="h-3.5 w-3.5" />
              The Accessibility Gap
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Why <span className="text-red-400">ISL accessibility</span> matters more than ever.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-red-400/10 flex items-center justify-center text-red-400">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Global Isolation</h4>
                  <p className="text-muted-foreground">Most digital content lacks sign language support, leaving millions of ISL users isolated from critical information.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">63 Million+ Voices</h4>
                  <p className="text-muted-foreground">In India alone, over 63 million people are deaf or hard-of-hearing, yet professional translators are scarce.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Dignity in Communication</h4>
                  <p className="text-muted-foreground">Accessibility isn't a feature; it's a fundamental right. SignSetu provides the dignity of real-time understanding.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-[3rem] blur-3xl opacity-50" />
            <div className="glass relative rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                 <AlertCircle size={120} />
               </div>
               
               <p className="text-2xl md:text-3xl font-light leading-relaxed italic text-white/90">
                "The biggest barrier isn't the inability to hear, but the 
                <span className="font-bold text-red-400"> lack of tools </span> 
                that bridge the gap between spoken words and the visual beauty of 
                <span className="font-bold text-white"> Indian Sign Language</span>."
              </p>
              
              <div className="mt-12 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-primary flex items-center justify-center font-bold text-white">SS</div>
                <div>
                  <div className="font-semibold text-white">The SignSetu Mission</div>
                  <div className="text-sm text-white/50">Founded for Inclusion</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}