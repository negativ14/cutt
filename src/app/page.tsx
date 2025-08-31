"use client";

import CallToAction from "@/components/CallToAction";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import SiteStats from "@/components/SiteStats";
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return <HeroSkeleton />;
  }

  return (
    <main>
      <Container>
        <Hero />
        <SiteStats />
        <ProductShowcase />
        <CallToAction />
      </Container>
    </main>
  );
}
