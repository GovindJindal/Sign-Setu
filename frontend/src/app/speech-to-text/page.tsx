"use client";

import dynamic from 'next/dynamic';

// Dynamically import the component to disable SSR for it
// As it was causing the error of windows not defined even after adding "use client" to both the component and even the parent
// library react-hook-speech-to-text was still geting eagerly imported during SSR, and it was accessing window immediately — outside of a hook or effect.

// ssr: false ensures the module is never loaded on the server, so window is never touched during SSR.
// The "use client" tag still ensures this page behaves as a client component.

const SpeechToTextClient = dynamic(
  () => import("@/components/Speech-to-text-components/SpeechToTextClient"),
  { ssr: false }
);


export default function SpeechToText(){
    return(
        <SpeechToTextClient/>
    )
}