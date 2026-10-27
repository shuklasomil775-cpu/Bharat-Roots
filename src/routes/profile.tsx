// Profile screen: user details, stats, own posts and settings.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell, Initials, TopBar } from "@/components/AppShell";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { deletePost, logout, usePosts, useSession, type Post } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile · Bharat Roots" },
      { name: "description", content: "Your Bharat Roots posts, likes and settings." },
      { property: "og:title", content: "Your profile · Bharat Roots" },
      { property: "og:description", content: "Your Bharat Roots posts, likes and settings." },
    ],
  }),
  component: ProfileScreen,
});

function ProfileScreen() {
  const navigate = useNavigate();
  const { user } = useSession();
  const { posts, likes } = usePosts();
  const [dark, setDark] = useState(false);
  const [notify, setNotify] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const myPosts = posts.filter((p) => p.username === user?.username);

  const handleDelete = (post: Post) => {
    deletePost(post.id);
    toast.success("Story deleted");
  };

  const handleEdit = (post: Post) => {
    navigate({ to: "/add", search: { edit: post.id } });
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate({ to: "/login" });
  };

  return (
    <AppShell>
      <TopBar title="Profile" />

      <div className="grid gap-5 p-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-10 lg:py-8 xl:px-14">
        <section className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
          <Initials name={user?.username ?? "Guest"} size={60} />
          <div className="min-w-0">
            <h2 className="truncate font-display text-lg font-semibold">
              {user?.username ?? "Guest"}
            </h2>
            <p className="truncate text-sm text-muted-foreground">{user?.email ?? ""}</p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 lg:col-start-2 lg:row-start-1">
          <div className="rounded-xl bg-card p-4 text-center shadow-card">
            <p className="font-display text-2xl font-bold text-primary">{myPosts.length}</p>
            <p className="text-xs text-muted-foreground">My posts</p>
          </div>
          <div className="rounded-xl bg-card p-4 text-center shadow-card">
            <p className="font-display text-2xl font-bold text-teal">{likes.length}</p>
            <p className="text-xs text-muted-foreground">My likes</p>
          </div>
        </section>

        <section className="space-y-3 lg:row-span-3">
          <h3 className="font-display text-lg font-semibold">My posts</h3>
          {myPosts.length === 0 ? (
            <p className="rounded-xl bg-card p-6 text-center text-sm text-muted-foreground shadow-card">
              You haven't shared a story yet.
            </p>
          ) : (
            myPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                liked={likes.includes(post.id)}
                owned
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </section>

        <section className="divide-y divide-border overflow-hidden rounded-xl bg-card shadow-card lg:col-start-2">
          <div className="flex items-center gap-3 p-4">
            <Moon className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">Dark mode</span>
            <Switch checked={dark} onCheckedChange={setDark} aria-label="Dark mode" />
          </div>
          <div className="flex items-center gap-3 p-4">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">Notifications</span>
            <Switch checked={notify} onCheckedChange={setNotify} aria-label="Notifications" />
          </div>
        </section>

        <Button
          variant="destructive"
          size="lg"
          onClick={handleLogout}
          className="tap w-full rounded-lg lg:col-start-2"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </AppShell>
  );
}
