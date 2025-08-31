import { useQuery } from "@tanstack/react-query";

const getStats = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response).json();
    return data;
  } catch (error) {
    return null;
  }
};

export const useGetStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
};
