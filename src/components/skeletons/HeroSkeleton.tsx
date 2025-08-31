"use client";

import Skeleton from "../ui/Skeleton";

export default function HeroSkeleton() {
  return (
    <section
      id="hero"
      className="py-12 md:py-40 relative min-h-[85vh] max-w-[1200px] mx-auto"
    >
      <div className="w-full mx-auto flex flex-col text-center gap-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />

        <Skeleton className="h-4 w-1/2 mx-auto" />

        <div className="flex flex-col gap-8 md:py-6 w-full px-2 md:px-0 md:w-3/4 mx-auto">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="flex">
            <Skeleton className="h-12 w-full rounded-br-none rounded-tr-none" />
            <Skeleton className="h-12 w-16 rounded-bl-none rounded-tl-none" />
          </div>

          <Skeleton className="h-12 w-full mx-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
}
