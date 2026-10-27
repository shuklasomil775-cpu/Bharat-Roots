// Local-storage backed "backend": users, session and community posts.
import { useCallback, useEffect, useState } from "react";

const USERS_KEY = "bb_users";
const SESSION_KEY = "bb_session";
const POSTS_KEY = "bb_posts";
const LIKES_KEY = "bb_likes";

export type User = {
  username: string;
  email: string;
  password: string;
  createdAt: string;
};

export type Post = {
  id: string;
  username: string;
  title: string;
  description: string;
  state: string;
  category: string;
  image?: string | null;
  likes: number;
  createdAt: string;
  timestamp: number;
};

const isBrowser = () => typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (e) {
    console.error("storage read failed", key, e);
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("bb-store"));
  } catch (e) {
    console.error("storage write failed", key, e);
  }
}

/* ---------------- auth ---------------- */

export const getUsers = () => read<Record<string, User>>(USERS_KEY, {});

export function signUp(input: {
  username: string;
  email: string;
  password: string;
}): { ok: boolean; error?: string } {
  const users = getUsers();
  const key = input.username.toLowerCase();
  if (users[key]) return { ok: false, error: "That username is already taken" };
  if (Object.values(users).some((u) => u.email.toLowerCase() === input.email.toLowerCase()))
    return { ok: false, error: "An account with this email already exists" };
  users[key] = { ...input, createdAt: new Date().toISOString() };
  write(USERS_KEY, users);
  return { ok: true };
}

export function login(identifier: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  const id = identifier.trim().toLowerCase();
  const user =
    users[id] ?? Object.values(users).find((u) => u.email.toLowerCase() === id);
  if (!user || user.password !== password)
    return { ok: false, error: "Invalid credentials" };
  write(SESSION_KEY, user.username);
  return { ok: true };
}

export const logout = () => write(SESSION_KEY, null);

export function getSession(): User | null {
  const username = read<string | null>(SESSION_KEY, null);
  if (!username) return null;
  return getUsers()[username.toLowerCase()] ?? null;
}

/** Reactive session hook — null until hydrated on the client. */
export function useSession() {
  const [state, setState] = useState<{ ready: boolean; user: User | null }>({
    ready: false,
    user: null,
  });
  useEffect(() => {
    const sync = () => setState({ ready: true, user: getSession() });
    sync();
    window.addEventListener("bb-store", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bb-store", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return state;
}

/* ---------------- posts ---------------- */

const SEED_POSTS: Post[] = [
  {
    id: "seed-1",
    username: "ananya",
    title: "Sunrise at the Taj Mahal",
    description:
      "Reached the east gate at 5:30am. The marble turns pink before it turns white — worth every minute of the queue.",
    state: "Uttar Pradesh",
    category: "Monument",
    image: null,
    likes: 24,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: "seed-2",
    username: "rohit",
    title: "Learning Garba from my grandmother",
    description:
      "Three steps, one clap. She has danced every Navratri for fifty years and still corrects my footwork.",
    state: "Gujarat",
    category: "Folk Art",
    image: null,
    likes: 41,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    timestamp: Date.now() - 1000 * 60 * 60 * 26,
  },
  {
    id: "seed-3",
    username: "meera",
    title: "A proper Onam sadya at home",
    description:
      "Twenty-four items on a banana leaf, served in strict order. The parippu and ghee first course is still my favourite.",
    state: "Kerala",
    category: "Cuisine",
    image: null,
    likes: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    timestamp: Date.now() - 1000 * 60 * 60 * 72,
  },
];

export function getPosts(): Post[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(POSTS_KEY);
  if (raw === null) {
    write(POSTS_KEY, SEED_POSTS);
    return SEED_POSTS;
  }
  return read<Post[]>(POSTS_KEY, []);
}

export function addPost(post: Omit<Post, "id" | "likes" | "createdAt" | "timestamp">) {
  const now = Date.now();
  const next: Post = {
    ...post,
    id: `p-${now}`,
    likes: 0,
    createdAt: new Date(now).toISOString(),
    timestamp: now,
  };
  write(POSTS_KEY, [next, ...getPosts()]);
  return next;
}

export function updatePost(id: string, patch: Partial<Post>) {
  write(POSTS_KEY, getPosts().map((p) => (p.id === id ? { ...p, ...patch } : p)));
}

export function deletePost(id: string) {
  write(POSTS_KEY, getPosts().filter((p) => p.id !== id));
}

export const getLikes = () => read<string[]>(LIKES_KEY, []);

export function toggleLike(id: string) {
  const liked = getLikes();
  const posts = getPosts();
  const has = liked.includes(id);
  write(LIKES_KEY, has ? liked.filter((x) => x !== id) : [...liked, id]);
  write(
    POSTS_KEY,
    posts.map((p) =>
      p.id === id ? { ...p, likes: Math.max(0, p.likes + (has ? -1 : 1)) } : p,
    ),
  );
  return !has;
}

/** Reactive posts + likes. */
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const sync = useCallback(() => {
    setPosts(getPosts());
    setLikes(getLikes());
    setLoading(false);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("bb-store", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bb-store", sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return { posts, likes, loading, refresh: sync };
}

/** "2 hours ago" style formatting. */
export function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} minute${m > 1 ? "s" : ""} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} day${d > 1 ? "s" : ""} ago`;
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
