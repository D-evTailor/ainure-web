import Link from "next/link";

export default function ChatbotPage() {
  return (
    <section className="app-page">
      <div className="app-container">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-surface-elevated/70 p-8 text-center backdrop-blur-sm">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
            Modulo Temporalmente Inactivo
          </p>
          <h1 className="mt-4 font-display text-4xl text-text-primary">Chatbot en mantenimiento</h1>
          <p className="mt-3 text-text-secondary">
            Estamos ajustando esta seccion para una nueva experiencia. Si quieres avanzar con tu
            proyecto, escríbenos y te respondemos directamente.
          </p>
          <div className="mt-8">
            <Link
              href="/contacto"
              className="inline-flex rounded-full border border-ainure-300/50 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-text-primary transition-colors hover:border-ainure-300 hover:text-ainure-200"
            >
              Ir a contacto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

