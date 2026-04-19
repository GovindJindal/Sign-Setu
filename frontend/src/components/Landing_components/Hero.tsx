"use client";

import React from 'react';
import { Hand, Heart, ThumbsUp, Space as Peace, HelpCircle, Zap, Star, Target, Waves, CheckCircle, Hash } from 'lucide-react';
import { useRouter } from 'next/navigation';
const Hero = () => {
  const floatingIcons = [
    { Icon: Hand, className: "absolute top-6 left-8 animate-floatIn drop-shadow-lg", size: 32 },
    { Icon: ThumbsUp, className: "absolute top-24 right-10 animate-floatIn drop-shadow-md", size: 28 },
    { Icon: Peace, className: "absolute bottom-10 left-24 animate-floatIn drop-shadow-lg", size: 36 },
    { Icon: Heart, className: "absolute top-1/3 left-[18%] animate-floatIn drop-shadow-xl", size: 24 },
    { Icon: Waves, className: "absolute bottom-4 right-20 animate-floatIn drop-shadow", size: 30 },
    { Icon: HelpCircle, className: "absolute top-10 right-[12%] animate-floatIn drop-shadow", size: 32 },
    { Icon: Star, className: "absolute top-[45%] right-[8%] animate-floatIn drop-shadow", size: 32 },
    { Icon: Hash, className: "absolute bottom-[8%] right-[15%] animate-floatIn drop-shadow", size: 32 },
    { Icon: Zap, className: "absolute top-[5%] left-[40%] animate-floatIn drop-shadow", size: 32 },
    { Icon: CheckCircle, className: "absolute bottom-[5%] left-[38%] animate-floatIn drop-shadow", size: 28 },
    { Icon: Target, className: "absolute top-[20%] right-[35%] animate-floatIn drop-shadow", size: 34 },
  ];

  const router = useRouter();

  return (
    <section id="home" className="m-8 mt-3 flex justify-center">
      <div className="relative h-170 w-full bg-gradient-to-b from-indigo-950 via-blue-900 to-slate-300 flex items-center justify-center rounded-4xl overflow-hidden">
        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, className, size }, index) => (
          <Icon
            key={index}
            className={`${className} text-white/80 hover:text-white transition-colors duration-300`}
            size={size}
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}

        {/* Main Content */}
        <div className="flex justify-center items-center flex-col px-8">
          <h1 className="text-white text-5xl md:text-6xl font-bold text-center z-10 mb-6 animate-fadeInUp drop-shadow-lg leading-tight">
            Communicate with deaf and <br /> hard of hearing People
          </h1>

          <h2 className="text-white text-lg md:text-xl font-medium text-center z-10 max-w-4xl animate-fadeInUp drop-shadow-lg" style={{ animationDelay: '0.3s' }}>
            Studying ASL fosters awareness and sensitivity toward the Deaf and
            hard of hearing community. 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 font-semibold"> MIME.ai</span> is all you need to
            communicate effectively and inclusively with them.
          </h2>

          <button className="mt-8 bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 duration-300 transform hover:scale-105 animate-fadeInUp z-10 bg-gradient-radial from-white/5 via-white/0 to-transparent shadow-md hover:shadow-lg transition-all" style={{ animationDelay: '0.6s' }} onClick={() => router.push("/speech-to-text")}>
            Start Communicating →
          </button>
        </div>
      </div>

    </section>
  );
};

export default Hero;