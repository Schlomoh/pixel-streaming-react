import { PixelStreamingWrapper } from "~/components/pixel-streaming-wrapper";
import type { Route } from "./+types/home";

export function loader() {
  return { name: "React Router" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-screen h-screen">
      <PixelStreamingWrapper
        initialSettings={{
          KeyboardInput: true,
          MouseInput: true,
          AutoConnect: true,
          ss: "ws://localhost:80",
          StartVideoMuted: true,
          WaitForStreamer: true,
        }}
      />
    </div>
  );
}
