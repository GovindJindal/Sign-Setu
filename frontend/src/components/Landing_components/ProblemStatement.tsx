"use client";

import React from 'react';
import { AlertCircle, Users, MessageSquare } from 'lucide-react';

const ProblemStatement = () => {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fadeInUp">
            Why It Matters
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center animate-slideInLeft">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Communication Barriers</h3>
            <p className="text-gray-600">Daily challenges faced by millions</p>
          </div>

          <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Millions Affected</h3>
            <p className="text-gray-600">Deaf and hard-of-hearing individuals</p>
          </div>

          <div className="text-center animate-slideInRight" style={{ animationDelay: '0.4s' }}>
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Solution</h3>
            <p className="text-gray-600">Instant sign language conversion</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <p className="text-xl md:text-2xl text-gray-800 text-center leading-relaxed">
            Millions of deaf and hard-of-hearing individuals face daily communication barriers. 
            <span className="font-bold text-blue-600"> MIME.ai</span> bridges this gap by converting 
            spoken or written language into sign language in real-time, making digital communication 
            <span className="font-bold text-indigo-600"> inclusive and accessible</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;