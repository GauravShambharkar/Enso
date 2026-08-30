"use client";

import Link from "next/link";
import Image from "next/image";
import { SignUpButton, Show } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { Compass, Brain, Target, ArrowRight } from "lucide-react";
import { useTimeTheme } from "@/hooks/useTimeTheme";
import { LandingCtaSection, LandingFooterSection } from "@/components/landing-sections";

const TOOLS = [
  {
    name: "Ikigai Workspace",
    icon: Compass,
    color: "#c084fc",
    desc: "A reflection tool to align what you love, what you're good at, what the world needs, and what you can get paid for. Synthesize your life purpose.",
    href: "/tools/ikigai",
    image: "/ikigai.png",
  },
  {
    name: "Idea Vault",
    icon: Brain,
    color: "#a78bfa",
    desc: "A distraction-free zone to capture raw thoughts and ideas the second they arrive. Review and develop them in a split-pane layout at your own pace.",
    href: "/tools/idea-vault",
    image: "/ideaVault.png",
  },
  {
    name: "Eisen Matrix",
    icon: Target,
    color: "#60a5fa",
    desc: "A project-based Eisenhower prioritization matrix. Drag, sort, and organize tasks into urgency and importance quadrants to clear visual clutter.",
    href: "/tools/eisen-matrix",
    image: "/EisenMatrix.png",
  },
];

export default function Home() {
  const { isNight } = useTimeTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isNight ? "bg-[#06174B]" : "bg-[#FCEDD9]"}`}
    >
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          className={`relative min-h-[100svh] md:h-screen flex flex-col items-center justify-start text-center px-6 pt-[137px] md:pt-[137px] max-[750px]:pt-[150px] transition-all duration-300 ${isNight ? "bg-[#06174B]" : "bg-[#FCEDD9]"}`}
          style={{
            backgroundImage: isNight
              ? "url('/bgDarkTheme.png')"
              : "linear-gradient(to bottom, rgba(255, 255, 255, 0) 82%, rgba(253, 246, 235, 1) 97%), url('/landing-hero-reference.png')",
            backgroundSize: "cover",
            backgroundPosition: "center calc(100% + 110px)",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-[650px]">
            {/* Headline */}
            <h1
              className={`hero-serif text-[36px] tracking-[-0.04em] sm:text-[44px] md:text-[50px] font-medium leading-[1.18] mb-4 transition-colors duration-300 ${isNight ? "text-[#F8DCC2]" : "text-[#224388]"}`}
            >
              Finding Your Focus In a World Full Of Noise!!
            </h1>

            {/* Description */}
            <p
              className={`hero-serif text-[15px] sm:text-[16px] w-full leading-[1.65] mb-8 max-w-[575px] mx-auto font-normal px-2 max-[750px]:text-[13px] transition-colors duration-300 ${isNight ? "text-slate-400" : "text-[#879dc6]"}`}
            >
              Designed for Everyone who want to cultivate clarity. Align your
              life goals, capture ideas, and prioritize work without
              distractions.
            </p>

            {/* Call to Action Button */}
            <div className="flex justify-center group">
              <Show when="signed-out">
                <SignUpButton mode="modal" forceRedirectUrl="/tools">
                  <button className="text-[14px] px-[16px] py-[6px] rounded-[7px] border-[1.5px] cursor-pointer font-normal flex items-center gap-2 transition-all duration-300 bg-gradient-to-b from-[#2361e2] to-[#092257] text-white border-[#4574d2] group hover:border-[#84acff] hover:brightness-110">
                    Start Free{" "}
                    <ArrowRight className="size-4 group-hover:translate-x-1 ease-in-out duration-300" />
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
            className={`absolute bottom-0 left-0 right-0 h-[240px] bg-gradient-to-t to-transparent pointer-events-none transition-colors duration-300 ${isNight ? "from-[#06174B] via-[#06174B]/30" : "from-[#06174B] via-[#06174B]/30 max-[450px]:from-[#06174B] max-[450px]:via-[#06174B]/10"}`}
          />
        </section>

        {/* Feature Grid Section */}
        <section className="bg-[#06174B] py-20 md:py-[100px] px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-[54px]">
              <p className="hero-serif text-[16px] mb-2 text-[#84ACFF]">
                Core Features
              </p>
              <h2 className="hero-serif text-[32px] font-medium tracking-[-0.02em] text-white">
                Minimalist tools for complex minds.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-8">
              {TOOLS.map((tool) => {
                return (
                  <div
                    key={tool.name}
                    className="hero-serif relative mx-auto flex h-[400px] w-full max-w-[300px] flex-col overflow-hidden rounded-[3px] bg-[#F8F3E7] px-7 pt-8 text-center text-[#0F2963]"
                  >
                    <div className="absolute right-0 top-0 h-[24px] w-[24px]">
                      <Image src="/CornerAsset.png" alt="" fill sizes="26px" />
                    </div>
                    <h3 className="text-[30px] font-medium leading-tight tracking-[-0.04em]">
                      {tool.name}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.45] text-[#46649B]">
                      {tool.desc}
                    </p>
                    <div className="relative mb-10 mt-auto h-[218px] w-full">
                      <Image
                        src={tool.image}
                        alt=""
                        fill
                        sizes="300px"
                        className="object-contain object-bottom"
                      />
                    </div>
                    {/* <Link href={tool.href} className="sr-only">Try tool</Link> */}
                    <div className="absolute bottom-0 left-0 h-[24px] w-[24px] rotate-180">
                      <Image src="/CornerAsset.png" alt="" fill sizes="36px" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section with its own artwork */}
        <LandingCtaSection isNight={isNight}>
              <h2
                className={`hero-serif text-[32px] sm:text-[42px] font-medium tracking-[-0.035em] mb-4 transition-colors duration-300 ${isNight ? "text-[#F8DCC2]" : "text-[#0f2963]"}`}
              >
                Align your life goals today.
              </h2>
              <p
                className={`hero-serif text-[16px] sm:text-[18px] leading-[1.5] mb-8 max-w-[600px] mx-auto px-2 transition-colors duration-300 ${isNight ? "text-[#A9B9D8]" : "text-[#55688a]"}`}
              >
                Start generating your Ikigai, capturing ideas, and prioritizing
                tasks without noise.
              </p>

              <div className="flex gap-3 justify-center">
                <Show when="signed-out">
                  <SignUpButton mode="modal" forceRedirectUrl="/tools">
                    <button className="text-[14px] px-4 py-2 rounded-[7px] border-[1.5px] border-[#84acff] cursor-pointer font-normal text-white transition-all duration-300 bg-gradient-to-b from-[#2361e2] to-[#092257] hover:brightness-110">
                      Start For Free
                    </button>
                  </SignUpButton>
                </Show>

                <Show when="signed-in">
                  <Link
                    href="/tools"
                    className="text-[14px] px-6 py-2.5 rounded-[7px] border-[1.5px] border-[#84acff] cursor-pointer font-normal text-white no-underline transition-all duration-300 bg-gradient-to-b from-[#2361e2] to-[#092257] hover:brightness-110"
                  >
                    Enter Workspace
                  </Link>
                </Show>
              </div>
        </LandingCtaSection>

        {/* Footer Section with its own artwork */}
        <LandingFooterSection isNight={isNight}>
          <div className="max-w-[1100px] mx-auto">
            {/* Middle navigation grid */}
            <div
              className={`grid grid-cols-2 gap-x-6 gap-y-10 text-left border-t pt-10 pb-10 mb-8 transition-colors duration-300 sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:pb-[60px] md:pt-[60px] md:mb-10 ${isNight ? "border-white/10" : "border-[#0f2963]/8"}`}
            >
              {/* Brand Profile */}
              <div className="col-span-2 md:col-span-1">
                  <Image
                    src="/enso.png"
                    alt="Enso"
                    width={76}
                    height={30}
                    className={`mb-3 h-auto w-[76px] object-contain ${isNight ? "brightness-0 invert" : ""}`}
                  />
                <p
                  className={`hero-serif text-[15px] leading-[1.55] transition-colors duration-300 ${isNight ? "text-[#A9B9D8]" : "text-[#55688a]"}`}
                >
                  A clean, distraction-free environment for aligning life goals,
                  brain dump notes, and prioritizing workload.
                </p>
              </div>

              {/* Tools Column */}
              <div>
                <p
                  className={`hero-serif text-[19px] font-medium mb-4 transition-colors duration-300 ${isNight ? "text-[#F8DCC2]" : "text-[#0f2963]"}`}
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
                  className={`hero-serif text-[19px] font-medium mb-4 transition-colors duration-300 ${isNight ? "text-[#F8DCC2]" : "text-[#0f2963]"}`}
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
                  className={`hero-serif text-[19px] font-medium mb-4 transition-colors duration-300 ${isNight ? "text-[#F8DCC2]" : "text-[#0f2963]"}`}
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
        </LandingFooterSection>
      </main>
    </div>
  );
}
