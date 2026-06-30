"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/components/testseries/ExamPyqRunner.tsx
// ============================================================
// Loads one subject's questions and hands them to the shared
// ExamRunner engine. Used by the ESE and SSC PYQ [subject] pages.
// ============================================================

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ExamRunner, { type ExamQuestion } from "@/components/testseries/ExamRunner";
import type { ExamSubjectMeta } from "@/data/testseries/examTypes";

interface ExamPyqRunnerProps {
  examName: string;                       // "ESE / IES — Civil"
  subjects: ExamSubjectMeta[];
  bank: Record<string, ExamQuestion[]>;
  basePath: string;                       // ".../ese-pyq"
}

export default function ExamPyqRunner({
  examName, subjects, bank, basePath,
}: ExamPyqRunnerProps) {
  const params = useParams();
  const subjectId = params.subject as string;

  const subject = subjects.find((s) => s.id === subjectId);
  const questions = useMemo<ExamQuestion[]>(
    () => bank[subjectId] ?? [],
    [bank, subjectId]
  );

  if (!subject || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-sm">
          <p className="text-lg font-bold text-slate-700 mb-3">No questions here yet.</p>
          <Link href={basePath} className="text-orange-600 underline font-bold">
            ← Back to subjects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ExamRunner
      questions={questions}
      examTitle={`${examName} — ${subject.name}`}
      examSubtitle={`Previous-year style practice · ${questions.length} questions`}
      paperLabel={`${subject.short} · ${questions.length} Questions`}
      durationSec={questions.length * 90}
      backHref={basePath}
      backLabel="Choose Another Subject"
    />
  );
}
