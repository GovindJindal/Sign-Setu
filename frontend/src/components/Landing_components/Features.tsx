"use client";

import React from 'react';
import { motion } from "motion/react";
import { FileText, Mic, Hand, Presentation, Sparkles, Languages, Cpu, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Mic,
      title: "Real-time Voice to Sign",
      description: "Our state-of-the-art STT engine captures spoken words and translates them into fluid sign language animations instantly.",
      color: "primary"
    },
    {
      icon: FileText,
      title: "File-based Translation",
      description: "Upload PDFs, text documents, or audio files and let SignSetu generate a comprehensive sign-language companion for your content.",
      color: "accent"
    },
    {
      icon: Cpu,
      title: "3D Animation Engine",
      description: "Proprietary hand-tracking and rendering technology ensures movements are grammatically correct and culturally accurate to ISL.",
      color: "primary"
    },
    {
      icon: Presentation,
      title: "Overlaid Scripting",
      description: "Perfect for education: overlay 3D signing avatars directly onto your presentation slides or online study material.",
      color: "accent"
    }
  ];

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-primary mb-6"
          >
            <Zap className="h-3.5 w-3.5" />
            Core Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Bridge the gap with <span className="text-gradient">smarter tools</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            We've combined advanced natural language processing with high-fidelity 3D rendering to create the most intuitive translation experience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative p-8 rounded-3xl glass border border-white/10 hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${
                  feature.color === 'primary' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                } shadow-[0_0_20px_rgba(139,92,246,0.15)] group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                  {feature.title}
                  {index === 3 && (
                    <span className="text-[10px] uppercase tracking-widest bg-primary/20 text-primary px-2 py-0.5 rounded-full">beta</span>
                  )}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.description}
                </p>

                <div className="mt-8 flex items-center gap-4 text-xs font-medium text-white/40 uppercase tracking-widest">
                  <div className="h-px flex-1 bg-white/5" />
                  <span>Powered by SignSense</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}