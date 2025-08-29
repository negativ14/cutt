"use client";

import CallToAction from "@/components/CallToAction";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import SiteStats from "@/components/SiteStats";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  // Handle loading state
  if (status === "loading") {
    return <p>Loading session...</p>;
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
