// Home screen: searchable list of the 10 featured states.
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { HERITAGE_STATES } from "@/lib/heritage";
import { useSession } from "@/lib/store";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Explore states · Bharat Roots" },
      {
        name: "description",
        content: "Browse folk arts, cuisines and festivals across 10 Indian states.",
      },
      { property: "og:title", content: "Explore states · Bharat Roots" },
      {
        property: "og:description",
        content: "Browse folk arts, cuisines and festivals across 10 Indian states.",
      },
    ],
  }),
  component: HomeScreen,
});

function HomeScreen() {
  const { user } = useSession();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  // Debounced search so typing stays smooth.
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim().toLowerCase()), 250);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const states = useMemo(() => {
    if (!debounced) return HERITAGE_STATES;
    return HERITAGE_STATES.filter((s) => {
      const haystack = [
        s.name,
        s.description,
        ...s.folkArts.map((f) => f.name),
        ...s.cuisine.map((c) => c.name),
        ...s.traditions.map((t) => t.name),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(debounced);
    });
  }, [debounced]);

  const refresh = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 600);
  };

  return (
    <AppShell>
      <header className="bg-primary px-4 pb-6 pt-7 text-primary-foreground lg:border-b lg:border-border lg:bg-background lg:px-10 lg:pb-8 lg:pt-10 lg:text-foreground xl:px-14">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="flex min-w-0 items-center gap-3 lg:hidden">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold font-display text-xl font-bold text-gold-foreground">
            भा
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-bold leading-tight">Bharat Roots</h1>
            <p className="text-xs text-primary-foreground/85">
              {user ? `Namaste, ${user.username}` : "India's living heritage"}
            </p>
          </div>
          </div>
          <div className="hidden min-w-0 lg:block">
            <p className="text-sm font-medium text-primary">Explore India</p>
            <h1 className="mt-1 font-display text-4xl font-bold">Stories carried through generations</h1>
            <p className="mt-2 text-base text-muted-foreground">
              {user ? `Namaste, ${user.username}. Choose a state to begin.` : "Choose a state to begin."}
            </p>
          </div>
          <Button type="button" onClick={refresh} aria-label="Refresh" variant="ghost" size="icon" className="tap bg-primary-foreground/15 lg:bg-muted">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative mt-5 lg:max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search states or heritage..."
            aria-label="Search states or heritage"
            className="h-11 rounded-xl border-0 bg-card pl-9 text-foreground shadow-card"
          />
        </div>
      </header>

      <section className="space-y-4 p-4 lg:px-10 lg:py-8 xl:px-14">
        <h2 className="font-display text-lg font-semibold lg:text-2xl">
          {debounced ? `${states.length} result${states.length === 1 ? "" : "s"}` : "Explore by state"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))
          : states.map((state) => (
              <Link
                key={state.id}
                to="/state/$slug"
                params={{ slug: state.slug }}
                className="tap block animate-rise overflow-hidden rounded-xl bg-card shadow-card"
              >
                 <div className="relative h-40 lg:h-52">
                  <img
                    src={state.heroImage}
                    alt={`${state.name} heritage`}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 font-display text-lg font-bold text-white">
                    {state.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                    {state.description}
                  </p>
                  <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
                </div>
              </Link>
            ))}
        </div>

        {!loading && states.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Nothing matched "{query}". Try another state or art form.
          </p>
        ) : null}
      </section>

      {showTop ? (
        <Button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          size="icon"
          className="tap fixed bottom-24 right-5 z-40 rounded-full bg-ink text-card shadow-float lg:bottom-8 lg:right-8"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      ) : null}
    </AppShell>
  );
}
