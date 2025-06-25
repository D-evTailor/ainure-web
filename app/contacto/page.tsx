"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactForm {
  name: string
  email: string
  company: string
  phone: string
  service: string
  budget: string
  message: string
}

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)

    // Simular envío del formulario
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      })

      reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Contacto</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo podemos ayudarte a convertir tu idea en realidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Mail className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Email</CardTitle>
                  <CardDescription>info@devtailor.com</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Teléfono</CardTitle>
                  <CardDescription>+34 XXX XXX XXX</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Ubicación</CardTitle>
                  <CardDescription>España (Trabajo remoto)</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Horario</CardTitle>
                  <CardDescription>Lun - Vie: 9:00 - 18:00</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cuéntanos sobre tu proyecto</CardTitle>
                <CardDescription>
                  Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre *</Label>
                      <Input
                        id="name"
                        {...register("name", { required: "El nombre es obligatorio" })}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "El email es obligatorio",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email inválido",
                          },
                        })}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" {...register("company")} />
                    </div>

                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" {...register("phone")} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="service">Tipo de servicio</Label>
                      <Select onValueChange={(value) => setValue("service", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Desarrollo Web</SelectItem>
                          <SelectItem value="mobile">Aplicación Móvil</SelectItem>
                          <SelectItem value="system">Sistema de Gestión</SelectItem>
                          <SelectItem value="cloud">Solución Cloud</SelectItem>
                          <SelectItem value="integration">Integración</SelectItem>
                          <SelectItem value="consulting">Consultoría</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="budget">Presupuesto estimado</Label>
                      <Select onValueChange={(value) => setValue("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rango" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5k-10k">5.000€ - 10.000€</SelectItem>
                          <SelectItem value="10k-25k">10.000€ - 25.000€</SelectItem>
                          <SelectItem value="25k-50k">25.000€ - 50.000€</SelectItem>
                          <SelectItem value="50k+">Más de 50.000€</SelectItem>
                          <SelectItem value="discuss">A discutir</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Cuéntanos sobre tu proyecto, objetivos, plazos y cualquier detalle relevante..."
                      {...register("message", { required: "El mensaje es obligatorio" })}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
