import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Lightbulb, Shield, Handshake, Zap, Users } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Pasión por la Tecnología",
    description: "Amamos lo que hacemos y se nota en cada proyecto que entregamos",
    details:
      "Nos mantenemos al día con las últimas tecnologías y mejores prácticas para ofrecer soluciones innovadoras y eficientes.",
  },
  {
    icon: Lightbulb,
    title: "Innovación Constante",
    description: "Buscamos siempre la mejor solución, no la más fácil",
    details:
      "Exploramos nuevas tecnologías y enfoques para resolver problemas complejos de manera creativa y eficiente.",
  },
  {
    icon: Shield,
    title: "Transparencia Total",
    description: "Comunicación clara y honesta en cada etapa del proyecto",
    details:
      "Mantenemos a nuestros clientes informados sobre el progreso, desafíos y decisiones técnicas en todo momento.",
  },
  {
    icon: Handshake,
    title: "Compromiso con el Cliente",
    description: "Tu éxito es nuestro éxito, trabajamos como un equipo",
    details: "Nos involucramos profundamente en entender tu negocio para crear soluciones que realmente aporten valor.",
  },
  {
    icon: Zap,
    title: "Excelencia Técnica",
    description: "Código limpio, arquitecturas sólidas y mejores prácticas",
    details:
      "Aplicamos estándares de calidad rigurosos en cada línea de código para garantizar soluciones robustas y mantenibles.",
  },
  {
    icon: Users,
    title: "Trabajo en Equipo",
    description: "Colaboración efectiva tanto interna como con nuestros clientes",
    details:
      "Fomentamos un ambiente de colaboración donde las mejores ideas emergen del trabajo conjunto y la comunicación abierta.",
  },
]

export default function ValoresPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Nuestros Valores</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Los principios que guían nuestro trabajo y definen quiénes somos como equipo. Estos valores se reflejan en
            cada proyecto que desarrollamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <value.icon className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">{value.title}</CardTitle>
                <CardDescription className="text-base">{value.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">{value.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Nuestra Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-600 leading-relaxed">
                Empoderar a las empresas con soluciones tecnológicas personalizadas que impulsen su crecimiento y
                eficiencia. Creamos software que no solo funciona, sino que transforma la manera en que nuestros
                clientes hacen negocios.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">Nuestra Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-600 leading-relaxed">
                Ser el socio tecnológico de referencia para empresas que buscan innovar y crecer. Queremos ser
                reconocidos por nuestra excelencia técnica, transparencia y capacidad de entregar soluciones que superan
                las expectativas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
