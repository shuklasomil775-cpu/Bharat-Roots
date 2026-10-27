// Community posts feed with search, sort, state filter and infinite scroll.
import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell, TopBar } from "@/components/AppShell";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { STATE_NAMES } from "@/lib/heritage";
import { usePosts } from "@/lib/store";

const PAGE = 5;

export const Route = createFileRoute("/posts")({
  head: () => ({
    meta: [
      { title: "Community stories · Bharat Roots" },
      { name: "description", content: "Heritage stories shared by the Bharat Roots community." },
      { property: "og:title", content: "Community stories · Bharat Roots" },
      { property: "og:description", content: "Heritage stories shared by the Bharat Roots community." },
    ],
  }),
  component: PostsScreen,
});

function PostsScreen() {
  const { posts, likes, loading, refresh } = usePosts();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sort, setSort] = useState("recent");
  const [stateFilter, setStateFilter] = useState("all");
  const [visible, setVisible] = useState(PAGE);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim().toLowerCase()), 250);
    return () => window.clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    let list = posts;
    if (stateFilter !== "all") list = list.filter((p) => p.state === stateFilter);
    if (debounced)
      list = list.filter((p) =>
        `${p.title} ${p.description} ${p.username} ${p.category}`.toLowerCase().includes(debounced),
      );
    return [...list].sort((a, b) =>
      sort === "popular" ? b.likes - a.likes : b.timestamp - a.timestamp,
    );
  }, [posts, stateFilter, debounced, sort]);

  // Infinite scroll: reveal more as the user nears the bottom.
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        setVisible((v) => (v < filtered.length ? v + PAGE : v));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [filtered.length]);

  const handleRefresh = () => {
    setRefreshing(true);
    refresh();
    window.setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <AppShell>
      <TopBar
        title="Community stories"
        subtitle={`${posts.length} heritage moments shared`}
        right={
          <Button
            type="button"
            onClick={handleRefresh}
            aria-label="Refresh posts"
            variant="ghost"
            size="icon"
            className="tap bg-primary-foreground/15 lg:bg-muted"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        }
      />

      <div className="space-y-4 p-4 lg:px-10 lg:py-8 xl:px-14">
        <div className="grid gap-3 lg:grid-cols-[minmax(280px,1fr)_220px_220px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories..."
            aria-label="Search stories"
            className="h-11 rounded-xl bg-card pl-9 shadow-card"
          />
        </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-10 flex-1 rounded-xl bg-card" aria-label="Sort posts">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="popular">Most popular</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="h-10 flex-1 rounded-xl bg-card" aria-label="Filter by state">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All states</SelectItem>
              {STATE_NAMES.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
        {loading || refreshing ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No stories yet. Tap Add to share the first one.
          </p>
        ) : (
          filtered
            .slice(0, visible)
            .map((post) => (
              <PostCard key={post.id} post={post} liked={likes.includes(post.id)} />
            ))
        )}
        </div>

        {!loading && visible < filtered.length ? (
          <p className="py-4 text-center text-xs text-muted-foreground">Loading more stories…</p>
        ) : null}
      </div>
    </AppShell>
  );
}
