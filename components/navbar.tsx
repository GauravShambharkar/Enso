"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] flex items-center justify-between px-10 bg-transparent z-50">
      {/* Brand */}
      <Link
        href="/"
        className="sekuya text-lg leading-none text-[#0f2963] no-underline font-semibold"
      >
        Enso
      </Link>

      {/* Auth */}
      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal" forceRedirectUrl="/tools">
            <button className="text-[13px] px-4 py-1.5 rounded-[6px] border border-[#0f2963]/15 bg-transparent text-[#0f2963] cursor-pointer font-medium transition-all hover:border-[#0f2963] hover:bg-[#0f2963]/2">
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal" forceRedirectUrl="/tools">
            <button className="text-[13px] px-4 py-1.5 rounded-[6px] border-none bg-[#0f2963] text-white cursor-pointer font-medium transition-opacity hover:opacity-90">
              Get started
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <Link
            href="/tools"
            className="text-[13px] px-4 py-1.5 rounded-[6px] border border-[#0f2963]/15 bg-[#0f2963] text-white no-underline cursor-pointer font-medium"
          >
            Go to tools
          </Link>
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
