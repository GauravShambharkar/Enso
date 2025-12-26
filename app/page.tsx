"use client";

import { EnsoCircle } from "@/components/enso-circle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  Heart,
  Briefcase,
  ChevronDown,
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="space-y-8">
                <h2 className="text-4xl md:text-7xl leading-tighter tracking-tighter font-medium text-white/90">
                  Finding your purpose <br />
                  in a world full of noise.
                </h2>

                <p className="text-xl md:text-xl leading-5 text-white/90 leading-tighter font-normal max-w-3xl mx-auto  pl-8 text-left md:text-center md:pl-0">
                  Enso is more than a tool. It is a path to clarity.{" "}
                  <br className="hidden md:block" />
                  Align your passion, vocation, and mission to discover your
                  Ikigai.
                </p>

                <div className=" flex flex-wrap items-center justify-center gap-8">
                  <Button
                    size="lg"
                    className="h-16 px-5 full text-2xl group bg-primary/25 backdrop-blur-2xl text-white/90 border border-white/20 shadow-2xl shadow-primary/20 hover:scale-105 transition-all duration-500"
                  >
                    Find your purpose
                    <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" />
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-16 px-5 border-dashed ease-in-out duration-500 text-white/90 border border-white/20 text-xl hover:bg-accent/50 transition-all font-light"
                  >
                    How it works
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Improved Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-muted-foreground/30"
        >
          <span className="text-xs uppercase tracking-[0.4em] font-medium">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Ikigai Principles Section */}
      <section className="py-32 px-6 relative  bg-accent/2">
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

      {/* Philosophy Quote Section */}
      <section className="py-32 px-6 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-1 bg-primary/20 mx-auto mb-12" />
            <blockquote className="text-3xl md:text-5xl font-light leading-tighter tracking-tighter mb-12">
              "An Enso circle is expressive of the moment. It is enough. You are
              enough."
            </blockquote>
            <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm">
              The Path of Enso
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer-like CTA */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl md:text-7xl mb-12 font-light leading-tighter tracking-tighter">
            Close the circle. <br />
            Find your balance.
          </h3>
          <Button
            size="lg"
            className="rounded-full px-16 h-16 text-2xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
          >
            Get started
          </Button>
        </div>
      </section>
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
