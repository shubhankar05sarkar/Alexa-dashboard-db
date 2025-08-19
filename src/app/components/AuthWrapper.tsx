"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pages that don't need authentication
    const publicPaths = ["/", "/login"];

    if (publicPaths.includes(pathname)) {
      setLoading(false);
      return;
    }

    // Check login status
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (!loggedIn) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) {
    return <div>Loading...</div>; // can replace with spinner later
  }

  return <>{children}</>;
}
