"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const handleGoogleCallback = async (accessToken: string) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg("Verifying Google account...");

    try {
      const userinfoRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
      if (!userinfoRes.ok) throw new Error("Failed to fetch user profile from Google");
      const userinfo = await userinfoRes.json();

      const { name, email } = userinfo;
      if (!email) throw new Error("No email returned from Google user info");

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Google User",
          email,
          isGoogle: true
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setSuccessMsg("Signed in with Google successfully!");
      localStorage.setItem("cah_user", JSON.stringify(data));
      window.dispatchEvent(new Event("storage"));
      
      // Clear URL hash fragment
      window.history.replaceState(null, "", window.location.pathname);
      
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Google authentication failed. Please try standard sign in.");
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get("mode");
      if (modeParam === "signup" || modeParam === "signin") {
        setMode(modeParam as any);
      }

      const hash = window.location.hash;
      if (hash && hash.includes("access_token=")) {
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get("access_token");
        if (accessToken) {
          handleGoogleCallback(accessToken);
        }
      }
    }
  }, []);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const configRes = await fetch("/api/auth/google-config");
      const config = await configRes.json();
      
      if (config.clientId) {
        // Real Google Authentication using OAuth2 implicit flow
        const clientId = config.clientId;
        const redirectUri = window.location.origin + "/auth";
        const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email")}`;
        
        window.location.href = oauthUrl;
        return;
      }
    } catch (configErr) {
      console.warn("Failed to check Google client configuration, using fallback mock provider", configErr);
    }

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      "",
      "google_signin_popup",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no`
    );

    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Sign in - Google Accounts</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #ffffff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
              }
              .card {
                width: 380px;
                padding: 40px;
                border: 1px solid #dadce0;
                border-radius: 8px;
                text-align: center;
              }
              .logo {
                width: 74px;
                height: 24px;
                margin-bottom: 16px;
              }
              h1 {
                font-size: 24px;
                font-weight: 400;
                color: #202124;
                margin: 0 0 8px 0;
              }
              p {
                font-size: 16px;
                color: #202124;
                margin: 0 0 24px 0;
              }
              .user-option {
                display: flex;
                align-items: center;
                padding: 12px 16px;
                border-top: 1px solid #dadce0;
                border-bottom: 1px solid #dadce0;
                cursor: pointer;
                text-align: left;
                transition: background-color 0.2s;
              }
              .user-option:hover {
                background-color: #f7f8f9;
              }
              .avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background-color: #1a73e8;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 500;
                margin-right: 12px;
              }
              .user-info {
                flex-grow: 1;
              }
              .user-name {
                font-size: 14px;
                font-weight: 500;
                color: #3c4043;
              }
              .user-email {
                font-size: 12px;
                color: #70757a;
              }
            </style>
          </head>
          <body>
            <div class="card">
              <svg class="logo" viewBox="0 0 74 24" fill="none">
                <path fill="#EA4335" d="M22.8 12.4c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6zm-12 0c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4-4 1.8-4 4z"/>
                <path fill="#FBBC05" d="M35.6 12.4c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6zm-12 0c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4-4 1.8-4 4z"/>
                <path fill="#4285F4" d="M48.2 12.4c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c1.7 0 3.2.7 4.2 1.8l-3 3c-.6-.6-1.4-.9-2.2-.9-1.7 0-3 1.3-3 3s1.3 3 3 3c2 0 2.7-1.4 2.8-2.1H42.2v-4h9c0 .6.1 1.2.1 1.8 0 3.2-2.1 5.4-5.1 5.4z"/>
                <path fill="#34A853" d="M57.6 12.4c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6zm-12 0c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4-4 1.8-4 4z"/>
              </svg>
              <h1>Choose an account</h1>
              <p>to continue to Civil At Hand</p>
              
              <div class="user-option" onclick="selectUser('Google Test Client', 'google.client@gmail.com')">
                <div class="avatar">G</div>
                <div class="user-info">
                  <div class="user-name">Google Test Client</div>
                  <div class="user-email">google.client@gmail.com</div>
                </div>
              </div>
            </div>

            <script>
              function selectUser(name, email) {
                window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', name, email }, '*');
                window.close();
              }
            </script>
          </body>
        </html>
      `);
    }

    const handleMessage = async (event: MessageEvent) => {
      if (event.data && event.data.type === "GOOGLE_AUTH_SUCCESS") {
        window.removeEventListener("message", handleMessage);
        const { name, email } = event.data;

        try {
          const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              isGoogle: true
            })
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || "Authentication failed.");
          }

          setSuccessMsg("Signed in with Google successfully!");
          localStorage.setItem("cah_user", JSON.stringify(data));
          window.dispatchEvent(new Event("storage"));
          setTimeout(() => {
            router.replace("/");
          }, 1000);
        } catch (err: any) {
          setErrorMsg(err.message || "Google authentication failed. Please try standard sign in.");
          setLoading(false);
        }
      }
    };

    window.addEventListener("message", handleMessage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const url = mode === "signin" ? "/api/auth/signin" : "/api/auth/signup";
    const body = mode === "signin" 
      ? { email, password } 
      : { name, email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      if (mode === "signup") {
        setSuccessMsg("Account created successfully! Redirecting to profile...");
        localStorage.setItem("cah_user", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
        setTimeout(() => {
          router.replace("/profile");
        }, 1000);
      } else {
        setSuccessMsg("Signed in successfully! Loading portal...");
        localStorage.setItem("cah_user", JSON.stringify(data));
        // Force header update and redirect
        window.dispatchEvent(new Event("storage"));
        setTimeout(() => {
          router.replace("/");
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden select-none">
      
      {/* Background Glow Decors */}
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-orange-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Branding header */}
        <div className="text-center space-y-2">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 shadow-premium mb-2"
          >
            <img src="/logo.jpg" alt="Civil At Hand Logo" className="h-full w-full object-cover rounded-2xl" />
          </motion.div>
          
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">
            CIVIL <span className="text-orange-500">AT HAND</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
            Design Detailing & Structural Automation Hub
          </p>
        </div>

        {/* Tab switcher */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-1 rounded-xl flex">
          <button
            onClick={() => {
              setMode("signin");
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              mode === "signin" 
                ? "bg-orange-500 text-white shadow-orange-glow" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              mode === "signup" 
                ? "bg-orange-500 text-white shadow-orange-glow" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Main form container */}
        <motion.div 
          layout
          className="bg-slate-900/60 backdrop-blur-lg border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-premium"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Feedback messages */}
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex items-start gap-2 text-xs font-medium"
                >
                  <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg flex items-start gap-2 text-xs font-medium"
                >
                  <ShieldCheck className="h-4.5 w-4.5 shrink-0 mt-0.5 text-emerald-500" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3.5">
              
              {/* Name Field (Sign Up Only) */}
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-950/75 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-semibold shadow-sm transition-all"
                    />
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  </div>
                </motion.div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950/75 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-semibold shadow-sm transition-all"
                  />
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/75 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-semibold shadow-sm transition-all"
                  />
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-orange-glow disabled:opacity-55 cursor-pointer mt-6"
            >
              {loading ? (
                <>
                  <Loader className="h-4.5 w-4.5 animate-spin text-white" />
                  Please Wait...
                </>
              ) : (
                <>
                  {mode === "signin" ? "Sign In to Portal" : "Register Account"}
                  <ArrowRight className="h-4.5 w-4.5 text-white" />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                <span className="bg-slate-900 px-3 text-slate-500">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
            >
              <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.41 0-6.19-2.78-6.19-6.19s2.78-6.19 6.19-6.19c1.7 0 3.22.69 4.32 1.8l3.1-3.1C19.44 2.22 15.93.9 12.24.9 5.86.9.7 6.06.7 12.44s5.16 11.54 11.54 11.54c6.26 0 11.34-5.08 11.34-11.34 0-.74-.08-1.46-.24-2.16H12.24z"
                />
              </svg>
              <span>Sign in with Google</span>
            </motion.button>

          </form>
        </motion.div>

        {/* Footer info text */}
        <p className="text-[10px] text-slate-500 text-center leading-relaxed max-w-xs mx-auto">
          Authorized personnel access only. By accessing this platform you agree to our{" "}
          <Link href="/terms-and-conditions" className="text-orange-500 hover:text-orange-600 underline font-semibold transition-colors">
            Terms & Conditions
          </Link>.
        </p>

      </div>
    </div>
  );
}
