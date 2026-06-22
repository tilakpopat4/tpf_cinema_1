"use client";

import dynamic from "next/dynamic";

// Dynamically import the VideoPlayer with SSR disabled
// This prevents 'document is not defined' errors from plyr-react
const PlyrPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
});

interface VideoPlayerProps {
  url: string;
  poster?: string;
  title?: string;
  director?: string;
  synopsis?: string;
}

export default function VideoPlayerWrapper(props: VideoPlayerProps) {
  return <PlyrPlayer {...props} />;
}
