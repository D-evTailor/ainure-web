"use client";

import { useRef, useState } from "react";
import { PinGate } from "./_components/pin-gate";
import { DashboardContent } from "./_components/dashboard-content";

export default function DashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const pinRef = useRef("");

  function handleAuthenticated(pin: string) {
    pinRef.current = pin;
    setAuthenticated(true);
  }

  if (!authenticated) {
    return <PinGate onAuthenticated={handleAuthenticated} />;
  }

  return <DashboardContent pin={pinRef.current} />;
}
