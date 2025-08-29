import { FaXTwitter } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="max-w-[1200px] py-6 md:py-8 px-4 md:px-8 lg:px-16 mx-auto relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-muted-foreground to-transparent" />
      <div className="flex justify-between items-center">
        <h1 className="">Design and Developed by Rohit.</h1>
        <div className="flex gap-4 items-center">
          <a
            href="https://x.com/RohitMehta1409"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="size-5" />
          </a>
          <a
            href="https://github.com/negativ14/cutt"
            rel="noopener noreferrer"
            target="_blank"
          >
            <TbBrandGithubFilled className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
