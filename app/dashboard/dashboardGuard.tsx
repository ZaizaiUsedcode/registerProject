// app/dashboard/DashboardGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("api/me");
        if (res.status !== 200) {
          router.replace("/login");
          return;
        }
      } catch (err) {
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [router]);

  if (checking) {
    return <div className="p-4 text-sm text-muted-foreground">Checking auth…</div>;
  }

  return <>{children}</>;
}
