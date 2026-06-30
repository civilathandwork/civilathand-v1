"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/components/testseries/ExamFullRunner.tsx
// ============================================================
// Assembles a full-length paper from a blueprint + bank and runs
// the shared ExamRunner engine. Used by ESE and SSC runner pages.
// ============================================================

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getFullTest } from "@/data/testseries/blueprints";
import { assembleTest } from "@/lib/assembleTest";
import type { BankQuestion } from "@/lib/assembleTest";
import ExamRunner from "@/components/testseries/ExamRunner";

interface ExamFullRunnerProps {
  examName: string;            // "ESE Civil Prelims"
  bank: Record<string, BankQuestion[]>;
  basePath: string;            // ".../ese-full-length"
  paperName: string;           // "Civil Engineering"
}

export default function ExamFullRunner({
  examName, bank, basePath, paperName,
}: ExamFullRunnerProps) {
  const params = useParams();
  const testId = params.testId as string;
  const blueprint = getFullTest(testId);

  const assembled = useMemo(
    () => (blueprint ? assembleTest(blueprint, bank) : null),
    [blueprint, bank]
  );

  if (!blueprint || !assembled || assembled.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-sm">
          <p className="text-lg font-bold text-slate-700 mb-3">This test isn't ready yet.</p>
          <Link href={basePath} className="text-orange-600 underline font-bold">
            ← Back to Full Length Tests
          </Link>
        </div>
      </div>
    );
  }

  const incomplete = assembled.questions.length < blueprint.totalQuestions;

  return (
    <ExamRunner
      questions={assembled.questions}
      examTitle={`${examName} — ${blueprint.name}`}
      examSubtitle={blueprint.subtitle}
      paperLabel={`${paperName} · ${assembled.questions.length} Questions`}
      durationSec={blueprint.durationSec}
      backHref={basePath}
      backLabel="Choose Another Test"
      notice={incomplete
        ? `Showing ${assembled.questions.length} of ${blueprint.totalQuestions} questions — bank still expanding.`
        : undefined}
    />
  );
}
