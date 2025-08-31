import { toast } from "sonner";

export const copyToClipBoard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
    toast.success("Url copied to clipboard.");
  } catch (error) {
    toast.error("Falied to copy.");
  }
};
