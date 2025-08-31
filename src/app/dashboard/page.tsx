"use client";
import Container from "@/components/Container";
import LinkCard from "@/components/LinkCard";
import DashboardSkeleton from "@/components/skeletons/DashBoardSkeleton";
import { useGetUrls } from "@/lib/api/useGetUrls";

interface UrlProps {
  id: string;
  shortId: string;
  originalUrl: string;
  createdAt: string;
  _count: { clicks: number };
}

export default function Dashboard() {
  const { data, isLoading } = useGetUrls();
  console.log("teh data", data);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const sortedData = [...(data ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Container>
      <main className="py-8 min-h-[85vh]">
        <div>
          <h1 className="text-2xl md:text-5xl md:py-10 font-semibold text-center tracking-tight">
            All your created links.
          </h1>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 p-4 mt-4">
            {sortedData?.map(
              ({ id, shortId, originalUrl, createdAt, _count }: UrlProps) => (
                <LinkCard
                  key={id}
                  shortUrl={`${process.env.NEXT_PUBLIC_BASE_URI}/${shortId}`}
                  originalUrl={originalUrl}
                  clicks={_count.clicks}
                  createdAt={createdAt.slice(0, 10)}
                />
              )
            )}
          </div>
        </div>
      </main>
    </Container>
  );
}
