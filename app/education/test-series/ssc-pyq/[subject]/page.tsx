"use client";
// PLACE AT: src/app/education/test-series/ssc-pyq/[subject]/page.tsx
import React from "react";
import ExamPyqRunner from "@/components/testseries/ExamPyqRunner";
import { SSC_SUBJECTS } from "@/data/ssc/subjects";
import { SSC_QUESTIONS } from "@/data/ssc/questions";

export default function SscPyqSubjectPage() {
  return (
    <ExamPyqRunner
      examName="SSC-JE — Civil"
      subjects={SSC_SUBJECTS}
      bank={SSC_QUESTIONS}
      basePath="/education/test-series/ssc-pyq"
    />
  );
}
