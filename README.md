# Pixel Streaming React

A React application that integrates with Unreal Engine's Pixel Streaming technology using React Router v7.

## Overview

This project provides a React wrapper around Epic Games' Pixel Streaming library, allowing you to embed Unreal Engine content directly in your web application. The implementation uses React Router v7 for routing and Tailwind CSS for styling.

## Features

- Seamless integration with Unreal Engine's Pixel Streaming
- React Router v7 for navigation and routing
- Tailwind CSS for styling
- TypeScript support
- Click-to-play overlay for user interaction
- Configurable streaming settings

## Prerequisites

- Node.js (latest LTS version recommended)
- An Unreal Engine Pixel Streaming server running

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd pixel-streaming-react
npm install
```

## Usage

1. Development
   Start the development server:

   ```bash
   npm run dev
   ```

   This will start the application at [localhost:5173](http://localhost:5173) by default.

2. Building for Production
   Build the application:

   ```bash
   npm run build
   ```

   Starting the Production Server

   ```bash
   npm run start
   ```

Configuration

The [PixelStreamingWrapper](./app/components/pixel-streaming-wrapper/pixel-streaming-wrapper.tsx) component accepts configuration options through the [initialSettings](./app/components/pixel-streaming-wrapper/pixel-streaming-wrapper.tsx) ([See `AllSettings`](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/Frontend/library/src/Config/Config.ts#L124)) prop:

```typescript
<PixelStreamingWrapper
  initialSettings={{
    KeyboardInput: true,
    MouseInput: true,
    AutoConnect: true,
    ss: "ws://localhost:80", // WebSocket URL to your Pixel Streaming server
    StartVideoMuted: true,
    WaitForStreamer: true,
  }}
/>
```

## Project Structure

- app/ - Application source code
  - components/ - Reusable components
    - pixel-streaming-wrapper/ - Pixel Streaming integration
  - routes/ - Application routes
  - root.tsx - Root component and layout
  - public/ - Static assets

## Dependencies

This project uses:

- [@epicgames-ps/lib-pixelstreamingfrontend-ue5.6](https://github.com/EpicGamesExt/PixelStreamingInfrastructure?tab=readme-ov-file) - Epic Games' Pixel Streaming frontend library
- [React Router v7](https://reactrouter.com/start/framework/installation) - For routing
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) - For styling
