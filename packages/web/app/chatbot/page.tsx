"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Code, Zap, MessageSquare, FileText, Lightbulb, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

const suggestedQuestions = [
  "Necesito una aplicación web personalizada",
  "Quiero automatizar procesos de mi empresa",
  "Busco una solución móvil innovadora", 
  "Requiero integración con APIs existentes"
];

const projectTypes = [
  { icon: Code, title: "Desarrollo Web", desc: "Aplicaciones web modernas y escalables" },
  { icon: Zap, title: "Automatización", desc: "Optimización de procesos empresariales" },
  { icon: MessageSquare, title: "Chatbots IA", desc: "Asistentes inteligentes personalizados" },
  { icon: FileText, title: "Sistemas ERP", desc: "Gestión integral de recursos" }
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "¡Hola! Soy tu asistente digital de Selference. Estoy aquí para ayudarte a definir tu proyecto ideal. Cuéntame: ¿qué desafío tecnológico quieres resolver?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Solo hacer scroll automático después de la carga inicial
    if (!isInitialLoad) {
      scrollToBottom();
    }
  }, [messages, isInitialLoad]);

  useEffect(() => {
    // Marcar que ya no es la carga inicial después del primer render
    setIsInitialLoad(false);
  }, []);

  const simulateTyping = (response: string) => {
    setIsTyping(true);
    
    // Add typing indicator
    const typingId = `typing-${Date.now()}`;
    setMessages(prev => [...prev, {
      id: typingId,
      content: "",
      isUser: false,
      timestamp: new Date(),
      typing: true
    }]);

    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== typingId));
      setMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        content: response,
        isUser: false,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("web") || message.includes("página") || message.includes("sitio")) {
      return "Excelente! El desarrollo web es nuestra especialidad. ¿Buscas una landing page, una aplicación compleja, o un e-commerce? Cuéntame más sobre tus usuarios objetivo y funcionalidades específicas.";
    }
    
    if (message.includes("app") || message.includes("móvil") || message.includes("aplicación")) {
      return "¡Perfecto! Las aplicaciones móviles pueden transformar tu negocio. ¿Necesitas iOS, Android, o una solución híbrida? ¿Qué problema específico resolverá para tus usuarios?";
    }
    
    if (message.includes("automatizar") || message.includes("proceso") || message.includes("gestión")) {
      return "La automatización es clave para la eficiencia. ¿Qué procesos manuales consumen más tiempo en tu empresa? ¿Trabajas con CRM, inventarios, facturación, o otros sistemas específicos?";
    }
    
    if (message.includes("ai") || message.includes("inteligencia") || message.includes("chatbot")) {
      return "¡La IA es fascinante! Podemos crear desde chatbots inteligentes hasta sistemas de análisis predictivo. ¿Qué tipo de datos manejas y qué decisiones quieres automatizar o mejorar?";
    }
    
    if (message.includes("precio") || message.includes("costo") || message.includes("presupuesto")) {
      return "Entiendo que el presupuesto es importante. Nuestros proyectos se adaptan a diferentes rangos. Para darte una estimación precisa, necesito entender mejor el alcance. ¿Podrías describir las funcionalidades principales que necesitas?";
    }
    
    if (message.includes("tiempo") || message.includes("cuánto") || message.includes("plazo")) {
      return "Los tiempos varían según la complejidad. Un proyecto simple puede tomar 2-4 semanas, mientras que sistemas complejos pueden requerir 2-6 meses. ¿Tienes alguna fecha límite o lanzamiento específico en mente?";
    }
    
    return "Interesante propuesta. Para crear la solución perfecta para ti, me gustaría conocer más detalles. ¿Podrías contarme sobre tu industria, el tamaño de tu equipo, y qué resultado específico esperas lograr?";
  };

  const handleSendMessage = (content: string = inputValue) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: content.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    const response = generateResponse(content);
    simulateTyping(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="app-page bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117]">
      <div className="app-container py-4 sm:py-6 md:py-8">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-brand-400 to-brand-300 rounded-xl">
              <Sparkles className="h-6 w-6 text-white sm:h-8 sm:w-8" />
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Asistente de <span className="text-brand-300">Proyectos</span>
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl">
            Conversemos sobre tu idea. Nuestro asistente inteligente te ayudará a definir el proyecto perfecto para tu negocio.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
          
          {/* Project Types Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-brand-300" />
                  Tipos de Proyecto
                </h3>
                <div className="space-y-3">
                  {projectTypes.map((type, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer group"
                      onClick={() => handleSendMessage(`Me interesa ${type.title.toLowerCase()}: ${type.desc}`)}
                    >
                      <div className="flex items-start gap-3">
                        <type.icon className="h-5 w-5 text-brand-300 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-white font-medium text-sm">{type.title}</p>
                          <p className="text-gray-400 text-xs">{type.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-300" />
                  Proceso Selference
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-brand-300 rounded-full"></div>
                    Análisis detallado
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-brand-300 rounded-full"></div>
                    Prototipo funcional
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-brand-300 rounded-full"></div>
                    Desarrollo iterativo
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-brand-300 rounded-full"></div>
                    Testing & Deploy
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 lg:self-stretch">
            <Card className="flex min-h-[560px] flex-col border-gray-700 bg-gray-800/50 backdrop-blur-sm lg:min-h-[640px]">
              
              {/* Messages Container */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[92%] rounded-xl p-3 sm:max-w-[80%] sm:p-4",
                        message.isUser
                          ? "bg-[rgb(24,59,63)] text-white ml-4"
                          : "bg-gray-700/80 text-gray-100 mr-4",
                        message.typing && "animate-pulse"
                      )}
                    >
                      {message.typing ? (
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-60 mt-2">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-4 sm:px-6">
                  <p className="text-sm text-gray-400 mb-3">Sugerencias para empezar:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-brand-400/20 hover:text-brand-300 transition-colors bg-gray-700/50 text-gray-300"
                        onClick={() => handleSendMessage(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t border-gray-700 p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Describe tu proyecto, idea o desafío tecnológico..."
                      className="w-full resize-none rounded-xl border border-gray-600 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-300"
                      rows={2}
                      disabled={isTyping}
                    />
                  </div>
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="h-auto px-6 py-3 text-white bg-[rgb(24,59,63)] hover:bg-[rgb(18,45,48)] sm:self-end"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Presiona Enter para enviar, Shift+Enter para nueva línea
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
