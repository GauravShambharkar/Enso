"use client";

import Link from "next/link";
import { SignUpButton, Show } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { Compass, Brain, Target, ArrowRight } from "lucide-react";

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
  return (
    <div className="bg-[#FCEDD9] min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          className="relative h-screen flex flex-col items-center justify-start text-center px-6 pt-[150px]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(252, 237, 217, 0.1) 60%, rgba(252, 237, 217, 0.95) 98%), url('/bgEnso2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center calc(100% + 180px)",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-[800px]">
            {/* Headline */}
            <h1 className="text-[36px] tracking-tighter sm:text-[48px] md:text-[64px] font-medium text-[#0f2963] leading-[1.1] mb-5">
              Finding your focus in a<br />
              world full of noise.
            </h1>

            {/* Description */}
            <p className="text-[15px] text-[#55688a] leading-[1.7] mb-8 max-w-[640px] mx-auto font-normal ">
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
                  <button className="text-[14px] px-6 py-2.5 rounded-md border-none bg-[#0f2963] text-white cursor-pointer font-medium flex items-center gap-2 shadow-[0_2px_8px_rgba(15,41,99,0.15)] hover:opacity-90 transition-opacity">
                    Start Free <ArrowRight className="size-4" />
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <Link
                  href="/tools"
                  className="text-[14px] px-6 py-2.5 rounded-md border-none bg-[#0f2963] text-white cursor-pointer font-medium no-underline flex items-center gap-2 shadow-[0_2px_8px_rgba(15,41,99,0.15)] hover:opacity-90 transition-opacity"
                >
                  Enter Workspace <ArrowRight className="size-4" />
                </Link>
              </Show>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="py-20 md:py-[100px] px-6 max-w-[1100px] mx-auto">
          <div className="text-center mb-[54px]">
            <p className="text-[11px] color-[#0f2963] font-semibold uppercase tracking-[0.08em] mb-2 text-[#0f2963]">
              Core Features
            </p>
            <h2 className="text-[32px] font-medium text-[#0f2963] tracking-[-0.02em]">
              Minimalist tools for complex minds.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="bg-white border border-[#0f2963]/8 rounded-[8px] p-8 md:px-7 md:py-8 flex flex-col shadow-[0_4px_12px_rgba(15,41,99,0.02)]"
                >
                  <div
                    className="w-9 h-9 rounded-[6px] bg-[#0f2963]/3 border border-[#0f2963]/6 flex items-center justify-center mb-5"
                    style={{ color: tool.color }}
                  >
                    <Icon className="size-4" />
                  </div>
                  <h3 className="text-[18px] font-medium text-[#0f2963] mb-3">
                    {tool.name}
                  </h3>
                  <p className="text-[13px] text-[#55688a] leading-[1.6] flex-1 mb-6">
                    {tool.desc}
                  </p>
                  <Link
                    href={tool.href}
                    className="text-[12px] text-[#0f2963] hover:text-[#1d4ed8] no-underline flex items-center gap-1.5 font-medium transition-colors"
                  >
                    Try tool <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Section with bgEnso.png */}
        <section
          className="py-[120px] md:pb-20 px-6 text-center border-t border-[#0f2963]/8"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(252, 237, 217, 0.95) 0%, rgba(252, 237, 217, 0.3) 100%), url('/bgEnso.png')",
            backgroundSize: "cover",
            backgroundPosition: "center calc(100% + 180px)",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-[900px] mx-auto">
            {/* Call to action card */}
            <div className="mb-[90px]">
              <h2 className="text-[36px] font-medium text-[#0f2963] tracking-[-0.025em] mb-4">
                Align your life goals today.
              </h2>
              <p className="text-[15px] text-[#55688a] leading-[1.6] mb-8 font-light">
                Start generating your Ikigai, capturing ideas, and prioritizing
                tasks without noise.
              </p>

              <div className="flex gap-3 justify-center">
                <Show when="signed-out">
                  <SignUpButton mode="modal" forceRedirectUrl="/tools">
                    <button className="text-[14px] px-6 py-2.5 rounded-[6px] border-none bg-[#0f2963] text-white cursor-pointer font-medium">
                      Start for free
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link
                    href="/tools"
                    className="text-[14px] px-6 py-2.5 rounded-[6px] border-none bg-[#0f2963] text-white cursor-pointer font-medium no-underline"
                  >
                    Enter Workspace
                  </Link>
                </Show>
              </div>
            </div>

            {/* Middle navigation grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-[#0f2963]/8 pt-[60px] pb-[60px] mb-10">
              {/* Brand Profile */}
              <div>
                <span className="sekuya text-lg text-[#0f2963] block mb-3">
                  Enso
                </span>
                <p className="text-[12px] text-[#55688a] leading-[1.6] font-light">
                  A clean, distraction-free environment for aligning life goals,
                  brain dump notes, and prioritizing workload.
                </p>
              </div>

              {/* Tools Column */}
              <div>
                <p className="text-[11px] font-bold text-[#0f2963] uppercase tracking-[0.08em] mb-4">
                  Tools
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  <li>
                    <Link
                      href="/tools/ikigai"
                      className="text-[13px] text-[#55688a] hover:text-[#0f2963] no-underline transition-colors"
                    >
                      Ikigai Builder
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools/idea-vault"
                      className="text-[13px] text-[#55688a] hover:text-[#0f2963] no-underline transition-colors"
                    >
                      Idea Vault
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools/eisen-matrix"
                      className="text-[13px] text-[#55688a] hover:text-[#0f2963] no-underline transition-colors"
                    >
                      Eisenhower Matrix
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <p className="text-[11px] font-bold text-[#0f2963] uppercase tracking-[0.08em] mb-4">
                  Resources
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  <li>
                    <span className="text-[13px] text-[#55688a] cursor-default">
                      Documentation
                    </span>
                  </li>
                  <li>
                    <span className="text-[13px] text-[#55688a] cursor-default">
                      Privacy Guide
                    </span>
                  </li>
                  <li>
                    <span className="text-[13px] text-[#55688a] cursor-default">
                      Focus Techniques
                    </span>
                  </li>
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <p className="text-[11px] font-bold text-[#0f2963] uppercase tracking-[0.08em] mb-4">
                  Product
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  <li>
                    <span className="text-[13px] text-[#55688a] cursor-default">
                      Terms of Service
                    </span>
                  </li>
                  <li>
                    <span className="text-[13px] text-[#55688a] cursor-default">
                      Privacy Policy
                    </span>
                  </li>
                  <li>
                    <span className="text-[13px] text-[#55688a] cursor-default">
                      Support Center
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className="border-t border-[#0f2963]/8 pt-8 flex justify-between items-center">
              <span className="text-[12px] text-[#55688a]">
                &copy; {new Date().getFullYear()} Enso Workspace. All rights
                reserved.
              </span>
              <span className="text-[12px] text-[#55688a] font-light flex items-center gap-1.5">
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
