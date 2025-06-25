import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Smartphone, Database, Cloud, Cog, Users } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas y responsivas con las últimas tecnologías",
    features: ["React/Next.js", "Node.js", "APIs REST", "Progressive Web Apps"],
  },
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description: "Apps nativas e híbridas para iOS y Android",
    features: ["React Native", "Flutter", "Ionic", "Desarrollo nativo"],
  },
  {
    icon: Database,
    title: "Sistemas de Gestión",
    description: "ERP, CRM y sistemas personalizados para tu empresa",
    features: ["Gestión de inventario", "CRM personalizado", "Automatización", "Reportes"],
  },
  {
    icon: Cloud,
    title: "Soluciones Cloud",
    description: "Migración y desarrollo en la nube",
    features: ["AWS", "Azure", "Google Cloud", "Microservicios"],
  },
  {
    icon: Cog,
    title: "Integración de Sistemas",
    description: "Conectamos tus herramientas existentes",
    features: ["APIs", "Webhooks", "Sincronización", "Middleware"],
  },
  {
    icon: Users,
    title: "Consultoría Técnica",
    description: "Asesoramiento estratégico en tecnología",
    features: ["Arquitectura", "Code review", "Optimización", "Mentoring"],
  },
]

export default function ServiciosPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Nuestros Servicios</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una gama completa de servicios de desarrollo de software para cubrir todas las necesidades
            tecnológicas de tu empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <service.icon className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-600 mb-8">Cada proyecto es único. Hablemos sobre tus necesidades específicas</p>
          <Button asChild size="lg">
            <Link href="/contacto">Consulta personalizada</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
