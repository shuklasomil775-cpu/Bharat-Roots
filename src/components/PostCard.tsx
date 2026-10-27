// Community post card with like animation.
import { Heart, MapPin, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { Initials } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { timeAgo, toggleLike, type Post } from "@/lib/store";

export function PostCard({
  post,
  liked,
  owned = false,
  onEdit,
  onDelete,
}: {
  post: Post;
  liked: boolean;
  owned?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}) {
  const [pop, setPop] = useState(false);

  const handleLike = () => {
    toggleLike(post.id);
    setPop(true);
    window.setTimeout(() => setPop(false), 320);
  };

  return (
    <article className="animate-rise overflow-hidden rounded-xl bg-card shadow-card">
      <div className="flex items-center gap-3 p-4 pb-3">
        <Initials name={post.username} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-semibold">{post.username}</p>
          <p className="text-xs text-muted-foreground">{timeAgo(post.timestamp)}</p>
        </div>
        <Badge className="max-w-[45%] bg-teal text-teal-foreground hover:bg-teal">
          <MapPin className="mr-1 h-3 w-3" />
          <span className="truncate">{post.state}</span>
        </Badge>
      </div>

      <div className="px-4">
        <h3 className="font-display text-base font-semibold">{post.title}</h3>
        <p className="mt-1 line-clamp-4 text-sm text-muted-foreground">{post.description}</p>
      </div>

      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="mt-3 h-52 w-full object-cover"
        />
      ) : null}

      <div className="flex items-center gap-2 p-4 pt-3">
        <button
          type="button"
          onClick={handleLike}
          aria-pressed={liked}
          aria-label={liked ? "Unlike post" : "Like post"}
          className="tap flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              liked ? "fill-primary text-primary" : "text-muted-foreground",
              pop && "animate-pop",
            )}
          />
          <span className={liked ? "text-primary" : "text-muted-foreground"}>{post.likes}</span>
        </button>

        <Badge variant="outline" className="border-border text-muted-foreground">
          {post.category}
        </Badge>

        <div className="ml-auto flex gap-1">
          {owned && onEdit ? (
            <Button variant="ghost" size="icon" aria-label="Edit post" onClick={() => onEdit(post)}>
              <Pencil className="h-4 w-4" />
            </Button>
          ) : null}
          {owned && onDelete ? (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Delete post"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(post)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
