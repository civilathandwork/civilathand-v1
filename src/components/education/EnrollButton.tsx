"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/components/education/EnrollButton.tsx
// ============================================================
// A smart button you can drop anywhere. It looks at the payment
// link in src/data/education/site.ts and decides what to show:
//
//   • payment link is EMPTY  -> "Free for now" (green, clickable
//                                to the Google Form OR WhatsApp)
//   • payment link is SET     -> "Pay & Enroll" (sends to Cashfree)
//   • comingSoon = true       -> "Coming Soon" (greyed, disabled)
//
// You never edit this file to switch on payments — just paste your
// Cashfree link into PAYMENT_LINKS in src/data/education/site.ts.
// ============================================================

import React from "react";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";

interface EnrollButtonProps {
  paymentLink: string;      // from PAYMENT_LINKS.* (may be "")
  price?: string;           // e.g. "₹999"
  freeHref?: string;        // where to go while free (form / whatsapp)
  freeLabel?: string;       // text while free, default "Enroll Free"
  comingSoon?: boolean;     // force a disabled "Coming Soon" state
  full?: boolean;           // full width
}

export default function EnrollButton({
  paymentLink,
  price,
  freeHref,
  freeLabel = "Enroll Free",
  comingSoon = false,
  full = true,
}: EnrollButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all" +
    (full ? " w-full" : "");

  // 1. Coming soon — disabled.
  if (comingSoon) {
    return (
      <span className={`${base} bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed`}>
        <Lock className="h-4 w-4" /> Coming Soon
      </span>
    );
  }

  // 2. Payment is live — send to Cashfree.
  if (paymentLink) {
    return (
      <a href={paymentLink} target="_blank" rel="noopener noreferrer"
        className={`${base} bg-orange-500 hover:bg-orange-600 text-white`}>
        Pay {price ? `${price} ` : ""}&amp; Enroll <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  // 3. Free for now — go to the form / whatsapp.
  return (
    <a href={freeHref || "#"} target="_blank" rel="noopener noreferrer"
      className={`${base} bg-green-500 hover:bg-green-600 text-white`}>
      <CheckCircle2 className="h-4 w-4" /> {freeLabel}
    </a>
  );
}
