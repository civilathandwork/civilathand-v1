"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get("mode");
      if (modeParam === "signup" || modeParam === "signin") {
        setMode(modeParam as any);
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

          </form>
        </motion.div>

        {/* Footer info text */}
        <p className="text-[10px] text-slate-500 text-center leading-relaxed max-w-xs mx-auto">
          Authorized personnel access only. By accessing this platform you agree to our Terms & Conditions.
        </p>

      </div>
    </div>
  );
}
