import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0d1117] via-gray-900 to-[#0d1117] text-white border-t border-gray-800">
      <div className="app-container py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/dev_tailor_logo.png"
                alt="Selference Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mb-6 max-w-md leading-relaxed text-gray-300">
              Soluciones de software a medida que se adaptan perfectamente 
              a las necesidades de tu empresa.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-lg p-2.5 text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-brand-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg p-2.5 text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-brand-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg p-2.5 text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-brand-300"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Navegacion</h4>
            <ul className="space-y-3">
              {["Servicios", "Metodología", "Valores", "Contacto"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-brand-300 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-brand-300 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 text-brand-300 mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@selference.com"
                  className="hover:text-brand-300 transition-colors"
                >
                  info@selference.com
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 text-brand-300 mr-3 flex-shrink-0" />
                <a
                  href="tel:+34XXXXXXXXX"
                  className="hover:text-brand-300 transition-colors"
                >
                  +34 XXX XXX XXX
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 text-brand-300 mr-3 flex-shrink-0" />
                <span>España (Remoto)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Selference. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <Link
                href="#"
                className="text-gray-400 hover:text-brand-300 text-sm transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-brand-300 text-sm transition-colors"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
