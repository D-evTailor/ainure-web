"use client";

import { useState } from "react";
import { Lock, ShieldAlert } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PinGateProps = {
  onAuthenticated: (pin: string) => void;
};

export function PinGate({ onAuthenticated }: PinGateProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  async function handleSubmit(value: string) {
    if (loading || value.length < 6) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/talks/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: value, specialty: "all" }),
      });

      if (response.status === 401) {
        setShake(true);
        setTimeout(() => setShake(false), 600);
        setPin("");
        setError("PIN incorrecto");
        return;
      }

      if (!response.ok) {
        setError("Error al conectar con el servidor");
        return;
      }

      onAuthenticated(value);
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="mx-auto w-full max-w-sm space-y-8 text-center">
        <div className="space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-elevated">
            <Lock className="h-7 w-7 text-ainure-300" />
          </div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Dashboard TALKS
          </h1>
          <p className="text-sm text-text-secondary">
            Introduce el PIN de acceso para ver los resultados
          </p>
        </div>

        <div className="space-y-4">
          <div
            className={cn(
              "flex justify-center transition-transform",
              shake && "animate-[shake_0.5s_ease-in-out]",
            )}
          >
            <InputOTP
              maxLength={6}
              value={pin}
              onChange={setPin}
              onComplete={handleSubmit}
              disabled={loading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-sm text-red-400">
              <ShieldAlert className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={() => handleSubmit(pin)}
            disabled={loading || pin.length < 6}
            className="w-full border border-ainure-300/40 bg-ainure-500 font-semibold text-white hover:bg-ainure-400"
          >
            {loading ? "Verificando..." : "Acceder"}
          </Button>
        </div>
      </div>
    </div>
  );
}
