"use client";

import React from 'react';
import { motion } from "motion/react";
import { Upload, ArrowRight, Hand, Sparkles, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CTA() {
  const router = useRouter();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with dramatic lighting */}
      <div className="absolute inset-0 bg-background pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[160px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="glass rounded-[3rem] p-10 md:p-20 border border-white/10 text-center overflow-hidden relative">
          {/* Decorative floating icons */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 left-10 text-primary/20 opacity-40 hidden md:block"
          >
            <Hand size={80} strokeWidth={1} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-10 right-10 text-accent/20 opacity-40 hidden md:block"
          >
            <MessageSquare size={80} strokeWidth={1} />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white mb-8 border border-white/10"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Empower Through Innovation
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
            >
              Ready to break the <br />
              <span className="text-gradient">communication barrier?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-xl mb-12"
            >
              Join the movement towards a more inclusive world. SignSetu is 
              completely free to get started. Choose your mode and begin the bridge.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <button
                onClick={() => router.push("/speech-to-text")}
                className="group relative px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-glow"
              >
                Launch Live App
              </button>
              <button
                onClick={() => router.push("/upload")}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full glass border border-white/10 font-semibold text-white/90 hover:bg-white/10 transition-all"
              >
                Try Direct Upload
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>

            <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-3 gap-8 grayscale opacity-50">
               <div className="text-center">
                 <div className="text-2xl font-bold text-white mb-1">Open Source</div>
                 <div className="text-[10px] uppercase tracking-widest">Community Project</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-white mb-1">Zero Cost</div>
                 <div className="text-[10px] uppercase tracking-widest">Always Free</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-white mb-1">Privacy First</div>
                 <div className="text-[10px] uppercase tracking-widest">Local Processing</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}