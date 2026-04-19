"use client";

import React from 'react';
import { FileText, Mic, Hand, FileImage } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Multi-format Input",
      description: "Upload files in text, audio, or video format—we process them all.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mic,
      title: "Real-time Transcription",
      description: "We transcribe spoken language using powerful speech-to-text models.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Hand,
      title: "3D Sign Language Rendering",
      description: "Hand gestures rendered in real-time using Three.js for a dynamic, clear representation.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: FileImage,
      title: "Scripted Slide Generator (Coming soon!)",
      description: "For long content, we auto-generate slides with gestures overlaid for better understanding. ",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fadeInUp">
            What MIME.ai Offers
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Cutting-edge technology to break down communication barriers and create inclusive experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;