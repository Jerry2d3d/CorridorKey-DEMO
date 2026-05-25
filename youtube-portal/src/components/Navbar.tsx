"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/site.config";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-gold text-xl leading-none">◈</span>
          <span className="font-display text-base tracking-[0.18em] text-gold-bright sm:text-lg">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-parchment"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright sm:inline-block"
          >
            Watch on YouTube
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-parchment md:hidden"
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-ink-soft px-5 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm text-muted transition-colors hover:bg-panel hover:text-parchment"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block rounded-full bg-gold px-4 py-2 text-center text-sm font-semibold text-ink"
              >
                Watch on YouTube
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
