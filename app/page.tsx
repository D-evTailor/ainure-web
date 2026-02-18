"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, Gauge } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import type { ReactNode } from "react";
import backgroundImage from "@/assets/images/fondo.png";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="bg-surface-base text-text-primary">
      <section className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
        <Image
          src={backgroundImage}
          alt="Ainure background"
          fill
          priority
          className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-35"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(166,199,156,0.2),transparent_30%),radial-gradient(circle_at_88%_72%,rgba(132,178,123,0.12),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-90" />

        <motion.div
          className="app-container relative grid items-end gap-14 lg:grid-cols-[1.05fr_0.95fr]"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.11 } } }}
        >
          <div className="space-y-8">
            <motion.p
              variants={reveal}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted"
            >
              Awwwards-ready Digital Craftsmanship
            </motion.p>

            <motion.h1
              variants={reveal}
              className="max-w-4xl font-display text-[2.4rem] leading-[0.92] text-text-primary sm:text-6xl lg:text-7xl"
            >
              AINURE diseña software con precisión editorial y alma de taller.
            </motion.h1>

            <motion.p variants={reveal} className="max-w-xl text-base text-text-secondary md:text-lg">
              Estrategia, producto y ejecución en una sola mesa de trabajo. Menos ruido, más impacto.
            </motion.p>

            <motion.div variants={reveal} className="flex flex-wrap items-center gap-4">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 rounded-lg border border-ainure-300/45 bg-ainure-500/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-text-primary transition-all hover:border-ainure-300 hover:bg-ainure-500/30"
              >
                Solicitar Diagnóstico
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center rounded-lg border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-text-secondary transition-colors hover:text-text-primary"
              >
                Ver Capacidades
              </Link>
            </motion.div>
          </div>

          <motion.div variants={reveal} className="relative min-h-[320px]">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full border border-white/15 bg-gradient-to-br from-white/10 to-transparent blur-[1px] md:h-56 md:w-56" />
            <div className="absolute bottom-2 right-14 h-56 w-56 rounded-full border border-ainure-300/30 bg-gradient-to-tr from-ainure-500/35 to-transparent md:h-72 md:w-72" />
            <div className="absolute inset-x-0 bottom-0 border-t border-dashed border-white/15 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Crafted in {new Date().getFullYear()} · {siteConfig.domain}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="app-container">
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<Layers className="h-5 w-5" />}
              title="Arquitectura sobria"
              description="Sistemas claros, mantenibles y listos para escalar sin deuda innecesaria."
            />
            <FeatureCard
              icon={<Gauge className="h-5 w-5" />}
              title="Entrega con ritmo"
              description="Iteraciones cortas con foco en valor real y checkpoints de calidad."
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Acabado premium"
              description="Interfaces con criterio visual, micro-interacciones y continuidad de marca."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-surface-elevated/60 p-6 backdrop-blur-sm transition-colors hover:border-ainure-300/40">
      <div className="flex items-center gap-3 text-ainure-300">
        {icon}
        <h3 className="font-display text-2xl text-text-primary">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{description}</p>
    </article>
  );
}
