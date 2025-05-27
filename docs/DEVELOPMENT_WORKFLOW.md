# Development Workflow for UE + React Pixel Streaming

## 1. Prerequisites

- Unreal Engine 5.6 (with Pixel Streaming enabled)
- Node.js (for signaling server)
- Docker & NVIDIA Docker (for containerized workflows)
- React (latest)
- (Optional) TURN/STUN server for public access

## 2. Local Development

### Unreal Side

- Develop and test interaction logic using PIE (Play-In-Editor) and Standalone.
- Use `-PixelStreamingIP=127.0.0.1 -PixelStreamingPort=8888` for local signaling server.
- Set up a test Blueprint with `OnPixelStreamingInputEvent`.

### Signaling Server

- Start signaling server from Epic’s Pixel Streaming Infrastructure.

```sh
./start_with_stun.sh
```

- For Docker: use Epic’s Docker image or build your own.

### React Side

- Run React dev server as usual (`npm run dev` or `npm start`).
- Proxy or CORS may be needed if React and signaling run on different origins.

### Integration

- Open React app, connect to signaling server, and verify video stream.
- Use browser DevTools and UE logs for debugging event handling.

## 3. Version Control

- Use a mono-repo or separate repos for React and UE.
- Store all config files, protocol definitions, and Dockerfiles.
- Maintain documentation in `/docs` or as markdown in repo.

## 4. Testing

- Test all UI commands (color, part, camera, environment).
- Test error paths and unexpected JSON.
- Simulate poor network conditions (using Chrome devtools, etc.).
- Test multi-user and session handover if needed.

## 5. Build Artifacts

- For deployment, package UE project for production.
- Build React app with `npm run build`.
- Containerize both UE and signaling server for cloud deployment.

## 6. CI/CD (Optional)

- Use GitHub Actions or similar for:
- Lint/build React app
- Package UE builds
- Build Docker images
- Push to container registry
- Deploy with Docker Compose or Kubernetes manifests.

## 7. Documentation

- Keep all event protocols, endpoints, and deployment guides up to date.
- Provide architecture diagrams for clarity.
