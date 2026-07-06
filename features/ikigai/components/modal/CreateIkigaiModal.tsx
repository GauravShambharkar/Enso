"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Globe, Briefcase, ArrowRight, ArrowLeft, X, Compass } from "lucide-react";

interface CreateIkigaiProps {
  onClose: () => void;
  currentStep: number;
  inputs: { love: string; goodAt: string; worldNeeds: string; paidFor: string };
  handlers: {
    onChange: (value: string, key: string) => void;
    onNext: () => void;
    onBack: () => void;
  };
}

const steps = [
  {
    key: "love",
    title: "What You Love",
    description: "Write about your passions, interests, and activities that make you lose track of time. What brings you pure joy?",
    placeholder: "I love coding creative interfaces, reading philosophy, playing guitar, solving complex architecture problems...",
    icon: <Heart className="w-6 h-6 text-rose-400" />,
    gradient: "from-rose-500/20 to-transparent"
  },
  {
    key: "goodAt",
    title: "What You Are Good At",
    description: "Detail your skills, natural talents, professional experience, or areas where others frequently seek your expertise.",
    placeholder: "Debugging typescript applications, translating design specs to code, writing modular and scalable React hooks...",
    icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
    gradient: "from-yellow-500/20 to-transparent"
  },
  {
    key: "worldNeeds",
    title: "What The World Needs",
    description: "Describe the problems in the world, your community, or industry that you care deeply about solving or contributing to.",
    placeholder: "Accessible education, helping people organize their work efficiently to reduce stress, green energy tracking...",
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    gradient: "from-blue-500/20 to-transparent"
  },
  {
    key: "paidFor",
    title: "What You Can Be Paid For",
    description: "Identify services, skills, or roles that the market, companies, or clients are willing to finance or hire you for.",
    placeholder: "Full-stack software engineering, technical writing, UI/UX consulting, developer advocacy...",
    icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
    gradient: "from-emerald-500/20 to-transparent"
  }
];

export const CreateIkigaiModal = ({ onClose, currentStep, inputs, handlers }: CreateIkigaiProps) => {
  const currentStepData = steps[currentStep] || null;

  return (
    <div className="w-full h-full fixed inset-0 flex justify-center items-center bg-black/60 z-50 backdrop-blur-xs">
      <div className="p-8 rounded-xl border border-white/20 w-160 bg-black/85 backdrop-blur-xl relative">
        {currentStep < 4 && (
          <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-all">
            <X className="size-5" />
          </button>
        )}

        {/* Wizard Question Step */}
        {currentStep < 4 && currentStepData ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs text-white/40">
              <span>Step {currentStep + 1} of 4</span>
              <span>{Math.round(((currentStep + 1) / 4) * 100)}% Completed</span>
            </div>
            
            <div className="w-full bg-white/5 rounded-full h-1">
              <div 
                className="bg-linear-to-r from-[#977DD3] to-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              />
            </div>

            <div className={`p-6 rounded-2xl border border-white/10 bg-linear-to-b ${currentStepData.gradient} relative overflow-hidden`}>
              <div className="absolute top-6 right-6">
                {currentStepData.icon}
              </div>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-white/50">Discovery Prompt</span>
                <h3 className="text-2xl text-white font-light tracking-tight">{currentStepData.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{currentStepData.description}</p>
                
                <textarea
                  value={inputs[currentStepData.key as keyof typeof inputs]}
                  onChange={(e) => handlers.onChange(e.target.value, currentStepData.key)}
                  placeholder={currentStepData.placeholder}
                  className="w-full min-h-[120px] p-4 rounded-xl border border-white/10 bg-black/40 text-white text-sm focus:border-white/30 focus:outline-hidden transition-all duration-300 resize-none font-light leading-relaxed placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <button
                onClick={handlers.onBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-5 h-11 rounded-full border text-xs ${
                  currentStep === 0 
                  ? "border-white/5 text-white/20 cursor-not-allowed" 
                  : "border-white/10 text-white/60 hover:text-white hover:bg-white/5 cursor-pointer"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <button
                onClick={handlers.onNext}
                disabled={!inputs[currentStepData.key as keyof typeof inputs].trim()}
                className={`flex items-center gap-2 px-6 h-11 rounded-full font-medium transition-all text-xs cursor-pointer ${
                  inputs[currentStepData.key as keyof typeof inputs].trim() 
                  ? 'bg-white text-black hover:bg-white/90 shadow-md' 
                  : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                }`}
              >
                {currentStep === 3 ? "Generate Ikigai" : "Continue"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Loading State (Step 4) */
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="relative">
              <motion.div 
                className="w-16 h-16 rounded-full border-2 border-[#977DD3]/20 border-t-[#977DD3]" 
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Compass className="w-6 h-6 text-[#977DD3] animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl text-white font-light tracking-tight">Synthesizing Your Ikigai...</h3>
              <p className="text-white/50 text-xs max-w-sm mx-auto">
                Comparing overlaps of your answers using Groq LLM speed to find your true reason for being.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateIkigaiModal;
