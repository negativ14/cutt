import React from "react";

export default function Container(props: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-[1200px] relative px-4 md:px-8 lg:px-16 overflow-x-clip">
      {props.children}
    </main>
  );
}
