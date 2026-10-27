// Splash screen: brands the app for ~2s, then routes to home or login.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { getSession } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bharat Roots — Explore India's Living Heritage" },
      {
        name: "description",
        content:
          "Folk arts, cuisines, festivals and community stories from 10 Indian states, in one app.",
      },
      { property: "og:title", content: "Bharat Roots — Explore India's Living Heritage" },
      {
        property: "og:description",
        content: "Folk arts, cuisines, festivals and community stories from 10 Indian states.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = window.setTimeout(() => {
      navigate({ to: getSession() ? "/home" : "/login" });
    }, 2000);
    return () => window.clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary via-[oklch(0.62_0.17_25)] to-[oklch(0.375_0.039_252)] px-6 text-center text-primary-foreground">
      <div className="animate-rise">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gold text-gold-foreground shadow-float">
          <span className="font-display text-4xl font-bold">भा</span>
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Bharat Roots</h1>
        <p className="mt-2 text-sm text-primary-foreground/85">
          India's heritage, told by its people
        </p>
      </div>
      <div className="mt-12 h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
    </div>
  );
}
