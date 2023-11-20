"use client";
import HomePage from "./dashboard/home/page";
import StartPage from "./start/page";

import dynamic from "next/dynamic";

// const DynamicMap = dynamic(() => import("../components/Map"), {
//   ssr: false,
// });
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StartPage />
      {/* <DynamicMap /> */}
    </main>
  );
}
