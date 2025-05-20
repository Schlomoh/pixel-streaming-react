import { useEffect, useRef, useState } from "react";
import {
  type AllSettings,
  Config,
  PixelStreaming,
} from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.6";

export interface PixelStreamingWrapperProps {
  initialSettings?: Partial<AllSettings>;
}

const PixelStreamingWrapper = ({
  initialSettings,
}: PixelStreamingWrapperProps) => {
  // A reference to parent div element that the Pixel Streaming library attaches into:
  const videoParent = useRef<HTMLDivElement>(null);

  // Pixel streaming library instance is stored into this state variable after initialization:
  const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming>();

  // A boolean state variable that determines if the Click to play overlay is shown:
  const [clickToPlayVisible, setClickToPlayVisible] = useState(true);

  // Run on component mount:
  useEffect(() => {
    if (!videoParent.current) return;

    // Attach Pixel Streaming library to videoParent element:
    const config = new Config({ initialSettings });

    const streaming = new PixelStreaming(config, {
      videoElementParent: videoParent.current,
    });

    const onPlayStreamRejected = () => {
      setClickToPlayVisible(true);
    };

    // register a playStreamRejected handler to show Click to play overlay if needed:
    streaming.addEventListener("playStreamRejected", onPlayStreamRejected);

    // Save the library instance into component state so that it can be accessed later:
    setPixelStreaming(streaming);

    // Clean up on component unmount:
    return () => {
      try {
        streaming.removeEventListener(
          "playStreamRejected",
          onPlayStreamRejected
        );
        streaming.disconnect();
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error during Pixel Streaming cleanup:", error.message);
        } else {
          console.error(error);
        }
      }
    };
  }, []);

  function handleClickToPlay() {
    pixelStreaming?.play();
    setClickToPlayVisible(false);
  }

  return (
    <div className="relative h-full w-full ">
      <div className="w-full h-full" ref={videoParent} />
      {clickToPlayVisible && (
        <div
          className="w-full h-full top-0 left-0 absolute flex items-center justify-center pointer"
          onClick={handleClickToPlay}
        >
          <button className="text-foreground">Click to play</button>
        </div>
      )}
    </div>
  );
};

export default PixelStreamingWrapper;
