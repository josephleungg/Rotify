'use client'
import react from "react";
import { useState } from "react";

import Image from "next/image";

export default function Home() {

  // const [urlDisplay]
  return (
    <div className="flex flex-col gap-32 items-center justify-center h-screen bg-slate-950">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={72}
          height={16}
        />
        <h1 className="text-4xl">Rotify</h1>
        <p>
          Turn informaton into an engaging, brain-boosting video!
        </p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <p>
          Drop a link to any website or article, and we'll transform it into an immersive, interactive video
        </p>
        <input
          type="text"
          placeholder="Enter URL"
          className="border-2 border-gray-200 p-2 rounded-lg w-[45vw]">
        </input>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Generate
        </button>
      </div>
       
    </div>
  );
}
