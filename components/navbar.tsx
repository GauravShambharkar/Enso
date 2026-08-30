"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { useTimeTheme } from "@/hooks/useTimeTheme";

export function Navbar() {
  const { isNight } = useTimeTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] flex items-center justify-between px-6 sm:px-10 bg-transparent z-50">
      {/* Brand */}
      <Link
        href="/"
        className="flex h-[18px] w-[20px] items-center no-underline"
      >
        <Image
          src="/enso.png"
          alt="Enso"
          width={70}
          height={28}
          className={`h-auto w-full object-contain ${isNight ? "brightness-0 invert" : ""}`}
          priority
        />
      </Link>

      {/* Auth */}
      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal" forceRedirectUrl="/tools">
            <button
              className={`text-[13px] px-4 py-1.5 rounded-md border bg-white/10 backdrop-blur-xs cursor-pointer font-medium transition-all duration-300 ${
                isNight
                  ? "border-white/20 text-white hover:border-white hover:bg-white/5"
                  : "border-[#0f2963]/15 text-[#0f2963] hover:border-[#0f2963] hover:bg-[#0f2963]/2"
              }`}
            >
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal" forceRedirectUrl="/tools">
            <button
              className={`text-[14px] px-[14px] py-[4px] rounded-[7px] border-[1px] cursor-pointer font-normal transition-all duration-300 ${
                "bg-gradient-to-b from-[#2361e2] to-[#092257] text-white border-[#ffffff4e] hover:brightness-110"
              }`}
            >
              Get Started
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <Link
            href="/tools"
            className={`text-[13px] px-4 py-1.5 rounded-md border no-underline cursor-pointer font-medium transition-all duration-300 ${
              isNight
                ? "border-white/20 bg-white text-slate-950 hover:bg-white/90"
                : "border-[#0f2963]/15 bg-[#0f2963] text-white hover:opacity-90"
            }`}
          >
            Go to tools
          </Link>
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
