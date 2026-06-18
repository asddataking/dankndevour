"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE_IMAGES } from "@/data/brand";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json()) as { message?: string; error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "You're on the list!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <section
      id="join"
      className="border-t border-white/5 bg-gradient-to-r from-emerald-950/20 via-black to-emerald-950/20"
    >
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:py-16">
        <div className="relative hidden min-h-[320px] overflow-hidden rounded-2xl lg:block">
          <Image
            src={SITE_IMAGES.newsletter}
            alt="Dank N Devour creator"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 0vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
        </div>

        <div>
          <h2 className="font-display text-3xl uppercase text-white md:text-4xl lg:text-5xl">
            Join The Dank N Devour Crew!
          </h2>
          <p className="mt-3 text-foreground-muted">
            Get cannabis reviews, grow updates, merch drops, BoofMap updates,
            and Michigan adventure content.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 rounded-lg border border-white/10 bg-black px-4 py-3.5 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none disabled:opacity-60"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary shrink-0 disabled:opacity-60"
            >
              {status === "loading" ? "Joining..." : "Let's Go!"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-sm ${
                status === "success" ? "text-accent" : "text-rose-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
