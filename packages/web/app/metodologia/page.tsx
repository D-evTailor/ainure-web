import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Users, Repeat, Target, Zap, Shield } from "lucide-react";

const methodology = [
  {
    step: "01",
    title: "Análisis Profundo",
    description: "Estudiamos tu negocio como sastres miden un traje: cada detalle cuenta",
    icon: Target,
  },
  {
    step: "02",
    title: "Diseño a Medida",
    description: "Arquitectura y diseño específicos para tus necesidades, sin plantillas",
    icon: Shield,
  },
  {
    step: "03",
    title: "Confección Iterativa",
    description: "Desarrollo paso a paso con ajustes constantes hasta el ajuste perfecto",
    icon: Repeat,
  },
  {
    step: "04",
    title: "Entrega Impecable",
    description: "Testing exhaustivo y despliegue con la calidad de un sastre maestro",
    icon: CheckCircle,
  },
];

const principles = [
  {
    icon: Target,
    title: "Precisión Técnica",
    description: "Soluciones robustas y específicas, pensadas para cada cliente",
  },
  {
    icon: Shield,
    title: "Código Artesanal",
    description: "No usamos atajos visuales ni plantillas genéricas",
  },
  {
    icon: Users,
    title: "Trabajo Colaborativo",
    description: "Te mantenemos involucrado en cada paso del proceso creativo",
  },
  {
    icon: Zap,
    title: "Agilidad Inteligente",
    description: "Entregas rápidas sin comprometer la calidad del resultado final",
  },
];

export default function MetodologiaPage() {
  return (
    <div className="app-page">
      <div className="app-container">
        <div className="app-page-header">
          <h1 className="app-page-title">
            Como <span className="text-brand-300">Sastres Tecnológicos</span>
          </h1>
          <p className="app-page-subtitle">
            Nuestra metodología en 4 pasos garantiza soluciones a medida, robustas y bien pensadas para cada cliente
          </p>
        </div>

        {/* Proceso */}
        <div className="mb-14 md:mb-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl md:mb-12">
            Nuestro <span className="text-brand-300">Proceso en 4 Pasos</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {methodology.map((phase, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-brand-400 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {phase.step}
                  </div>
                  <phase.icon className="h-8 w-8 text-brand-300 mx-auto mb-4" />
                  <CardTitle className="text-white">{phase.title}</CardTitle>
                  <CardDescription className="text-gray-300">{phase.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Principios */}
        <div>
          <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl md:mb-12">
            Filosofía <span className="text-brand-300">Selference</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm text-center">
                <CardHeader>
                  <principle.icon className="h-10 w-10 text-brand-300 mx-auto mb-4" />
                  <CardTitle className="text-white text-lg">{principle.title}</CardTitle>
                  <CardDescription className="text-gray-300">{principle.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
