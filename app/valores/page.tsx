import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Lightbulb, Shield, Handshake, Zap, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Pasión Artesanal",
    description: "Cada línea de código es hecha a medida, con dedicación y detalle.",
  },
  {
    icon: Lightbulb,
    title: "Soluciones Únicas",
    description: "Diseñamos software original, evitando atajos y plantillas genéricas.",
  },
  {
    icon: Shield,
    title: "Transparencia Sincera",
    description: "Comunicación clara y honesta en cada etapa del proceso.",
  },
  {
    icon: Handshake,
    title: "Compromiso a Medida",
    description: "Tu éxito es nuestro ajuste perfecto; trabajamos como un solo equipo.",
  },
  {
    icon: Zap,
    title: "Excelencia Técnica",
    description: "Arquitecturas sólidas y calidad de sastre en cada entrega.",
  },
  {
    icon: Users,
    title: "Colaboración Creativa",
    description: "El mejor resultado surge del trabajo conjunto y la escucha activa.",
  },
];

export default function ValoresPage() {
  return (
    <div className="app-page">
      <div className="app-container">
        <div className="app-page-header">
          <h1 className="app-page-title">
            Nuestros <span className="text-ainure-300">Valores</span>
          </h1>
          <p className="app-page-subtitle">
            Principios que nos definen como sastres tecnológicos y guían cada proyecto a medida
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <Card key={index} className="h-full border-white/10 bg-surface-elevated/70 backdrop-blur-sm">
              <CardHeader>
                <value.icon className="mb-4 h-12 w-12 text-ainure-300" />
                <CardTitle className="text-xl text-text-primary">{value.title}</CardTitle>
                <CardDescription className="text-base text-text-secondary">
                  {value.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-ainure-500/30 bg-gradient-to-br from-surface-elevated/90 to-ainure-900/25 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-ainure-300">Nuestra Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-text-secondary">
                Empoderar empresas con soluciones tecnológicas hechas a medida, robustas y pensadas para transformar su negocio. Somos sastres digitales: cada proyecto es único.
              </p>
            </CardContent>
          </Card>

          <Card className="border-ainure-500/30 bg-gradient-to-br from-surface-elevated/90 to-ainure-800/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-ainure-300">Nuestra Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-text-secondary">
                Ser reconocidos como el taller de software de referencia para empresas que buscan calidad, confianza y resultados sobresalientes. Innovamos con precisión y pasión artesanal.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
