import React, { Suspense } from "react";
import Idea_Vault from "@/features/idea-vault/Idea-Vault";

const page = () => {
  return (
    <Suspense fallback={
      <div className="w-full px-6 md:px-10 py-8 min-h-screen bg-background animate-pulse">
        <div className="h-8 bg-secondary rounded-sm w-48 mb-2" />
        <div className="h-4 bg-secondary rounded-sm w-24 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3 py-3 pr-2.5">
            <div className="h-10 bg-secondary rounded-sm w-full" />
            <div className="h-10 bg-secondary rounded-sm w-full" />
            <div className="h-10 bg-secondary rounded-sm w-full" />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 h-48 bg-secondary rounded-sm w-full" />
        </div>
      </div>
    }>
      <Idea_Vault />
    </Suspense>
  );
};

export default page;