"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site.config";
import logoImage from "@/assets/images/logo.png";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Metodologia", href: "/metodologia" },
  { name: "Valores", href: "/valores" },
  { name: "Talks", href: "/talks" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-surface-base/75 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="app-container" aria-label="Primary">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src={logoImage}
              alt={`${siteConfig.name} logo`}
              priority
              className="h-9 w-auto md:h-10"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                  item.href === "/talks"
                    ? "font-semibold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.22)]"
                    : pathname === item.href
                      ? "text-ainure-300"
                      : "text-text-muted hover:text-text-primary",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="rounded-full border border-white/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-primary transition-all hover:border-ainure-300/60 hover:text-ainure-200"
            >
              Agendar Reunion
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-text-primary md:hidden"
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="mb-4 space-y-1 rounded-2xl border border-white/10 bg-surface-elevated/95 p-3 backdrop-blur-xl md:hidden">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] transition-colors",
                  item.href === "/talks"
                    ? "font-semibold text-white"
                    : pathname === item.href
                      ? "bg-white/10 text-ainure-300"
                      : "text-text-secondary hover:bg-white/5 hover:text-text-primary",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="mt-2 block rounded-lg border border-white/15 px-3 py-2 text-center font-mono text-xs uppercase tracking-[0.16em] text-text-primary"
            >
              Agendar Reunion
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
