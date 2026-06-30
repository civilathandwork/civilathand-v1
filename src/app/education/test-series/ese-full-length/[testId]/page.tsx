"use client";
// PLACE AT: src/app/education/test-series/ese-full-length/[testId]/page.tsx
import React from "react";
import ExamFullRunner from "@/components/testseries/ExamFullRunner";
import { ESE_QUESTIONS } from "@/data/ese/questions";

export default function EseFullLengthRunner() {
  return (
    <ExamFullRunner
      examName="ESE Civil Prelims"
      bank={ESE_QUESTIONS}
      basePath="/education/test-series/ese-full-length"
      paperName="Civil Engineering"
    />
  );
}
