"use client";
import { useEffect } from "react";
import { getTrafficAttribution } from "@/lib/traffic-attribution";

export default function TrafficAttribution() {
  useEffect(() => { getTrafficAttribution(); }, []);
  return null;
}
