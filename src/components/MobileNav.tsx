import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  links: NavLink[];
  knowTo: string;
  knowLabel: string;
  langTo: string;
  langLabel: string;
  ctaHref: string;
  ctaLabel: string;
  activeKnow?: boolean;
}

export function MobileNav({
  links,
  knowTo,
  knowLabel,
  langTo,
  langLabel,
  ctaHref,
  ctaLabel,
  activeKnow = false,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop CTA */}
      <a
        href={ctaHref}
        className="hidden rounded-md border border-primary/70 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:block"
      >
        {ctaLabel}
      </a>

      {/* Hamburger — mobile only */}
      <button
        className="flex h-9 w-9 items-center justify-center rounded-md text-foreground/80 transition-colors hover:text-primary md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-6 py-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-2 text-sm text-foreground/80 transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Link
              to={knowTo as any}
              className={`py-2 text-sm transition-colors hover:text-primary ${activeKnow ? "text-primary" : "text-foreground/80"}`}
              onClick={() => setOpen(false)}
            >
              {knowLabel}
            </Link>
            <Link
              to={langTo as any}
              className="py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {langLabel}
            </Link>
            <div className="mt-3 border-t border-border pt-4">
              <a
                href={ctaHref}
                className="block rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
