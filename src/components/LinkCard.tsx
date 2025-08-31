"use client";
import { copyToClipBoard } from "@/lib/helper";

interface LinkCardProps {
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
  clicks: number;
}

export default function LinkCard({
  shortUrl,
  originalUrl,
  createdAt,
  clicks,
}: LinkCardProps) {
  return (
    <div
      onClick={() => {
        copyToClipBoard(shortUrl);
      }}
      className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border border-neutral-300 rounded-xl cursor-pointer overflow-hidden relative shadow-custom hover:scale-102 transition-all duration-300 bg-[#FEFCF6]"
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold tracking-tight truncate whitespace-nowrap max-w-[85%]">
          {shortUrl}
        </h1>
        <h2 className="tracking-tight text-muted-foreground truncate whitespace-nowrap max-w-[80%] hover:cursor-pointer">
          {originalUrl}
        </h2>
        <p className="text-xs text-primary">{createdAt}</p>
      </div>
      <div className="flex items-center md:flex-col gap-2 mt-4 md:mt-0">
        <h1 className="text-xl font-bold tracking-tight text-center">
          {clicks}
        </h1>
        <p className="text-muted-foreground tracking-tight textcenter">
          Total Clicks
        </p>
      </div>
    </div>
  );
}
