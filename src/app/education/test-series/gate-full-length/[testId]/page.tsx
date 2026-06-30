"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/app/education/test-series/gate-full-length/[testId]/page.tsx
// ============================================================
// Assembles a full-length GATE paper from the blueprint + your
// question bank, then hands it to the shared ExamRunner engine.
// ============================================================

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getFullTest } from "@/data/testseries/blueprints";
import { assembleTest } from "@/lib/assembleTest";
import { GATE_QUESTIONS } from "@/data/gate/questions";
import ExamRunner from "@/components/testseries/ExamRunner";

export default function GateFullLengthRunner() {
  const params = useParams();
  const testId = params.testId as string;
  const blueprint = getFullTest(testId);

  const assembled = useMemo(
    () => (blueprint ? assembleTest(blueprint, GATE_QUESTIONS) : null),
    [blueprint]
  );

  if (!blueprint || !assembled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-sm">
          <p className="text-lg font-bold text-slate-700 mb-3">Test not found.</p>
          <Link href="/education/test-series/gate-full-length" className="text-orange-600 underline font-bold">
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
      examTitle={`GATE CE — ${blueprint.name}`}
      examSubtitle={blueprint.subtitle}
      paperLabel={`Civil Engineering · ${assembled.questions.length} Questions`}
      durationSec={blueprint.durationSec}
      backHref="/education/test-series/gate-full-length"
      backLabel="Choose Another Test"
      notice={incomplete
        ? `Showing ${assembled.questions.length} of ${blueprint.totalQuestions} questions — bank still expanding.`
        : undefined}
    />
  );
}
