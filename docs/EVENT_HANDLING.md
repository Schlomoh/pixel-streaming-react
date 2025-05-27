# Event Handling: Pixel Streaming UI Protocol

## 1. Bi-Directional Communication

- **emitUIInteraction:** Send JSON events from web to UE via WebRTC data channel.
- **SendPixelStreamingResponse:** UE can reply/notify web UI.

## 2. Blueprint Integration (Unreal Side)

- Add **PixelStreamingInputComponent** to PlayerController (or UI manager Actor).
- In Event Graph:
  1. On BeginPlay, **Bind Event to OnPixelStreamingInputEvent**.
  2. Use the **Descriptor** parameter (JSON string).
  3. Parse JSON using Blueprint nodes (`Get JSON Field`, etc).
  4. Switch logic based on `"command"` field.

## 3. Example Protocol

| Command        | Parameters                      | Action                         |
| -------------- | ------------------------------- | ------------------------------ |
| ChangeColor    | part, color (hex or RGB)        | Set dynamic material on mesh   |
| SwapPart       | part, variant                   | Show/hide or attach new mesh   |
| FocusCamera    | target (part/camera preset)     | Play camera animation/sequence |
| SetTimeOfDay   | hour (0-23)                     | Adjust directional light/sky   |
| SetEnvironment | preset (day, night, rainy, etc) | Switch HDRI, sublevel, etc     |

**Example JS sent from React:**

```js
emitUIInteraction({
  command: "ChangeColor",
  part: "Body",
  color: "#FF0000",
});
```

**Blueprint Pseudocode:**

```c++
OnPixelStreamingInputEvent(Descriptor)
  Parse Descriptor as JSON
  Switch (Descriptor.command)
    "ChangeColor"  -> Set Material Color
    "SwapPart"     -> Swap Mesh
    "FocusCamera"  -> Play Animation
    ...
```

## 4. Returning Data to Web

Use `SendPixelStreamingResponse` Blueprint node to send JSON to web.

In React, register a response event listener to handle UE responses (e.g., completion, errors).

## 5. Tips

- Always validate inputs in Blueprint.

- Define a versioned protocol if you expect evolution.

- Log or display unrecognized commands for debugging.
