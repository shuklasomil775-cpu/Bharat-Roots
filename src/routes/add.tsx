// Add post screen — create (or edit) a heritage story.
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { AppShell, TopBar } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { POST_CATEGORIES, STATE_NAMES } from "@/lib/heritage";
import { addPost, getPosts, updatePost, useSession } from "@/lib/store";
import { errorsFrom, postSchema, fieldError, type FieldErrors } from "@/lib/validators";

export const Route = createFileRoute("/add")({
  validateSearch: (search: Record<string, unknown>) => ({
    edit: typeof search["edit"] === "string" ? (search["edit"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Share your story · Bharat Roots" },
      { name: "description", content: "Post a heritage story with a photo, state and category." },
      { property: "og:title", content: "Share your story · Bharat Roots" },
      { property: "og:description", content: "Post a heritage story with a photo, state and category." },
    ],
  }),
  component: AddPostScreen,
});

function AddPostScreen() {
  const navigate = useNavigate();
  const { user } = useSession();
  const { edit } = useSearch({ from: "/add" });
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [stateName, setStateName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);

  // Prefill when editing one of the user's own posts.
  useEffect(() => {
    if (!edit) return;
    const post = getPosts().find((p) => p.id === edit);
    if (!post) return;
    setTitle(post.title);
    setStateName(post.state);
    setCategory(post.category);
    setDescription(post.description);
    setImage(post.image ?? null);
  }, [edit]);

  const pickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Please choose an image under 3 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.onerror = () => toast.error("Could not read that image");
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = postSchema.safeParse({ title, state: stateName, category, description });
    if (!parsed.success) {
      setErrors(errorsFrom(parsed.error));
      toast.error("Please fill all required fields");
      return;
    }
    setErrors({});
    setBusy(true);
    window.setTimeout(() => {
      try {
        if (edit) {
          updatePost(edit, {
            title: title.trim(),
            state: stateName,
            category,
            description: description.trim(),
            image,
          });
          toast.success("Story updated!");
        } else {
          addPost({
            username: user?.username ?? "guest",
            title: title.trim(),
            state: stateName,
            category,
            description: description.trim(),
            image,
          });
          toast.success("Post published successfully!");
        }
        navigate({ to: "/posts" });
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setBusy(false);
      }
    }, 500);
  };

  return (
    <AppShell>
      <TopBar
        title={edit ? "Edit your story" : "Share your heritage story"}
        subtitle="Tell the community what you saw, tasted or danced"
      />

      <form onSubmit={submit} className="screen-enter grid gap-5 p-4 lg:grid-cols-2 lg:px-10 lg:py-8 xl:px-14">
        <div className="space-y-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="title">Post title</Label>
            <span className="text-xs text-muted-foreground">{title.length}/100</span>
          </div>
          <Input
            id="title"
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sunrise at the Taj Mahal"
            className="bg-card"
          />
          {fieldError(errors, "title") ? <p className="text-xs text-destructive">{fieldError(errors, "title")}</p> : null}
        </div>

        <div className="space-y-2 lg:col-span-2">
          <Label>State</Label>
          <Select value={stateName} onValueChange={setStateName}>
            <SelectTrigger className="bg-card" aria-label="Select state">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {STATE_NAMES.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError(errors, "state") ? <p className="text-xs text-destructive">{fieldError(errors, "state")}</p> : null}
        </div>

        <div className="space-y-2 lg:col-span-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-card" aria-label="Select category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {POST_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError(errors, "category") ? <p className="text-xs text-destructive">{fieldError(errors, "category")}</p> : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description">Description</Label>
            <span className="text-xs text-muted-foreground">{description.length}/500</span>
          </div>
          <Textarea
            id="description"
            value={description}
            maxLength={500}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What made this moment special?"
            className="bg-card"
          />
          {fieldError(errors, "description") ? (
            <p className="text-xs text-destructive">{fieldError(errors, "description")}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label>Photo (optional)</Label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={pickImage}
            className="hidden"
          />
          {image ? (
            <div className="relative overflow-hidden rounded-xl">
              <img src={image} alt="Selected preview" className="h-48 w-full object-cover" />
              <button
                type="button"
                onClick={() => setImage(null)}
                aria-label="Remove image"
                className="tap absolute right-2 top-2 rounded-full bg-foreground/70 p-1.5 text-card"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="tap flex h-28 w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border bg-card text-muted-foreground"
            >
              <ImagePlus className="h-6 w-6" />
              <span className="text-sm">Add a photo</span>
            </button>
          )}
        </div>

        <Button type="submit" size="lg" disabled={busy} className="tap w-full rounded-lg lg:col-span-2 lg:max-w-sm">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {edit ? "Save changes" : "Post story"}
        </Button>
      </form>
    </AppShell>
  );
}
