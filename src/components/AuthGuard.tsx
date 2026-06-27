"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is signed in
    const userJson = localStorage.getItem("cah_user");
    const isAuth = !!userJson;
    setIsAuthenticated(isAuth);

    const isAuthPage = pathname === "/auth" || pathname.startsWith("/auth/");
    const isProtectedPage = 
      pathname.startsWith("/calculators") ||
      pathname.startsWith("/calculator") ||
      pathname.startsWith("/services") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/cah-expert-control");

    if (!isAuth && isProtectedPage) {
      // Redirect to sign in if accessing protected route
      router.replace("/auth");
    } else if (isAuth && isAuthPage) {
      // Redirect to home if logged in and trying to access auth page
      router.replace("/");
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  // Keep a clean premium loading state while verifying credentials
  const isProtected = 
    pathname.startsWith("/calculators") ||
    pathname.startsWith("/calculator") ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/cah-expert-control");

  if (loading && isProtected) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-white">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border border-slate-800 shadow-orange-glow animate-pulse">
          <span className="font-display text-lg font-extrabold text-white">
            C<span className="text-orange-500">H</span>
          </span>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-orange-500 rounded-full animate-progress" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-2 font-bold animate-pulse">
            Authenticating Session...
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
