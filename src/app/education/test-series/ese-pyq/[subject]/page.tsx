"use client";
// PLACE AT: src/app/education/test-series/ese-pyq/[subject]/page.tsx
import React from "react";
import ExamPyqRunner from "@/components/testseries/ExamPyqRunner";
import { ESE_SUBJECTS } from "@/data/ese/subjects";
import { ESE_QUESTIONS } from "@/data/ese/questions";

export default function EsePyqSubjectPage() {
  return (
    <ExamPyqRunner
      examName="ESE / IES — Civil"
      subjects={ESE_SUBJECTS}
      bank={ESE_QUESTIONS}
      basePath="/education/test-series/ese-pyq"
    />
  );
}
