"use client";
// PLACE AT: src/app/education/test-series/ssc-full-length/[testId]/page.tsx
import React from "react";
import ExamFullRunner from "@/components/testseries/ExamFullRunner";
import { SSC_QUESTIONS } from "@/data/ssc/questions";

export default function SscFullLengthRunner() {
  return (
    <ExamFullRunner
      examName="SSC-JE Civil"
      bank={SSC_QUESTIONS}
      basePath="/education/test-series/ssc-full-length"
      paperName="SSC-JE"
    />
  );
}
