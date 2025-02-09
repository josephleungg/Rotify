'use client';
import VideoGenerator from "@/components/videoGenerator";
import Navbar from "@/components/navbar";
import { useSearchParams } from 'next/navigation';

export default function Video() {
  const searchParams = useSearchParams();
  const summary = searchParams.get('summary');

  return (
    <div className="overflow-y-hidden h-screen">
      <Navbar />
      <VideoGenerator summary={summary} />
    </div>
  );
}
