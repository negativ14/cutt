"use client";
import GoogleIcon from "@/assets/icon/GoogleIcon";
import { Button } from "./ui/button";
import { LogOutIcon, MenuIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Skeleton from "./ui/Skeleton";

export default function Navbar() {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      id="navbar"
      className="max-w-[1200px] rounded-full relative px-4 md:px-8 lg:px-16 mx-auto"
    >
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-muted-foreground to-transparent bottom-0" />

      <div className="flex justify-between items-center py-6 px-4 md:px-8">
        <Link href="/">
          <h1 className="text-primary font-bold text-3xl">Cutt</h1>
        </Link>

        <div className="flex items-center gap-4">
          {session.status === "loading" && (
            <>
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </>
          )}
          {session.status === "authenticated" && (
            <>
              {pathname === "/dashboard" ? (
                <Link href="/">
                  <Button className="hidden md:block cursor-pointer">
                    Home
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button className="hidden md:block cursor-pointer">
                    Dashboard
                  </Button>
                </Link>
              )}
            </>
          )}

          {session.status === "unauthenticated" && (
            <Button
              className="cursor-pointer"
              variant="secondary"
              onClick={async () =>
                await signIn("google", undefined, { prompt: "select_account" })
              }
            >
              Sign in with
              <GoogleIcon />
            </Button>
          )}

          {session.status === "authenticated" && (
            <MenuIcon
              className="md:hidden cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}

          {session.status === "authenticated" && (
            <Button
              variant="secondary"
              className="hidden md:flex"
              onClick={() => signOut()}
            >
              <span className="cursor-pointer">Sign out</span>
              <LogOutIcon />
            </Button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && session.status === "authenticated" && (
          <motion.div
            className="flex flex-col gap-4 md:hidden overflow-hidden"
            initial={{
              opacity: 0,
              height: 0,
              marginBottom: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              marginBottom: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginBottom: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <div className="flex flex-col gap-4 mb-3">
              <>
                {pathname === "/dashboard" ? (
                  <Link href="/">
                    <Button className="block w-full md:hidden">Home</Button>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <Button className="block w-full md:hidden">
                      Dashboard
                    </Button>
                  </Link>
                )}
              </>
              <Button
                variant="secondary"
                className="flex md:hidden"
                onClick={() => signOut()}
              >
                <span className="">Sign out</span>
                <LogOutIcon />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
