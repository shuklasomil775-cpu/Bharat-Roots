// Login screen with local credential check.
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/store";
import { errorsFrom, loginSchema, fieldError, type FieldErrors } from "@/lib/validators";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in · Bharat Roots" },
      { name: "description", content: "Log in to explore India's heritage and share your stories." },
      { property: "og:title", content: "Log in · Bharat Roots" },
      { property: "og:description", content: "Log in to explore India's heritage and share your stories." },
    ],
  }),
  component: LoginScreen,
});

function LoginScreen() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ identifier, password });
    if (!parsed.success) {
      setErrors(errorsFrom(parsed.error));
      return;
    }
    setErrors({});
    setBusy(true);
    window.setTimeout(() => {
      const res = login(identifier, password);
      setBusy(false);
      if (!res.ok) {
        setErrors({ form: res.error ?? "Invalid credentials" });
        toast.error(res.error ?? "Invalid credentials");
        return;
      }
      toast.success("Welcome back!");
      navigate({ to: "/home" });
    }, 400);
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[520px] bg-background">
      <div className="bg-gradient-to-br from-primary to-[oklch(0.62_0.17_25)] px-6 pb-10 pt-14 text-primary-foreground">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-gold-foreground">
          <span className="font-display text-2xl font-bold">भा</span>
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-primary-foreground/85">
          Log in to continue exploring Bharat Roots
        </p>
      </div>

      <form onSubmit={submit} className="screen-enter space-y-5 p-5">
        <div className="space-y-2">
          <Label htmlFor="identifier">Email or username</Label>
          <Input
            id="identifier"
            value={identifier}
            autoComplete="username"
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="you@example.com"
          />
          {fieldError(errors, "identifier") ? (
            <p className="text-xs text-destructive">{fieldError(errors, "identifier")}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {fieldError(errors, "password") ? <p className="text-xs text-destructive">{fieldError(errors, "password")}</p> : null}
        </div>

        {fieldError(errors, "form") ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {fieldError(errors, "form")}
          </p>
        ) : null}

        <Button type="submit" size="lg" disabled={busy} className="tap w-full rounded-lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Log in
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
