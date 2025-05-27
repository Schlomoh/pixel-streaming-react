# Deployment & Scaling: Pixel Streaming with Docker & Cloud

## 1. Docker Compose Example

```yaml
version: "3.8"
services:
  ue_streamer:
    image: myproject-pixelstream:latest
    runtime: nvidia
    network_mode: host
    environment:
      - NVIDIA_DRIVER_CAPABILITIES=all

  signaling:
    image: ghcr.io/epicgames/pixel-streaming-signalling-server:5.6
    network_mode: host

  turn:
    image: coturn/coturn:latest
    command: ["turnserver", "-n", "--log-file=stdout"]
    ports:
      - "3478:3478/udp"
      - "3478:3478/tcp"
```

> Note: Use network_mode: host on Linux for lowest latency. On Windows, map ports manually.

## 2. Cloud Hosting

- **AWS**: EC2 GPU (G4/G5), ECS/EKS for containers, Auto Scaling Group for orchestration.
- **Azure**: NV-series VMs, VM Scale Sets, Azure Pixel Streaming Marketplace Template.
- **Google Cloud**: GPU instances, GKE for containers.

## 3. Staging vs Production

- **Staging:** Single instance, protected by simple auth or VPN. Use for testing/QA.

- **Production:**
  - Use autoscaling (ASG/Scale Sets) for demand-based scaling.
  - Implement a matchmaker or routing backend to assign users to sessions.
  - Terminate idle sessions after timeout to control costs.
  - Consider GPU quotas and encoder limits per node.

## 4. Authentication & Security

- Protect signaling server with HTTPS and valid TLS certs.
- Gate frontend via web auth (OAuth, SSO, etc).
- Optionally, require API token for WebSocket upgrade or use reverse proxy for access control.
- Secure TURN/STUN credentials.

## 5. Scaling Scenarios

- 1:1 Streaming: One UE instance per user/session for max interactivity.
- SFU-based: One UE instance, SFU forwards to many viewers (spectators only, single controller).
- Use horizontal scaling for high concurrency.

## 6. Best Practices

- Use health checks to detect and restart failed containers.
- Monitor GPU/CPU usage for scaling triggers.
- Regularly update all images (UE, signaling, TURN) for security.
- Log all connections, user actions, and errors for traceability.

## 7. Troubleshooting

- If video is black, check GPU drivers and encoding settings.
- If clients can't connect, check port forwarding, signaling logs, and TURN config.
- For high latency, prefer host networking and regional cloud instances close to users.
