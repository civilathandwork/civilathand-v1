"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/components/education/MentorshipForm.tsx
// ============================================================
// Shows the mentorship Google Form right inside the page, in a
// clean white card that looks good on phone AND desktop.
// It also shows an "Open form in new tab" button as a backup
// (some phones block embedded Google Forms).
//
// To change the form, edit MENTORSHIP_FORM_* in
// src/data/education/site.ts — never this file.
// ============================================================

import React from "react";
import { ExternalLink, FileText } from "lucide-react";
import { MENTORSHIP_FORM_URL, MENTORSHIP_FORM_EMBED } from "@/data/education/site";

export default function MentorshipForm() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-wix-gray">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-orange-500" />
          <p className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide">
            Mentorship Application
          </p>
        </div>
        <a href={MENTORSHIP_FORM_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest">
          Open in new tab <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* The embedded form. Height is generous so all fields show. */}
      <div className="w-full bg-white">
        <iframe
          src={MENTORSHIP_FORM_EMBED}
          title="Civil At Hand Mentorship Application Form"
          className="w-full"
          style={{ minHeight: 760, border: 0 }}
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>

      <div className="px-5 py-3 border-t border-slate-100 bg-wix-gray text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          Trouble seeing the form?{" "}
          <a href={MENTORSHIP_FORM_URL} target="_blank" rel="noopener noreferrer"
            className="text-orange-600 font-bold underline">
            Tap here to open it.
          </a>
        </p>
      </div>
    </div>
  );
}
