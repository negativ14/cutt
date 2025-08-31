"use client";
import { useGetStats } from "@/lib/api/useGetStats";

export default function SiteStats() {
  const { data } = useGetStats();
  console.log("Fetching stats...");

  return (
    <section className="py-16 md:py-32">
      <div className="flex flex-col gap-4 mx-auto">
        <h1 className="text-3xl md:text-5xl text-center font-semibold tracking-tight">
          Our journey in numbers
        </h1>
        <p className="text-center text-lg md:text-xl text-muted-foreground tracking-tight">
          Every click, user, and link tells a part of our story.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div className="flex shadow-lg flex-col gap-4 border border-neutral-300 rounded-xl p-4">
            <h3 className="text-lg text-center text-neutral-700 font-medium">
              Total Users
            </h3>
            <h1 className="text-5xl md:text-6xl text-primary text-center font-bold">
              {data?.userCount ?? "00"}
            </h1>
            <h3 className="text-lg text-center text-muted-foreground">
              and growing every day.
            </h3>
          </div>

          <div className="flex shadow-lg flex-col gap-4 border border-neutral-300 rounded-xl p-4">
            <h3 className="text-lg text-center text-neutral-700 font-medium">
              Total Clicks
            </h3>
            <h1 className="text-5xl md:text-6xl text-primary text-center font-bold">
              {data?.clickCount ?? "00"}
            </h1>
            <h3 className="text-lg text-center text-muted-foreground">
              tracked across all links.
            </h3>
          </div>

          <div className="flex shadow-lg flex-col gap-4 border border-neutral-300 rounded-xl p-4">
            <h3 className="text-lg text-center text-neutral-700 font-medium">
              Total Urls
            </h3>
            <h1 className="text-5xl md:text-6xl text-primary text-center font-bold">
              {data?.urlCount ?? "00"}
            </h1>
            <h3 className="text-lg text-center text-muted-foreground">
              shortened and shared.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
