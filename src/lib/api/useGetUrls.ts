import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const getUrls = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/user/urls`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("the response data", data);
    if (data.error) {
      toast.error(`${data.error}`);
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
};

export const useGetUrls = () => {
  return useQuery({
    queryKey: ["urls"],
    queryFn: getUrls,
  });
};
