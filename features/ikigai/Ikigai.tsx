'use client'

import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, 
  Sparkles, 
  Globe, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Compass,
  Zap
} from "lucide-react"
import { useIkigai } from "./hooks/controller/useIkigai.hook"

const steps = [
  {
    key: "love",
    title: "What You Love",
    description: "Write about your passions, interests, and activities that make you lose track of time. What brings you pure joy?",
    placeholder: "I love coding creative interfaces, reading philosophy, playing guitar, solving complex architecture problems...",
    icon: <Heart className="w-8 h-8 text-rose-400" />,
    gradient: "from-rose-500/25 to-orange-500/5",
    color: "rose"
  },
  {
    key: "goodAt",
    title: "What You Are Good At",
    description: "Detail your skills, natural talents, professional experience, or areas where others frequently seek your expertise.",
    placeholder: "Debugging typescript applications, translating design specs to code, writing modular and scalable React hooks...",
    icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
    gradient: "from-yellow-500/25 to-amber-500/5",
    color: "yellow"
  },
  {
    key: "worldNeeds",
    title: "What The World Needs",
    description: "Describe the problems in the world, your community, or industry that you care deeply about solving or contributing to.",
    placeholder: "Accessible education, helping people organize their work efficiently to reduce stress, green energy tracking...",
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    gradient: "from-blue-500/25 to-cyan-500/5",
    color: "blue"
  },
  {
    key: "paidFor",
    title: "What You Can Be Paid For",
    description: "Identify services, skills, or roles that the market, companies, or clients are willing to finance or hire you for.",
    placeholder: "Full-stack software engineering, technical writing, UI/UX consulting, developer advocacy...",
    icon: <Briefcase className="w-8 h-8 text-emerald-400" />,
    gradient: "from-emerald-500/25 to-teal-500/5",
    color: "emerald"
  }
]

const Ikigai = () => {
  const {
    currentStep,
    setCurrentStep,
    inputs,
    result,
    activeIntersection,
    setActiveIntersection,
    handleInputChange,
    handleNext,
    handleBack,
    handleReset
  } = useIkigai();

  const currentStepData = steps[currentStep] || null;

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] flex flex-col items-center justify-start py-8">
      <AnimatePresence mode="wait">
        
        {/* Step -1: Welcome Screen */}
        {currentStep === -1 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl w-full text-center space-y-8 py-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>AI-Guided Life Design</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-light tracking-tighter text-white leading-none">
              Discover Your <span className="text-[#977DD3] font-medium italic">Ikigai</span>
            </h1>

            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              Ikigai is a Japanese concept meaning "a reason for being." It represents the beautiful intersection where what you love, what you are good at, what the world needs, and what you can be paid for meet. 
            </p>

            <p className="text-base text-white/40 max-w-xl mx-auto">
              Our advanced AI assistant will help you cut through the noise, synthesize your thoughts, and map out your core purpose.
            </p>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(0)}
                className="px-10 h-16 rounded-full bg-white text-black font-medium hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all cursor-pointer inline-flex items-center gap-3 text-lg"
              >
                Begin Discovery
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Steps 0 to 3: Question Cards */}
        {currentStep >= 0 && currentStep <= 3 && currentStepData && (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl"
          >
            {/* Step Progress */}
            <div className="flex justify-between items-center mb-6 text-sm text-white/40 px-2">
              <span>Step {currentStep + 1} of 4</span>
              <span>{Math.round(((currentStep + 1) / 4) * 100)}% Completed</span>
            </div>
            
            <div className="w-full bg-white/5 rounded-full h-1.5 mb-10 overflow-hidden">
              <motion.div 
                className="bg-linear-to-r from-purple-500 to-blue-500 h-full"
                initial={{ width: `${(currentStep / 4) * 100}%` }}
                animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Box */}
            <div className={`p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-linear-to-b ${currentStepData.gradient} backdrop-blur-xl relative overflow-hidden`}>
              <div className="absolute top-8 right-8">
                {currentStepData.icon}
              </div>

              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/50">Discovery Prompt</span>
                <h2 className="text-3xl md:text-4xl text-white font-light tracking-tight">{currentStepData.title}</h2>
                <p className="text-white/60 text-lg leading-relaxed">{currentStepData.description}</p>
                
                <textarea
                  value={inputs[currentStepData.key as keyof typeof inputs]}
                  onChange={(e) => handleInputChange(e.target.value, currentStepData.key)}
                  placeholder={currentStepData.placeholder}
                  className="w-full min-h-[160px] p-5 rounded-2xl border border-white/10 bg-black/40 text-white text-base focus:border-white/30 focus:outline-hidden transition-all duration-300 resize-none font-light leading-relaxed placeholder:text-white/20"
                />

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 h-12 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!inputs[currentStepData.key as keyof typeof inputs].trim()}
                    className={`flex items-center gap-2 px-8 h-12 rounded-full font-medium transition-all text-sm cursor-pointer ${
                      inputs[currentStepData.key as keyof typeof inputs].trim() 
                      ? 'bg-white text-black hover:bg-white/90 shadow-md shadow-white/10' 
                      : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                    }`}
                  >
                    {currentStep === 3 ? "Generate Ikigai" : "Continue"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Loading State */}
        {currentStep === 4 && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-8 py-24"
          >
            <div className="relative">
              {/* Outer spinning dash-ring */}
              <motion.div 
                className="w-24 h-24 rounded-full border-2 border-[#977DD3]/20 border-t-[#977DD3]" 
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Compass className="w-8 h-8 text-[#977DD3] animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h3 className="text-2xl text-white font-light tracking-tight">Weaving Your Ikigai...</h3>
              <p className="text-white/50 text-sm max-w-md mx-auto">
                Analyzing intersections of your passions, skills, missions, and careers using Groq's high-speed intelligence.
              </p>
            </div>
          </motion.div>
        )}

        {/* Step 5: Result / Dashboard State */}
        {currentStep === 5 && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl space-y-12"
          >
            {/* Header / Summary Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#977DD3]">
                  <Compass className="w-4 h-4" />
                  Your Ikigai Profile
                </div>
                <h1 className="text-4xl font-light text-white tracking-tighter">Purpose Achieved</h1>
              </div>

              <button
                onClick={handleReset}
                className="self-start md:self-auto flex items-center gap-2 px-6 h-12 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Start Fresh
              </button>
            </div>

            {/* Core Synthesis Statement */}
            <div className="p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-linear-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#977DD3]/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                  Core Purpose Statement
                </div>
                <p className="text-2xl md:text-3xl text-white font-light leading-tight italic">
                  "{result.ikigaiSummary}"
                </p>
              </div>
            </div>

            {/* Grid Layout: Venn Diagram & Dynamic Interactive Analysis Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side: SVG Interactive Venn Diagram (Col span 5) */}
              <div className="lg:col-span-5 flex flex-col items-center p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-md">
                <h3 className="text-lg font-light text-white/80 mb-6 text-center">Interactive Venn Diagram</h3>
                
                <div className="relative w-72 h-72 md:w-80 md:h-80 select-none">
                  {/* Circle 1: Love (Top) */}
                  <div 
                    onClick={() => setActiveIntersection("love")}
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-rose-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      activeIntersection === "love" ? "border-rose-400 ring-4 ring-rose-400/20 scale-105 bg-rose-500/15" : "border-rose-500/30 hover:border-rose-400"
                    }`}
                    style={{ top: '5%' }}
                  >
                    <span className="text-rose-300/80 font-medium text-xs absolute top-8">Love</span>
                  </div>

                  {/* Circle 2: Good At (Left) */}
                  <div 
                    onClick={() => setActiveIntersection("goodAt")}
                    className={`absolute top-1/2 -translate-y-1/2 left-0 w-44 h-44 rounded-full bg-yellow-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      activeIntersection === "goodAt" ? "border-yellow-400 ring-4 ring-yellow-400/20 scale-105 bg-yellow-500/15" : "border-yellow-500/30 hover:border-yellow-400"
                    }`}
                    style={{ left: '5%' }}
                  >
                    <span className="text-yellow-300/80 font-medium text-xs absolute left-6">Skills</span>
                  </div>

                  {/* Circle 3: World Needs (Right) */}
                  <div 
                    onClick={() => setActiveIntersection("worldNeeds")}
                    className={`absolute top-1/2 -translate-y-1/2 right-0 w-44 h-44 rounded-full bg-blue-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      activeIntersection === "worldNeeds" ? "border-blue-400 ring-4 ring-blue-400/20 scale-105 bg-blue-500/15" : "border-blue-500/30 hover:border-blue-400"
                    }`}
                    style={{ right: '5%' }}
                  >
                    <span className="text-blue-300/80 font-medium text-xs absolute right-6">Needs</span>
                  </div>

                  {/* Circle 4: Paid For (Bottom) */}
                  <div 
                    onClick={() => setActiveIntersection("paidFor")}
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-emerald-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      activeIntersection === "paidFor" ? "border-emerald-400 ring-4 ring-emerald-400/20 scale-105 bg-emerald-500/15" : "border-emerald-500/30 hover:border-emerald-400"
                    }`}
                    style={{ bottom: '5%' }}
                  >
                    <span className="text-emerald-300/80 font-medium text-xs absolute bottom-8">Careers</span>
                  </div>

                  {/* Intersection 1: Passion (Top-Left) */}
                  <button 
                    onClick={() => setActiveIntersection("passion")}
                    className={`absolute w-12 h-12 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[10px] font-semibold flex items-center justify-center ${
                      activeIntersection === "passion" ? "bg-rose-500/30 border-rose-300 text-rose-300 scale-110" : "bg-black/60 border-white/20 text-white/50 hover:bg-black/80"
                    }`}
                    style={{ top: '28%', left: '26%' }}
                  >
                    PSN
                  </button>

                  {/* Intersection 2: Mission (Top-Right) */}
                  <button 
                    onClick={() => setActiveIntersection("mission")}
                    className={`absolute w-12 h-12 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[10px] font-semibold flex items-center justify-center ${
                      activeIntersection === "mission" ? "bg-blue-500/30 border-blue-300 text-blue-300 scale-110" : "bg-black/60 border-white/20 text-white/50 hover:bg-black/80"
                    }`}
                    style={{ top: '28%', right: '26%' }}
                  >
                    MSN
                  </button>

                  {/* Intersection 3: Profession (Bottom-Left) */}
                  <button 
                    onClick={() => setActiveIntersection("profession")}
                    className={`absolute w-12 h-12 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[10px] font-semibold flex items-center justify-center ${
                      activeIntersection === "profession" ? "bg-amber-500/30 border-amber-300 text-amber-300 scale-110" : "bg-black/60 border-white/20 text-white/50 hover:bg-black/80"
                    }`}
                    style={{ bottom: '28%', left: '26%' }}
                  >
                    PRF
                  </button>

                  {/* Intersection 4: Vocation (Bottom-Right) */}
                  <button 
                    onClick={() => setActiveIntersection("vocation")}
                    className={`absolute w-12 h-12 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[10px] font-semibold flex items-center justify-center ${
                      activeIntersection === "vocation" ? "bg-emerald-500/30 border-emerald-300 text-emerald-300 scale-110" : "bg-black/60 border-white/20 text-white/50 hover:bg-black/80"
                    }`}
                    style={{ bottom: '28%', right: '26%' }}
                  >
                    VOC
                  </button>

                  {/* Absolute Center: IKIGAI */}
                  <button 
                    onClick={() => setActiveIntersection("ikigai")}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border transition-all duration-300 cursor-pointer text-xs font-semibold flex flex-col items-center justify-center shadow-lg ${
                      activeIntersection === "ikigai" 
                      ? "bg-purple-600 border-purple-300 text-white ring-4 ring-purple-400/30 scale-110" 
                      : "bg-black border-purple-500/50 text-purple-300 hover:border-purple-400"
                    }`}
                  >
                    <span>IKIGAI</span>
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> PSN: Passion</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> MSN: Mission</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> VOC: Vocation</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> PRF: Profession</span>
                </div>
              </div>

              {/* Right Side: Interactive Explainer Cards (Col span 7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Dynamically Loaded Explainer Panel */}
                <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md min-h-[160px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {activeIntersection === "love" && (
                      <motion.div key="love-exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xl font-medium text-rose-400 flex items-center gap-2"><Heart className="w-5 h-5" /> What You Love</h4>
                        <p className="text-white/70 leading-relaxed font-light">{inputs.love}</p>
                      </motion.div>
                    )}
                    {activeIntersection === "goodAt" && (
                      <motion.div key="good-exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xl font-medium text-yellow-400 flex items-center gap-2"><Sparkles className="w-5 h-5" /> What You Are Good At</h4>
                        <p className="text-white/70 leading-relaxed font-light">{inputs.goodAt}</p>
                      </motion.div>
                    )}
                    {activeIntersection === "worldNeeds" && (
                      <motion.div key="world-exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xl font-medium text-blue-400 flex items-center gap-2"><Globe className="w-5 h-5" /> What The World Needs</h4>
                        <p className="text-white/70 leading-relaxed font-light">{inputs.worldNeeds}</p>
                      </motion.div>
                    )}
                    {activeIntersection === "paidFor" && (
                      <motion.div key="paid-exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xl font-medium text-emerald-400 flex items-center gap-2"><Briefcase className="w-5 h-5" /> What You Can Be Paid For</h4>
                        <p className="text-white/70 leading-relaxed font-light">{inputs.paidFor}</p>
                      </motion.div>
                    )}
                    {activeIntersection === "passion" && (
                      <motion.div key="passion-exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xl font-medium text-rose-300">Your Passion</h4>
                        <p className="text-white/70 leading-relaxed font-light">{result.analysis.passion}</p>
                      </motion.div>
                    )}
                    {activeIntersection === "mission" && (
                      <motion.div key="mission-exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xl font-medium text-blue-300">Your Mission</h4>
                        <p className="text-white/70 leading-relaxed font-light">{result.analysis.mission}</p>
                      </motion.div>
                    )}
                    {activeIntersection === "vocation" && (
                      <motion.div key="vocation-exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xl font-medium text-emerald-300">Your Vocation</h4>
                        <p className="text-white/70 leading-relaxed font-light">{result.analysis.vocation}</p>
                      </motion.div>
                    )}
                    {activeIntersection === "profession" && (
                      <motion.div key="profession-exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xl font-medium text-amber-300">Your Profession</h4>
                        <p className="text-white/70 leading-relaxed font-light">{result.analysis.profession}</p>
                      </motion.div>
                    )}
                    {activeIntersection === "ikigai" && (
                      <motion.div key="ikigai-exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xl font-medium text-purple-300">Your Synthesized Ikigai</h4>
                        <p className="text-white/70 leading-relaxed font-light">
                          Select the overlapping segments in the diagram to inspect specific intersections of your profile, or explore the action steps and potential obstacles detailed below to close your circle.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="text-[10px] text-white/30 border-t border-white/5 pt-4 mt-4 font-semibold uppercase tracking-wider">
                    Tip: Click any circle or dashed icon inside the Venn diagram to review that section.
                  </p>
                </div>

                {/* Actionable Steps Card */}
                <div className="p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-md space-y-6">
                  <h4 className="text-lg font-light text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Actionable Roadmap
                  </h4>
                  <ul className="space-y-3">
                    {result.actionableSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-white/70 font-light text-sm">
                        <span className="flex-none w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs mt-0.5">{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Obstacles Card */}
                <div className="p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-md space-y-6">
                  <h4 className="text-lg font-light text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    Potential Obstacles & Focus Killers
                  </h4>
                  <ul className="space-y-3">
                    {result.potentialObstacles.map((obstacle, idx) => (
                      <li key={idx} className="flex gap-3 text-white/70 font-light text-sm">
                        <span className="flex-none w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs mt-0.5">!</span>
                        <span>{obstacle}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

export default Ikigai