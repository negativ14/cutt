"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  // Handle loading state
  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  return (
    <nav className="flex flex-col items-center gap-4 p-6">
      {!session ? (
        <>
          <p>You are not signed in</p>
          <button
            onClick={async () =>
              await signIn("google", undefined, {
                prompt: "select_account",
              })
            }
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <p>Welcome, {session.user?.name}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Sign out
          </button>
        </>
      )}
    </nav>
  );
}
