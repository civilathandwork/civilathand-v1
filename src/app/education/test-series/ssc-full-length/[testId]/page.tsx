"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTest } from "@/data/exams/registry";
import ExamRunner from "@/components/testseries/ExamRunner";

export default function SscFullLengthRunner() {
  const params = useParams();
  const testId = params.testId as string;
  const test = getTest("ssc", testId);

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-sm">
          <p className="text-lg font-bold text-slate-700 mb-3">Test not found.</p>
          <Link href="/education/test-series/ssc-full-length" className="text-orange-600 underline font-bold">
            ← Back to Full Length Tests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ExamRunner
      questions={test.questions}
      examTitle={`SSC-JE — ${test.name}`}
      examSubtitle={test.subtitle}
      paperLabel={`Civil Engineering · ${test.questions.length} Questions`}
      durationSec={test.durationSec}
      backHref="/education/test-series/ssc-full-length"
      backLabel="Choose Another Test"
      storageKey={`cah-ssc-${test.id}`}
    />
  );
}
