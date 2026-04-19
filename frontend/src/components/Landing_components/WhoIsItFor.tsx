"use client";

import React from 'react';
import { GraduationCap, BookOpen, Globe } from 'lucide-react';

const WhoItsFor = () => {
  const audiences = [
    {
      icon: GraduationCap,
      title: "Teachers & Classrooms",
      description: "Help students with hearing impairments keep up with lessons.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Inclusive lesson delivery", "Real-time translation", "Better student engagement"]
    },
    {
      icon: BookOpen,
      title: "Students",
      description: "Understand lessons, lectures, or notes in sign language.",
      gradient: "from-purple-500 to-pink-500",
      features: ["Enhanced learning", "Better comprehension", "Academic success"]
    },
    {
      icon: Globe,
      title: "NGOs & Accessibility Teams",
      description: "Promote inclusive communication at scale.",
      gradient: "from-green-500 to-teal-500",
      features: ["Scalable solutions", "Community impact", "Accessibility advocacy"]
    }
  ];

  return (
    <section id="who-its-for" className="py-20 px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fadeInUp">
            Who It&apos;s For
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Empowering diverse communities to communicate without barriers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`bg-gradient-to-r ${audience.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                <audience.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{audience.title}</h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">{audience.description}</p>
              
              <ul className="space-y-2">
                {audience.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;