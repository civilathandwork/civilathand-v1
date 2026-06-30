"use client";
// PLACE AT: src/app/education/test-series/ssc-pyq/page.tsx
import React from "react";
import ExamPyqList from "@/components/testseries/ExamPyqList";
import { SSC_SUBJECTS } from "@/data/ssc/subjects";
import { SSC_QUESTIONS } from "@/data/ssc/questions";

export default function SscPyqPage() {
  return (
    <ExamPyqList
      examName="SSC-JE — Civil"
      examTagline="Practice SSC-JE questions subject by subject — Reasoning, General Awareness, and Civil Technical — in a real exam interface with timer and detailed solutions."
      subjects={SSC_SUBJECTS}
      bank={SSC_QUESTIONS}
      basePath="/education/test-series/ssc-pyq"
    />
  );
}
