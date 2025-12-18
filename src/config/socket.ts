// src/services/echoService.ts
import { getStoredTokens } from "@/lib/tokenStorage";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import config from ".";

// Make Pusher available globally for Laravel Echo (required for Reverb)
declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<"reverb">; // Changed from "pusher" to "reverb"
  }
}

window.Pusher = Pusher;

const token = getStoredTokens()?.accessToken || "";

// ✅ Initialize Echo for Laravel Reverb WITHOUT authentication
window.Echo = new Echo<"reverb">({
  // Changed from "pusher" to "reverb"
  broadcaster: "reverb", // Changed from "pusher" to "reverb"
  key: config.reverb.appKey,
  wsHost: config.reverb.host,
  wsPort: config.reverb.port,
  wssPort: config.reverb.port,
  forceTLS: config.reverb.scheme === "wss",
  enabledTransports: ["ws", "wss"],
  // ✅ REMOVED authEndpoint and auth to prevent authentication errors
  authEndpoint: config.backendUrl,
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

console.log("✅ Laravel Reverb initialized for public channels");

export default window.Echo;
