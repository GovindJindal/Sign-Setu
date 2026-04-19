"use client";

import React from 'react';
import { Upload, Cpu, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HowItWorks = () => {
  const router  = useRouter();

  const steps = [
    {
      icon: Upload,
      title: "Select or drag a file",
      description: "Upload audio, video, or text files",
      color: "blue"
    },
    {
      icon: Cpu,
      title: "We transcribe and normalize",
      description: "Our backend processes the input intelligently",
      color: "purple"
    },
    {
      icon: Play,
      title: "Watch 3D hands animate",
      description: "See the translated sign language in real-time",
      color: "green"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-8 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fadeInUp">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Simple, fast, and intuitive - get started in three easy steps
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="text-center animate-fadeInUp"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className={`bg-${step.color}-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <step.icon className={`w-12 h-12 text-${step.color}-600`} />
                </div>
                <div className={`bg-${step.color}-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg`}>
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center flex gap-4 items-center justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl animate-fadeInUp" style={{ animationDelay: '0.9s' }} onClick={() => router.push("/speech-to-text")}>
            Real time speech-to-sign →
          </button>

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl animate-fadeInUp" style={{ animationDelay: '0.9s' }} onClick={() => router.push("/upload")}>
            Upload your files →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;