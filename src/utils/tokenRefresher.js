'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TokenRefresher() {
  let router = useRouter()
  useEffect(() => {
    fetch("/api/auth/refresh").then(res => {
      if (res.ok) {
        router.refresh();
      } else {
        router.push("/login-register")
      }
    })
  }, []);

  return null;
}
