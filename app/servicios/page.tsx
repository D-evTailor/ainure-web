import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Smartphone, Database, Cloud, Cog, Users } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas y responsivas",
    features: ["React/Next.js", "APIs REST", "PWAs"],
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "Aplicaciones nativas e híbridas",
    features: ["React Native", "Flutter", "Desarrollo nativo"],
  },
  {
    icon: Database,
    title: "Sistemas de Gestión",
    description: "ERP, CRM y soluciones personalizadas",
    features: ["Gestión de inventario", "CRM", "Automatización"],
  },
  {
    icon: Cloud,
    title: "Soluciones Cloud",
    description: "Migración y desarrollo en la nube",
    features: ["AWS", "Azure", "Microservicios"],
  },
  {
    icon: Cog,
    title: "Integración de Sistemas",
    description: "Conectamos tus herramientas existentes",
    features: ["APIs", "Webhooks", "Middleware"],
  },
  {
    icon: Users,
    title: "Consultoría Técnica",
    description: "Asesoramiento estratégico en tecnología",
    features: ["Arquitectura", "Code review", "Optimización"],
  },
];

export default function ServiciosPage() {
  return (
    <div className="app-page">
      <div className="app-container">
        <div className="app-page-header">
          <h1 className="app-page-title">
            Nuestros <span className="text-ainure-300">Servicios</span>
          </h1>
          <p className="app-page-subtitle">
            Soluciones tecnológicas completas para impulsar tu negocio
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="h-full border-white/10 bg-surface-elevated/70 backdrop-blur-sm">
              <CardHeader>
                <service.icon className="mb-4 h-10 w-10 text-ainure-300" />
                <CardTitle className="text-text-primary">{service.title}</CardTitle>
                <CardDescription className="text-text-secondary">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-text-muted">
                      <span className="mr-3 h-2 w-2 rounded-full bg-ainure-300"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="mb-4 font-display text-2xl text-text-primary md:text-3xl">
            ¿Proyecto específico en mente?
          </h2>
          <p className="mb-8 text-text-secondary">
            Cada solución es única. Hablemos sobre tus necesidades
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-lg border border-ainure-300/50 bg-ainure-500/20 px-8 py-3 font-mono text-xs uppercase tracking-[0.16em] text-text-primary transition-all hover:bg-ainure-500/30"
          >
            Consulta personalizada →
          </Link>
        </div>
      </div>
    </div>
  );
}
