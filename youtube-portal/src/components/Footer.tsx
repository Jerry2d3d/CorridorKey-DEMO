import Link from "next/link";
import { siteConfig } from "@/site.config";

const socialLinks = [
  { label: "YouTube", href: siteConfig.socials.youtube },
  { label: "X", href: siteConfig.socials.x },
  { label: "Instagram", href: siteConfig.socials.instagram },
  { label: "TikTok", href: siteConfig.socials.tiktok },
  {
    label: "Email",
    href: siteConfig.socials.email ? `mailto:${siteConfig.socials.email}` : "",
  },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="text-gold text-lg">◈</span>
              <span className="font-display text-base tracking-[0.18em] text-gold-bright">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-parchment">
                Explore
              </h3>
              <ul className="mt-3 space-y-2">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-parchment"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {socialLinks.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-parchment">
                  Follow
                </h3>
                <ul className="mt-3 space-y-2">
                  {socialLinks.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted transition-colors hover:text-parchment"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="rule-gradient mt-10" />
        <p className="mt-6 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Question everything —
          then check the sources.
        </p>
      </div>
    </footer>
  );
}
