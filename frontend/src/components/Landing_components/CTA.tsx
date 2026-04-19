"use client";

import React from 'react';
import { Upload, ArrowRight, Hand } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CTA = () => {
  const router = useRouter();

  return (
    <section className="py-20 px-8 bg-gradient-to-b from-indigo-950 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <Hand className="absolute top-10 left-10 w-16 h-16 text-white animate-floatIn" />
        <Hand className="absolute top-20 right-20 w-12 h-12 text-white animate-floatIn" style={{ animationDelay: '0.5s' }} />
        <Hand className="absolute bottom-20 left-1/6 w-14 h-14 text-white animate-floatIn" style={{ animationDelay: '1s' }} />
        <Hand className="absolute bottom-10 right-10 w-10 h-10 text-white animate-floatIn" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fadeInUp">
          Ready to Break the <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Communication Barrier?
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          Join thousands of users who are already creating more inclusive communication experiences
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <button className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3" onClick={() => router.push("/upload")}>
            <Upload className="w-6 h-6" />
            <span>Upload Now</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105" onClick={() => router.push("/speech-to-text")}>
            Experience Visual Signing
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10K+</div>
            <div className="text-blue-200">Files Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-blue-200">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-blue-200">Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;