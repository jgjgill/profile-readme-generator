import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("generate/:username", "routes/generate.$username.tsx"),
  route("shop", "routes/shop.tsx"),
  route("auth/login", "routes/auth.login.tsx"),
  route("auth/callback", "routes/auth.callback.tsx"),
  route("auth/logout", "routes/auth.logout.tsx"),
  route("api/timeline", "routes/api.timeline.tsx"),
  route("api/wave-banner", "routes/api.wave-banner.tsx"),
  route("api/neon-sign", "routes/api.neon-sign.tsx"),
  route("api/typing-animation", "routes/api.typing-animation.tsx"),
] satisfies RouteConfig;
