"use client";

import { EnsoCircle } from "@/components/enso-circle";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  Heart,
  Briefcase,
  ChevronDown,
  CheckCircle,
  Grid2X2,
  Brain,
  Layers,
} from "lucide-react";

export default function Home() {
  return (
    <main className="mt-15 relative min-h-screen overflow-hidden font-light tracking-tight ">
      {/* Background Gradients - More sophisticated oklch colors */}
      {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" /> */}

      {/* Grainy Texture Overlay */}
      {/* <div className="absolute inset-0 -z-5 opacity-[0.03] pointer-events-none " /> */}

      {/* Hero Section */}
      <section className=" pt-48 pb-32 px-6">
        <div className="container mx-auto max-w-6xl relative">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
              }}
              className="max-w-4xl mx-auto"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-7xl leading-[0.9] tracking-tighter font-light text-white">
                  Finding your purpose
                  <span className="block text-white/40">
                    in a world full of noise.
                  </span>
                </h1>

                <p className="text-xl md:text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
                  Enso is more than a tool. It is a path to clarity. Align your
                  passion, vocation, and mission to discover your Ikigai.
                </p>

                <div className="flex flex-wrap  items-center justify-center gap-6">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-full text-lg bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 shadow-xl transition-all duration-300 font-light"
                  >
                    Find your purpose
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-14 px-8 rounded-full text-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-all font-light"
                  >
                    How it works
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
          {/* Improved Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-4 mt-10 text-muted-foreground/30"
          >
            <span className="text-xs uppercase text-white tracking-[0.4em] font-medium">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Ikigai Principles Section */}
      <section className="py-32 px-6 relative ">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-5xl text-white font-light tracking-tighter leading-tighter mb-4">
              The Four Pillars
            </h3>
            <p className="text-muted-foreground text-lg">
              Aligning your life for maximum fulfillment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <原则Card
              icon={<Heart className="w-6 h-6 text-red-400" />}
              title="Passion"
              subtitle="What you love"
              description="The fire that fuels your daily existence and brings pure joy to your work."
            />
            <原则Card
              icon={<Sparkles className="w-6 h-6 text-yellow-400" />}
              title="Vocation"
              subtitle="What you're good at"
              description="Your innate talents and hard-earned skills refined through dedicated practice."
            />
            <原则Card
              icon={<Target className="w-6 h-6 text-blue-400" />}
              title="Mission"
              subtitle="What the world needs"
              description="Your contribution to humanity and solving the problems that matter most."
            />
            <原则Card
              icon={<Briefcase className="w-6 h-6 text-green-400" />}
              title="Profession"
              subtitle="What you are paid for"
              description="Creating sustainable value that the world is ready to reward and support."
            />
          </div>
        </div>
      </section>

      {/* Tools Bento Grid */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <h3 className="text-3xl md:text-5xl text-white font-light tracking-tighter leading-tighter mb-4">
              Tools for Clarity
            </h3>
            <p className="text-muted-foreground text-lg">
              Designed to help you focus, organized, and create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Main Card - Ikigai */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 rounded-[2.5rem] border  border-white/10 bg-black/15 backdrop-blur-md p-10 relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h4 className="text-3xl font-light text-white mb-2">
                    Ikigai Builder
                  </h4>
                  <p className="text-white/60">
                    Discover your reason for being through our guided framework.
                  </p>
                </div>
              </div>
              {/* Decorative Element */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full group-hover:bg-purple-500/30 transition-all" />
            </motion.div>

            {/* Side Card - Eisenhower */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-1 rounded-[2.5rem] bg-black/15 backdrop-blur-md border border-white/10 p-10 relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Grid2X2 className="w-6 h-6 text-orange-300" />
                </div>
                <div>
                  <h4 className="text-2xl font-light text-white mb-2">
                    Eisenhower Matrix
                  </h4>
                  <p className="text-white/60 text-sm">
                    Prioritize tasks by urgency and importance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Card - Idea Vault */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-1 rounded-[2.5rem] bg-black/15 backdrop-blur-md border border-white/10 p-10 relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-br from-yellow-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h4 className="text-2xl font-light text-white mb-2">
                    Idea Vault
                  </h4>
                  <p className="text-white/60 text-sm">
                    Capture and organize your fleeting thoughts.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Wide Card - Deep Work/Layers */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 rounded-[2.5rem] bg-black/15 backdrop-blur-md border border-white/10 p-10 relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-3xl font-light text-white mb-2">
                    Deep Focus
                  </h4>
                  <p className="text-white/60">
                    Eliminate distractions and enter flight mode for your mind.
                  </p>
                </div>
              </div>
              <div className="absolute -left-10 -top-10 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full group-hover:bg-blue-500/30 transition-all" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote Section */}
      <section className="py-32 px-6 max-[770px]:hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="w-20 h-1 bg-white mx-auto mb-12 shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
            <blockquote className="text-4xl md:text-6xl font-light leading-none tracking-tighter mb-10 text-white drop-shadow-xl">
              "An Enso circle is expressive of the moment. It is enough. You are
              enough."
            </blockquote>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light mb-12">
              In the rush of modern life, we often forget that completeness
              isn't about adding more, but peeling away the unnecessary. Enso
              invites you to find wholeness in the now.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <p className="text-white/90 uppercase tracking-[0.2em] text-xs font-medium">
                The Path of Enso
              </p>
            </div>
          </motion.div>
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-white/5 blur-[120px] -z-10 rounded-full pointer-events-none" />
        </div>
      </section>

      {/* Footer-like CTA */}
      <section className="py-40 px-6 text-center relative overflow-hidden max-[770px]:hidden">
        <div className="absolute inset-0  -z-10" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <h3 className="text-5xl md:text-8xl mb-8 font-light leading-[0.9] tracking-tighter text-white">
            Close the circle. <br />
            <span className="text-white/50">Find your balance.</span>
          </h3>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of others who are finding clarity and purpose. Start
            defining your own path today.
          </p>

          <div className="flex flex-col items-center gap-8">
            <Button
              size="default"
              className="px-12 h-16 text-xl rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Get started for free
            </Button>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/40 font-medium tracking-wide">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Privacy focused
              </span>
            </div>
          </div>

        </div>
        {/* Background glow for CTA */}
        {/* <div className="border bottom-0 left-1/2 -translate-x-1/2 w-full h-125 bg-linear-to-t from-white/5 to-transparent pointer-events-none -z-10" /> */}
      </section>
      <Footer />
    </main>
  );
}

function 原则Card({
  icon,
  title,
  subtitle,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="p-10 rounded-[2.5rem] border border-border/40 bg-black/40 backdrop-blur-xl hover:bg-black/70 transition-all duration-500 group"
    >
      <div className="grid gap-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="text-2xl text-white font-light tracking-tighter leading-tighter mb-1">
            {title}
          </h4>
          <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-4">
            {subtitle}
          </p>
          <p className="text-white/60 leading-tight font-light text-lg">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
