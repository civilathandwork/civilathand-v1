"use client";
// PLACE AT: src/app/education/test-series/ese-full-length/page.tsx
import React from "react";
import ExamFullList from "@/components/testseries/ExamFullList";
import { ESE_FULL_TESTS } from "@/data/testseries/blueprints";
import { ESE_QUESTIONS } from "@/data/ese/questions";

export default function EseFullLengthList() {
  return (
    <ExamFullList
      examName="ESE Civil Prelims"
      examTagline="150 questions · 300 marks · 3 hours — built to the ESE (IES) Civil Paper-II pattern. Real CBT-style interface with timer, calculator, and detailed solutions."
      tests={ESE_FULL_TESTS}
      bank={ESE_QUESTIONS}
      basePath="/education/test-series/ese-full-length"
    />
  );
}
