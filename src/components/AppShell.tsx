// Responsive app shell: desktop navigation rail and mobile bottom navigation.
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, LayoutList, Plus, User } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useSession } from "@/lib/store";

const TABS = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/posts", label: "Posts", icon: LayoutList },
  { to: "/add", label: "Add", icon: Plus, fab: true },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({
  children,
  requireAuth = true,
}: {
  children: ReactNode;
  requireAuth?: boolean;
}) {
  const navigate = useNavigate();
  const { ready, user } = useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (requireAuth && ready && !user) navigate({ to: "/login" });
  }, [requireAuth, ready, user, navigate]);

  return (
    <div className="min-h-screen w-full bg-background lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <Link to="/home" className="border-b border-sidebar-border px-8 py-9">
          <span className="block font-display text-3xl font-bold leading-none text-gold">Bharat</span>
          <span className="block font-display text-3xl font-bold leading-none text-gold">Bolo</span>
          <span className="mt-3 block text-xs text-sidebar-foreground/60">India's living heritage</span>
        </Link>

        <nav className="flex-1 px-4 py-8" aria-label="Main navigation">
          <ul className="space-y-2">
            {TABS.map(({ to, label, icon: Icon }) => {
              const active = pathname === to || (to === "/home" && pathname.startsWith("/state/"));
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={cn(
                      "flex h-12 items-center gap-3 rounded-md px-4 text-sm font-medium transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{label === "Add" ? "Share story" : label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-5">
          <div className="flex min-w-0 items-center gap-3">
            <Initials name={user?.username ?? "Guest"} size={38} />
            <div className="min-w-0">
              <p className="truncate text-xs text-sidebar-foreground/55">Explorer</p>
              <p className="truncate font-display text-sm font-semibold">{user?.username ?? "Guest"}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 pb-24 lg:pb-0">{children}</main>

      <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <ul className="flex items-stretch justify-between">
          {TABS.map(({ to, label, icon: Icon, ...rest }) => {
            const active = pathname === to;
            const fab = "fab" in rest && rest.fab;
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  aria-label={label}
                  className="tap flex flex-col items-center gap-1 py-2.5"
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                      fab
                        ? "bg-primary text-primary-foreground shadow-float"
                        : active
                          ? "bg-accent text-primary"
                          : "text-muted-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-medium",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/** Orange gradient app bar used at the top of each screen. */
export function TopBar({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <header className="bg-primary px-4 pb-5 pt-6 text-primary-foreground lg:border-b lg:border-border lg:bg-background lg:px-10 lg:pb-7 lg:pt-9 lg:text-foreground xl:px-14">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold leading-tight lg:text-4xl">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-primary-foreground/85 lg:mt-2 lg:text-base lg:text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        {right}
      </div>
    </header>
  );
}

/** Colored circle with the user's initials. */
export function Initials({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name.slice(0, 2).toUpperCase();
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `oklch(0.62 0.15 ${hue})`,
      }}
    >
      {initials}
    </span>
  );
}
