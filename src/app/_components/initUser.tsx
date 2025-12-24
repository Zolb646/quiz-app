"use client";

import { useEffect } from "react";

export default function InitUser() {
  useEffect(() => {
    fetch("/api/user", { method: "POST" });
  }, []);

  return null;
}
