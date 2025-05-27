# Unreal Engine 5.6 Pixel Streaming Setup

## 1. Enable Pixel Streaming Plugin

- Open your project in Unreal Engine 5.6.
- Go to **Edit > Plugins > Graphics**.
- Enable the **Pixel Streaming** plugin.
- Restart the editor.

## 2. Project Settings

- In **Edit > Project Settings > Pixel Streaming**:
  - Set default resolution (e.g., 1920x1080).
  - Adjust bitrate (e.g., 10 Mbps) for quality/performance.
  - Set framerate (e.g., 60 FPS for smoothness).
  - (Optional) Enable AV1 codec for higher quality at lower bitrate (requires supported GPU).

## 3. Packaging the Project

- Go to **File > Package Project > [Windows/Linux]**.
- Select a folder to save your build.
- Ensure Pixel Streaming plugin is included.
- For containerized or cloud use, package for **Linux** when possible (preferred for Docker).

## 4. Pixel Streaming Startup Parameters

- When launching your packaged build, use:

```bash
MyProject.exe -PixelStreamingIP=127.0.0.1 -PixelStreamingPort=8888 -RenderOffscreen -Windowed -ForceRes -ResX=1920 -ResY=1080
```

- `-RenderOffscreen` is crucial for headless operation.
- Adjust IP and port to match your signaling server.
- For Linux, launch the `.sh` wrapper with the same flags.

## 5. Signaling Server (Official)

- Download the Pixel Streaming Infrastructure (signaling server) from Epic’s GitHub or use prebuilt Docker images.
- Run with:

```bash
> cd Engine/Plugins/Media/PixelStreaming/Resources/WebServers/SignallingWebServer/platform_scripts/cmd

> ./start_with_stun.bat (or .sh)
```

- Listens on **port 8888** for streamer, **80** for web clients.
- Modify `config.json` for TURN/STUN settings if needed.

## 6. Networking

- Open required ports: **80** (HTTP/WS), **443** (HTTPS/WSS), **8888** (WebSocket for streamer).
- If internet-facing, use HTTPS with valid certificates.
- Configure TURN/STUN for NAT traversal in production.

## 7. Best Practices

- For multi-user, consider one UE instance per session.
- For spectators, use SFU (Selective Forwarding Unit) in UE 5.5+ (experimental).
- Monitor GPU encoding session limits (NVIDIA cards typically allow 2–5 concurrent streams per GPU).
