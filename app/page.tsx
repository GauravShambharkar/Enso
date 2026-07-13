"use client";

import Link from "next/link";
import { SignUpButton, Show } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { Compass, Brain, Target, ArrowRight } from "lucide-react";
import { useTimeTheme } from "@/hooks/useTimeTheme";

const TOOLS = [
  {
    name: "Ikigai Workspace",
    icon: Compass,
    color: "#c084fc",
    desc: "A reflection tool to align what you love, what you're good at, what the world needs, and what you can get paid for. Synthesize your life purpose.",
    href: "/tools/ikigai",
  },
  {
    name: "Idea Vault",
    icon: Brain,
    color: "#a78bfa",
    desc: "A distraction-free zone to capture raw thoughts and ideas the second they arrive. Review and develop them in a split-pane layout at your own pace.",
    href: "/tools/idea-vault",
  },
  {
    name: "Eisen Matrix",
    icon: Target,
    color: "#60a5fa",
    desc: "A project-based Eisenhower prioritization matrix. Drag, sort, and organize tasks into urgency and importance quadrants to clear visual clutter.",
    href: "/tools/eisen-matrix",
  },
];

export default function Home() {
  const { isNight } = useTimeTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isNight ? "bg-[#030712]" : "bg-[#FCEDD9]"}`}
    >
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          className="relative min-h-[90vh] md:h-screen flex flex-col items-center justify-start text-center px-6 pt-[120px] md:pt-[110px] max-[750px]:pt-[150px] transition-all duration-300"
          style={{
            backgroundImage: isNight
              ? "linear-gradient(to bottom, rgba(3, 7, 18, 0.1) 60%, rgba(3, 7, 18, 0.95) 98%), url('/bgDarkTheme.png')"
              : "linear-gradient(to bottom, rgba(252, 237, 217, 0.1) 60%, rgba(252, 237, 217, 0.95) 98%), url('/bgLightThemeResized.png')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-[800px]">
            {/* Headline */}
            <h1
              className={`text-[32px] tracking-tighter sm:text-[48px] md:text-[64px] font-medium leading-[1.15] sm:leading-[1.1] mb-5 transition-colors duration-300 ${isNight ? "text-slate-100" : "text-[#0f2963]"}`}
            >
              Finding your focus in a<br />
              world full of noise.
            </h1>

            {/* Description */}
            <p
              className={`text-[14px] sm:text-[15px] w-full leading-[1.6] sm:leading-[1.7] mb-8 max-w-[640px] mx-auto font-normal px-2 max-[750px]:text-[12px] transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
            >
              Enso is a quiet workspace designed for professionals who want to
              cultivate clarity.
              <br className="hidden sm:inline" />
              Align your life goals, capture ideas, and prioritize work without
              distractions.
            </p>

            {/* Call to Action Button */}
            <div className="flex justify-center">
              <Show when="signed-out">
                <SignUpButton mode="modal" forceRedirectUrl="/tools">
                  <button
                    className={`text-[14px] px-6 py-2.5 rounded-md border-none cursor-pointer font-medium flex items-center gap-2 transition-all duration-300 ${isNight ? "bg-white text-slate-950 shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:bg-white/90" : "bg-[#0f2963] text-white shadow-[0_2px_8px_rgba(15,41,99,0.15)] hover:opacity-90"}`}
                  >
                    Start Free <ArrowRight className="size-4" />
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <Link
                  href="/tools"
                  className={`text-[14px] px-6 py-2.5 rounded-md border-none cursor-pointer font-medium no-underline flex items-center gap-2 transition-all duration-300 ${isNight ? "bg-white text-slate-955 shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:bg-white/90" : "bg-[#0f2963] text-white shadow-[0_2px_8px_rgba(15,41,99,0.15)] hover:opacity-90"}`}
                >
                  Enter Workspace <ArrowRight className="size-4" />
                </Link>
              </Show>
            </div>
          </div>

          {/* Bottom transition gradient overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t to-transparent pointer-events-none transition-colors duration-300 ${isNight ? "from-[#030712]" : "from-[#FCEDD9]"}`}
          />
        </section>

        {/* Feature Grid Section */}
        <section className="py-20 md:py-[100px] px-6 max-w-[1100px] mx-auto">
          <div className="text-center mb-[54px]">
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-2 transition-colors duration-300 ${isNight ? "text-violet-400" : "text-[#0f2963]"}`}
            >
              Core Features
            </p>
            <h2
              className={`text-[32px] font-medium tracking-[-0.02em] transition-colors duration-300 ${isNight ? "text-slate-100" : "text-[#0f2963]"}`}
            >
              Minimalist tools for complex minds.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className={`border rounded-[8px] p-8 md:px-7 md:py-8 flex flex-col transition-all duration-300 ${
                    isNight
                      ? "bg-slate-900/40 border-white/10 text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                      : "bg-white border-[#0f2963]/8 text-foreground shadow-[0_4px_12px_rgba(15,41,99,0.02)]"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-[6px] flex items-center justify-center mb-5 border transition-colors duration-300 ${
                      isNight
                        ? "bg-white/5 border-white/10"
                        : "bg-[#0f2963]/3 border-[#0f2963]/6"
                    }`}
                    style={{ color: tool.color }}
                  >
                    <Icon className="size-4" />
                  </div>
                  <h3
                    className={`text-[18px] font-medium mb-3 transition-colors duration-300 ${isNight ? "text-slate-100" : "text-[#0f2963]"}`}
                  >
                    {tool.name}
                  </h3>
                  <p
                    className={`text-[13px] leading-[1.6] flex-1 mb-6 transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
                  >
                    {tool.desc}
                  </p>
                  <Link
                    href={tool.href}
                    className={`text-[12px] no-underline flex items-center gap-1.5 font-medium transition-colors duration-300 ${
                      isNight
                        ? "text-violet-400 hover:text-violet-300"
                        : "text-[#0f2963] hover:text-[#1d4ed8]"
                    }`}
                  >
                    Try tool <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Section with background image */}
        <section
          className={`py-16 md:py-[120px] md:pb-20 px-6 text-center border-t transition-colors duration-300 ${isNight ? "border-white/10" : "border-[#0f2963]/8"}`}
          style={{
            backgroundImage: isNight
              ? "linear-gradient(to top, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.3) 100%), url('/bgDarkTheme.png')"
              : "linear-gradient(to top, rgba(252, 237, 217, 0.95) 0%, rgba(252, 237, 217, 0.3) 100%), url('/bgEnso.png')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-[900px] mx-auto">
            {/* Call to action card */}
            <div className="mb-16 md:mb-[90px]">
              <h2
                className={`text-[28px] sm:text-[36px] font-medium tracking-[-0.025em] mb-4 transition-colors duration-300 ${isNight ? "text-slate-100" : "text-[#0f2963]"}`}
              >
                Align your life goals today.
              </h2>
              <p
                className={`text-[14px] sm:text-[15px] leading-[1.6] mb-8 font-light max-w-[600px] mx-auto px-2 transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
              >
                Start generating your Ikigai, capturing ideas, and prioritizing
                tasks without noise.
              </p>

              <div className="flex gap-3 justify-center">
                <Show when="signed-out">
                  <SignUpButton mode="modal" forceRedirectUrl="/tools">
                    <button
                      className={`text-[14px] px-6 py-2.5 rounded-[6px] border-none cursor-pointer font-medium transition-all duration-300 ${isNight ? "bg-white text-slate-950 hover:bg-white/90" : "bg-[#0f2963] text-white hover:opacity-90"}`}
                    >
                      Start for free
                    </button>
                  </SignUpButton>
                </Show>

                <Show when="signed-in">
                  <Link
                    href="/tools"
                    className={`text-[14px] px-6 py-2.5 rounded-[6px] border-none cursor-pointer font-medium no-underline transition-all duration-300 ${isNight ? "bg-white text-slate-950 hover:bg-white/90" : "bg-[#0f2963] text-white hover:opacity-90"}`}
                  >
                    Enter Workspace
                  </Link>
                </Show>
              </div>
            </div>

            {/* Middle navigation grid */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left border-t pt-12 md:pt-[60px] pb-12 md:pb-[60px] mb-10 transition-colors duration-300 ${isNight ? "border-white/10" : "border-[#0f2963]/8"}`}
            >
              {/* Brand Profile */}
              <div>
                <span
                  className={`sekuya text-lg block mb-3 transition-colors duration-300 ${isNight ? "text-slate-100" : "text-[#0f2963]"}`}
                >
                  Enso
                </span>
                <p
                  className={`text-[12px] leading-[1.6] font-light transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
                >
                  A clean, distraction-free environment for aligning life goals,
                  brain dump notes, and prioritizing workload.
                </p>
              </div>

              {/* Tools Column */}
              <div>
                <p
                  className={`text-[11px] font-bold uppercase tracking-[0.08em] mb-4 transition-colors duration-300 ${isNight ? "text-slate-300" : "text-[#0f2963]"}`}
                >
                  Tools
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  <li>
                    <Link
                      href="/tools/ikigai"
                      className={`text-[13px] no-underline transition-colors duration-300 ${isNight ? "text-slate-400 hover:text-slate-200" : "text-[#55688a] hover:text-[#0f2963]"}`}
                    >
                      Ikigai Builder
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools/idea-vault"
                      className={`text-[13px] no-underline transition-colors duration-300 ${isNight ? "text-slate-400 hover:text-slate-200" : "text-[#55688a] hover:text-[#0f2963]"}`}
                    >
                      Idea Vault
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools/eisen-matrix"
                      className={`text-[13px] no-underline transition-colors duration-300 ${isNight ? "text-slate-400 hover:text-slate-200" : "text-[#55688a] hover:text-[#0f2963]"}`}
                    >
                      Eisenhower Matrix
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <p
                  className={`text-[11px] font-bold uppercase tracking-[0.08em] mb-4 transition-colors duration-300 ${isNight ? "text-slate-300" : "text-[#0f2963]"}`}
                >
                  Resources
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  <li>
                    <span
                      className={`text-[13px] cursor-default transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
                    >
                      Documentation
                    </span>
                  </li>
                  <li>
                    <span
                      className={`text-[13px] cursor-default transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
                    >
                      Privacy Guide
                    </span>
                  </li>
                  <li>
                    <span
                      className={`text-[13px] cursor-default transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
                    >
                      Focus Techniques
                    </span>
                  </li>
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <p
                  className={`text-[11px] font-bold uppercase tracking-[0.08em] mb-4 transition-colors duration-300 ${isNight ? "text-slate-300" : "text-[#0f2963]"}`}
                >
                  Product
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  <li>
                    <span
                      className={`text-[13px] cursor-default transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
                    >
                      Terms of Service
                    </span>
                  </li>
                  <li>
                    <span
                      className={`text-[13px] cursor-default transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
                    >
                      Privacy Policy
                    </span>
                  </li>
                  <li>
                    <span
                      className={`text-[13px] cursor-default transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
                    >
                      Support Center
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div
              className={`border-t pt-8 flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left transition-colors duration-300 ${isNight ? "border-white/10" : "border-[#0f2963]/8"}`}
            >
              <span
                className={`text-[12px] transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
              >
                &copy; {new Date().getFullYear()} Enso Workspace. All rights
                reserved.
              </span>
              <span
                className={`text-[12px] font-light flex items-center gap-1.5 transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#55688a]"}`}
              >
                <span className="width-1.5 height-1.5 rounded-full bg-[#10b981] inline-block w-1.5 h-1.5"></span>{" "}
                Operational
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
