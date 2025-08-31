import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchShortenUrl = async (
  originalUrl: string,
  customSlug: string | null
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/shorten`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl, customSlug }),
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(`${data.error}`);
      return;
    }
    toast.success("URL created successfully!");
    return data.Url.shortId;
  } catch (error) {
    return null;
  }
};

const useShortenUrl = () => {
  return useMutation({
    mutationFn: ({
      originalUrl,
      customSlug,
    }: {
      originalUrl: string;
      customSlug: string | null;
    }) => fetchShortenUrl(originalUrl, customSlug),
  });
};

export { useShortenUrl };
