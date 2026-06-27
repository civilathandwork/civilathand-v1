"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Calendar, Building2, MapPin, Save, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  
  // Form fields state
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");

  // UI status state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userJson = localStorage.getItem("cah_user");
      if (userJson) {
        const u = JSON.parse(userJson);
        setUserId(u.id || "");
        setName(u.name || "");
        setEmail(u.email || "");
        setPhone(u.phone || "");
        setGender(u.gender || "");
        setDob(u.dob || "");
        setCompany(u.company || "");
        setAddress(u.address || "");
      }
    }
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          name,
          email,
          phone,
          gender,
          dob,
          company,
          address
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile.");
      }

      // Update localStorage with updated user details
      localStorage.setItem("cah_user", JSON.stringify(data));
      
      // Dispatch storage event to alert other components (like Header)
      window.dispatchEvent(new Event("storage"));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 select-none">
      <Header />

      <main className="flex-grow py-12 relative z-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          
          {/* Breadcrumb back navigation */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-500 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            
            {/* Header info */}
            <div className="border-b border-slate-100 pb-5">
              <h2 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-wide">
                Your Account Profile
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                View and customize your personal parameters to speed up quotation requests.
              </p>
            </div>

            {/* Profile form */}
            <form onSubmit={handleProfileSubmit} className="space-y-5">
              
              {/* Feedback messages */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold rounded-xl p-4 flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>Your profile parameters have been updated successfully!</span>
                  </motion.div>
                )}

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 border border-red-100 text-red-800 text-xs font-bold rounded-xl p-4"
                  >
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-bold placeholder-slate-350"
                    />
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Email (Read Only) */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      readOnly
                      value={email}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-500 focus:outline-none font-bold select-none"
                    />
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-bold placeholder-slate-350"
                    />
                    <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-bold"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Date of Birth (DOB)
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-bold"
                    />
                    <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Company Name (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Builders"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-bold placeholder-slate-350"
                    />
                    <Building2 className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Address (Span across 2 columns) */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Consulting / Billing Address
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter details for invoice and site delivery compliance..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-bold placeholder-slate-350 resize-none"
                    />
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>

              </div>

              {/* Submit button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      Saving Parameters...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 text-white" />
                      Save Settings
                    </>
                  )}
                </motion.button>
              </div>

            </form>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
