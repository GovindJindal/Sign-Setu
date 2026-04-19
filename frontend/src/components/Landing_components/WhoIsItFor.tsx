"use client";

import React from 'react';
import { motion } from "motion/react";
import { GraduationCap, BookOpen, Globe, Check, Users, School, Building2 } from 'lucide-react';

export default function WhoItsFor() {
  const audiences = [
    {
      icon: School,
      title: "Educators",
      description: "Make your classrooms truly inclusive. SignSetu provides real-time translation for lectures and study materials.",
      features: ["Live Lesson Signing", "Interactive Learning", "Accessibility Compliance"]
    },
    {
      icon: GraduationCap,
      title: "Students",
      description: "No more missing out on lectures. Convert any university audio or text materials into visual ISL signatures.",
      features: ["Study Companion", "Lecture Summaries", "Academic Growth"]
    },
    {
      icon: Building2,
      title: "Organizations",
      description: "Foster a diverse workplace. We help NGOs and companies communicate seamlessly with deaf colleagues and clients.",
      features: ["Meeting Accessibility", "HR Inclusivity", "Scalable Training"]
    }
  ];

  return (
    <section id="who-its-for" className="relative py-24 overflow-hidden border-t border-white/5">
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Built for <span className="text-gradient">everyone's</span> voice
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From individual learners to large-scale organizations, we provide the tools to make communication universal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-3xl glass border border-white/10 flex flex-col hover:border-accent/40 transition-colors"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                <audience.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{audience.title}</h3>
              <p className="text-muted-foreground text-base mb-8 leading-relaxed flex-grow">
                {audience.description}
              </p>
              
              <ul className="space-y-3 pt-6 border-t border-white/5">
                {audience.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm text-white/70">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}