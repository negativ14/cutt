"use client";

import Skeleton from "@/components/ui/Skeleton";
import Container from "@/components/Container";

export default function DashboardSkeleton() {
  return (
    <Container>
      <main className="py-8 min-h-[85vh]">
        <div>
          <Skeleton className="h-8 w-2/3 mx-auto mb-10" />

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 p-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border flex flex-col gap-3"
              >
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Container>
  );
}
