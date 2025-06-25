import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
              DevTailor
            </h3>
            <p className="text-gray-300 max-w-md mb-6 leading-relaxed">
              Desarrollamos soluciones de software personalizadas que se adaptan perfectamente a las necesidades
              específicas de tu empresa. Tu éxito es nuestro compromiso.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/servicios"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/metodologia"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Metodología
                </Link>
              </li>
              <li>
                <Link
                  href="/valores"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Valores
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@devtailor.com" className="hover:text-blue-400 transition-colors">
                  info@devtailor.com
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="tel:+34XXXXXXXXX" className="hover:text-blue-400 transition-colors">
                  +34 XXX XXX XXX
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span>España (Trabajo remoto)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} DevTailor. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
