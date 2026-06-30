"use client";
// PLACE AT: src/app/education/test-series/ssc-full-length/page.tsx
import React from "react";
import ExamFullList from "@/components/testseries/ExamFullList";
import { SSCJE_FULL_TESTS } from "@/data/testseries/blueprints";
import { SSC_QUESTIONS } from "@/data/ssc/questions";

export default function SscFullLengthList() {
  return (
    <ExamFullList
      examName="SSC-JE Civil"
      examTagline="Paper 1 (200 Q · 200 marks) and Paper 2 (100 Q · 300 marks) — built to the real SSC-JE pattern with Reasoning, GK, and Civil Technical. Timer, palette, and detailed solutions."
      tests={SSCJE_FULL_TESTS}
      bank={SSC_QUESTIONS}
      basePath="/education/test-series/ssc-full-length"
    />
  );
}
