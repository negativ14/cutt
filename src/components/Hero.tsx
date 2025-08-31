"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import link from "@/assets/images/link.png";
import plane from "@/assets/images/plane.png";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useState } from "react";
import { CopyIcon, Loader } from "lucide-react";
import { useShortenUrl } from "@/lib/api/useShortenUrl";
import { toast } from "sonner";
import { copyToClipBoard } from "@/lib/helper";

export default function Hero() {
  const containerRef = useRef(null);
  const [shortenLink, setShortenLink] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [customSlug, setCustomSlug] = useState<string | null>(null);
  const { isPending, mutate } = useShortenUrl();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const handleShortenUrl = () => {
    if (!originalUrl) {
      toast.error("Enter the Url!");
      return;
    }

    mutate(
      { originalUrl, customSlug },
      {
        onSuccess: (data) => {
          if (data)
            setShortenLink(`${process.env.NEXT_PUBLIC_BASE_URI}/${data}`);
        },
        onError: (err) => {
          toast.error("Failed to shorten URL!");
        },
      }
    );
  };
  return (
    <section id="hero" ref={containerRef}>
      <div className="relative py-32 md:py-40">
        <motion.img
          src={link.src}
          alt="link"
          className="lg:h-80 h-55 w-auto absolute -left-20 -top-4 hidden md:block"
          style={{ translateY }}
        />

        <motion.img
          src={plane.src}
          alt="plane"
          className="lg:h-90 h-70 w-auto absolute -bottom-30 -right-20 hidden md:block"
          style={{ translateY }}
        />

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
                onChange={(e) => setOriginalUrl(e.target.value)}
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
                onChange={(e) => setCustomSlug(e.target.value)}
                type="text"
                placeholder="https://example.com/custom-name"
                className="placeholder:text-sm py-5 md:py-6"
              />
            </div>

            {shortenLink && (
              <div className="flex">
                <Input
                  readOnly
                  type="text"
                  placeholder={shortenLink}
                  className="placeholder:text-sm py-5 md:py-6 rounded-br-none rounded-tr-none"
                />
                <div
                  onClick={() => copyToClipBoard(shortenLink)}
                  className="h-auto md:w-1/12 rounded-br-sm rounded-tr-sm border border-l-transparent flex items-center justify-center p-1.5 cursor-pointer"
                >
                  <CopyIcon className="text-neutral-400" />
                </div>
              </div>
            )}

            <Button
              onClick={handleShortenUrl}
              className="font-medium cursor-pointer text-lg py-6 flex items-ceenter justify-center"
            >
              {isPending && <Loader className="animate-spin" />}
              {isPending ? "Shortening..." : "Shorten"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
