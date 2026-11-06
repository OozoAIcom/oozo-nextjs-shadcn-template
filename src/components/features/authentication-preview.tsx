"use client";
import { useId, useRef, useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateEmail } from "@/lib/validation/project";
export function AuthenticationPreview() {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!validateEmail(new FormData(event.currentTarget).get("email"))) {
      setError("Enter a valid email address.");
      input.current?.focus();
      return;
    }
    setError("");
    setMessage(
      "Email format checked locally. Connect an identity provider to enable sign-in. No email was sent.",
    );
  }
  return (
    <Card>
      <CardHeader>
        <KeyRound className="mb-3 size-5" aria-hidden="true" />
        <CardTitle>
          <h3>Start your sign-in flow</h3>
        </CardTitle>
        <CardDescription>
          An authentication UI example. Connect your provider before enabling
          access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={submit} className="space-y-3">
          <Label htmlFor={id}>Email address</Label>
          <Input
            ref={input}
            id={id}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@example.com"
            aria-invalid={!!error}
            aria-describedby={`${id}-help${error ? ` ${id}-error` : ""}`}
          />
          <p id={`${id}-help`} className="text-xs text-muted-foreground">
            Local preview only. No account or session is created.
          </p>
          {error && (
            <p id={`${id}-error`} className="text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" variant="outline">
            Preview sign-in
          </Button>
          <p role="status" className="min-h-10 text-sm text-muted-foreground">
            {message}
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
