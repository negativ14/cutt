"use client";
import Image from "next/image";
import dashboard from "@/assets/images/dashboard.png";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export default function ProductShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  return (
    <section ref={containerRef} className="md:py-16 lg:py-28">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 max-w-[90%] mx-auto">
          <h1 className="text-center text-3xl md:text-5xl tracking-tight font-semibold">
            A dashboard built for simplicity
          </h1>
          <p className="text-center text-lg md:text-xl text-muted-foreground tracking-tight ">
            Manage your links with an interface that’s clean, intuitive, and
            designed to save you time.
          </p>
        </div>

        <motion.div
          style={{
            opacity,
            rotateX,
            transformPerspective: "800px",
          }}
          className="mt-6 md:mt-16 relative"
        >
          <Image
            src={dashboard}
            alt="dashboard"
            className="h-auto w-full rounded-xl shadow-custom"
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
}
