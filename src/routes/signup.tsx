// Sign up screen — creates a local account.
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/store";
import { errorsFrom, signUpSchema, fieldError, type FieldErrors } from "@/lib/validators";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account · Bharat Roots" },
      { name: "description", content: "Create a Bharat Roots account to share your heritage stories." },
      { property: "og:title", content: "Create account · Bharat Roots" },
      { property: "og:description", content: "Create a Bharat Roots account to share your heritage stories." },
    ],
  }),
  component: SignUpScreen,
});

function SignUpScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signUpSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(errorsFrom(parsed.error));
      return;
    }
    setErrors({});
    setBusy(true);
    window.setTimeout(() => {
      const res = signUp({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      setBusy(false);
      if (!res.ok) {
        setErrors({ form: res.error ?? "Could not create account" });
        toast.error(res.error ?? "Could not create account");
        return;
      }
      toast.success("Account created! Please log in.");
      navigate({ to: "/login" });
    }, 400);
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[520px] bg-background">
      <div className="bg-gradient-to-br from-teal to-[oklch(0.6_0.1_200)] px-6 pb-10 pt-14 text-teal-foreground">
        <h1 className="font-display text-3xl font-bold">Join Bharat Roots</h1>
        <p className="mt-1 text-sm text-teal-foreground/85">
          Share the heritage you grew up with
        </p>
      </div>

      <form onSubmit={submit} className="screen-enter space-y-5 p-5">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={form.username} onChange={set("username")} placeholder="ananya_r" />
          {fieldError(errors, "username") ? <p className="text-xs text-destructive">{fieldError(errors, "username")}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
          {fieldError(errors, "email") ? <p className="text-xs text-destructive">{fieldError(errors, "email")}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              value={form.password}
              onChange={set("password")}
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

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type={show ? "text" : "password"}
            value={form.confirm}
            onChange={set("confirm")}
            placeholder="Repeat your password"
          />
          {fieldError(errors, "confirm") ? <p className="text-xs text-destructive">{fieldError(errors, "confirm")}</p> : null}
        </div>

        {fieldError(errors, "form") ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{fieldError(errors, "form")}</p>
        ) : null}

        <Button type="submit" size="lg" disabled={busy} className="tap w-full rounded-lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Create account
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
