import React, { Suspense } from "react";
import EisenMatrix from "@/features/eisen-matrix/EisenMatrix";

const page = () => {
  return (
    <Suspense fallback={
      <div className="px-6 md:px-10 py-8 min-h-screen bg-background animate-pulse">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 bg-secondary rounded-sm w-44 mb-2" />
            <div className="h-4 bg-secondary rounded-sm w-72" />
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-border/60 py-4 pr-2.5">
          <div className="h-14 bg-secondary rounded-sm w-full" />
          <div className="h-14 bg-secondary rounded-sm w-full" />
          <div className="h-14 bg-secondary rounded-sm w-full" />
        </div>
      </div>
    }>
      <EisenMatrix />
    </Suspense>
  );
};

export default page;