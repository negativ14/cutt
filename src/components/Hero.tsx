"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import link from "@/assets/images/link.png";
import plane from "@/assets/images/plane.png";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section id="hero" ref={containerRef} className="py-12 md:py-40 relative">
      <motion.div
        style={{ translateY }}
        className="absolute -left-20 -top-4 hidden md:block"
      >
        <Image src={link} alt="link" className="lg:h-80 h-55 w-auto" />
      </motion.div>

      <motion.div
        style={{ translateY }}
        className="absolute -bottom-30 -right-20 hidden md:block"
      >
        <Image src={plane} alt="plane" className="lg:h-90 h-70 w-auto" />
      </motion.div>
      <div className="w-full mx-auto flex flex-col text-center gap-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Shorten your links in one click
        </h1>
        <p className="text-lg tracking-tight text-muted-foreground ">
          Fast, simple, and trackable URL shortener.
        </p>

        <div className="flex flex-col gap-8 md:py-6 w-full px-2 md:px-0 md:w-3/4 mx-auto">
          <div className="flex flex-col gap-4">
            <label className="text-lg md:text-xl text-start font-medium">
              Paste Your Link.
            </label>
            <Input
              type="text"
              placeholder="https://example.com"
              className="placeholder:text-sm py-5 md:py-6"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-lg md:text-xl text-start font-medium">
              Your Custom name.{" "}
              <span className="text-muted-foreground font-normal text-sm text-start">
                (optional)
              </span>
            </label>
            <Input
              type="text"
              placeholder="https://example.com/custom-name"
              className="placeholder:text-sm py-5 md:py-6"
            />
          </div>

          <Button className="font-medium text-lg py-6">Generate Url</Button>
        </div>
      </div>
    </section>
  );
}
