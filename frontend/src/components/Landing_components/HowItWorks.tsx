"use client";

import React from 'react';
import { motion } from "motion/react";
import { Upload, Cpu, Play, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HowItWorks() {
  const router = useRouter();

  const steps = [
    {
      icon: Upload,
      title: "Input Source",
      description: "Speak directly into your mic or upload audio/text files.",
      details: ["Real-time Audio", "PDF/Text Docs", "Live Feed"]
    },
    {
      icon: Cpu,
      title: "AI Processing",
      description: "Our backend normalizes the text and maps it to sign glosses.",
      details: ["NLP Mapping", "ISL Grammar", "Low Latency"]
    },
    {
      icon: Play,
      title: "3D Visualization",
      description: "Watch the 3D avatar render fluid, accurate sign language.",
      details: ["60 FPS Flow", "Clear Gestures", "Interactive View"]
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden border-t border-white/5">
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-accent mb-6"
          >
            <Zap className="h-3.5 w-3.5" />
            Seamless Pipeline
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Engineered for <span className="text-gradient">precision</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From raw audio to expressive 3D animations in milliseconds.
          </p>
        </div>

        <div className="relative">
          {/* Animated path line (Desktop only) */}
          <div className="hidden md:block absolute top-[15%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="relative mb-8 flex justify-center">
                  <div className="h-24 w-24 rounded-[2rem] glass border border-white/10 flex items-center justify-center shadow-glow-sm group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="h-10 w-10 text-primary" />
                    <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-background border border-white/10 flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-8 text-lg">{step.description}</p>
                
                <ul className="inline-block text-left space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/50">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-6"
        >
          <button 
            onClick={() => router.push("/speech-to-text")}
            className="group inline-flex items-center gap-2 glass px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all"
          >
            Launch Live STT
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={() => router.push("/upload")}
            className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-bold hover:bg-white/90 transition-all"
          >
            Start Translating Files
          </button>
        </motion.div>
      </div>
    </section>
  );
}