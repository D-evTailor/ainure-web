import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Repeat, Target } from "lucide-react"

const methodology = [
  {
    step: "01",
    title: "Análisis y Planificación",
    description: "Entendemos tu negocio y definimos objetivos claros",
    details: [
      "Reuniones de descubrimiento",
      "Análisis de requisitos",
      "Definición de alcance",
      "Planificación de sprints",
    ],
  },
  {
    step: "02",
    title: "Diseño y Prototipado",
    description: "Creamos la arquitectura y diseño de la solución",
    details: ["Wireframes y mockups", "Arquitectura del sistema", "Diseño de base de datos", "Prototipo funcional"],
  },
  {
    step: "03",
    title: "Desarrollo Iterativo",
    description: "Construimos la solución en sprints cortos",
    details: ["Desarrollo en sprints de 2 semanas", "Revisiones constantes", "Testing continuo", "Feedback temprano"],
  },
  {
    step: "04",
    title: "Testing y Calidad",
    description: "Garantizamos la calidad en cada entrega",
    details: ["Testing automatizado", "Pruebas de usuario", "Code review", "Optimización de rendimiento"],
  },
  {
    step: "05",
    title: "Despliegue y Soporte",
    description: "Lanzamos y mantenemos tu solución",
    details: ["Despliegue en producción", "Monitoreo continuo", "Soporte técnico", "Actualizaciones regulares"],
  },
]

const principles = [
  {
    icon: Users,
    title: "Colaboración Constante",
    description: "Trabajamos codo a codo contigo durante todo el proceso",
  },
  {
    icon: Repeat,
    title: "Iteración Rápida",
    description: "Entregas frecuentes para validar y ajustar el rumbo",
  },
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description: "Cada decisión está orientada a cumplir tus objetivos de negocio",
  },
  {
    icon: CheckCircle,
    title: "Calidad Garantizada",
    description: "Testing exhaustivo y mejores prácticas en cada línea de código",
  },
]

export default function MetodologiaPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Nuestra Metodología</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Seguimos un proceso probado que garantiza entregas exitosas y mantiene a nuestros clientes involucrados en
            cada paso
          </p>
        </div>

        {/* Proceso */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nuestro Proceso</h2>
          <div className="space-y-8">
            {methodology.map((phase, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {phase.step}
                  </div>
                </div>
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>{phase.title}</CardTitle>
                    <CardDescription>{phase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Principios */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nuestros Principios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <principle.icon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{principle.title}</CardTitle>
                  <CardDescription>{principle.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
