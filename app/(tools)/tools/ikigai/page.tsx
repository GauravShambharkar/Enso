import React, { Suspense } from "react";
import Ikigai from "@/features/ikigai/Ikigai";

const page = () => {
  return (
    <Suspense fallback={
      <div className="w-full px-6 md:px-10 py-8 bg-background min-h-screen animate-pulse">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-border pb-4">
          <div>
            <div className="h-8 bg-secondary rounded-sm w-48 mb-2" />
            <div className="h-4 bg-secondary rounded-sm w-80" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="w-72 h-72 rounded-full bg-secondary" />
          </div>
          <div className="lg:col-span-7 w-full flex flex-col gap-4">
            <div className="h-6 bg-secondary rounded w-32 mb-4" />
            <div className="h-4 bg-secondary rounded w-full" />
            <div className="h-4 bg-secondary rounded w-full" />
          </div>
        </div>
      </div>
    }>
      <Ikigai />
    </Suspense>
  );
};

export default page;