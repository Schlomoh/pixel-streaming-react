# React Integration: Pixel Streaming Configurator UI

## 1. Pixel Streaming Library

- Install Epic’s frontend library (example):

```bash
  npm install @epicgames-ps/lib-pixelstreamingfrontend-ue5.6
```

- Use or adapt the provided Pixel Streaming React components.

## 2. Basic Integration

```tsx
import { useEffect, useRef } from "react";
import { PixelStreaming } from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.6";

export default function PixelStreamingView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const stream = new PixelStreaming({
      videoElement: videoRef.current,
      signallingUrl: "ws://your-signal-server:80/signalling",
    });
    return () => stream.close();
  }, []);
  return <video ref={videoRef} autoPlay playsInline />;
}
```

## 3. UI Overlay Design

- Build React UI overlay: buttons, color pickers, sliders, etc.
- When user interacts, call:

```js
pixelStreaming.emitUIInteraction({
  command: "ChangeColor",
  part: "Roof",
  color: "#00FF00",
});
```

- For camera, part, environment, repeat with suitable protocol.

## 4. Receiving Responses

```js
pixelStreaming.addResponseEventListener((msg) => {
  // Handle events from UE (e.g., completion, error, state sync)
});
```

## 5. Touch & Mouse Controls

- Use `controlScheme` config for pointer lock/hovering as needed.
- Prevent click-through from UI elements to UE video when overlay is active.
- For mobile, ensure touch events are mapped (Pixel Streaming lib does this by default).

## 6. Example UI Features

- Color Picker (for materials)
- Dropdown/Selector (for variants/parts)
- Environment Presets (buttons/sliders)
- Camera Jump buttons (for part highlights)
- Day/Night slider

## 7. Advanced

- Maintain state in React (current config, sync from UE on load).
- Support multi-user with role-based UI (e.g., only one controller).
- Responsive layout for mobile/desktop.
