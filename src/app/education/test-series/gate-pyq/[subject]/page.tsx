"use client";
// ============================================================
// REPLACES YOUR EXISTING FILE AT:
//   src/app/education/test-series/gate-pyq/[subject]/page.tsx
// ============================================================
// Subject-wise GATE PYQ test. Now just loads that subject's
// questions and hands them to the shared ExamRunner engine, so
// the PYQ tests and full-length tests look and behave identically.
// ============================================================

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GATE_SUBJECTS } from "@/data/gate/subjects";
import { GATE_QUESTIONS } from "@/data/gate/questions";
import ExamRunner from "@/components/testseries/ExamRunner";

const SUBJECT_DURATION = 60 * 60; // 60 min per subject test

export default function GatePyqSubjectPage() {
  const params = useParams();
  const subjectId = params.subject as string;
  const subject = GATE_SUBJECTS.find((s) => s.id === subjectId);
  const questions = GATE_QUESTIONS[subjectId] ?? [];

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-sm">
          <p className="text-lg font-bold text-slate-700 mb-3">Subject not found.</p>
          <Link href="/education/test-series/gate-pyq" className="text-orange-600 underline font-bold">
            ← Back to subject list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ExamRunner
      questions={questions}
      examTitle={`GATE CE PYQ — ${subject.name}`}
      examSubtitle={`Previous Year Questions · ${subject.years}`}
      paperLabel={`${subject.name} · ${questions.length} Questions`}
      durationSec={SUBJECT_DURATION}
      backHref="/education/test-series/gate-pyq"
      backLabel="Choose Another Subject"
      notice={questions.length === 0
        ? "Questions for this subject are being added. Check back soon."
        : undefined}
    />
  );
}
