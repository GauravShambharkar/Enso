"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const LoginView = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black font-light tracking-tight">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating Home Link */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 text-sm z-50"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="relative z-10 w-full flex justify-center py-12">
        <SignIn forceRedirectUrl="/tools" signUpUrl="/signup" />
      </div>
    </div>
  );
};

export default LoginView;
