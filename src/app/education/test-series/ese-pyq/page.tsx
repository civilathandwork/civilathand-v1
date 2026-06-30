"use client";
// PLACE AT: src/app/education/test-series/ese-pyq/page.tsx
import React from "react";
import ExamPyqList from "@/components/testseries/ExamPyqList";
import { ESE_SUBJECTS } from "@/data/ese/subjects";
import { ESE_QUESTIONS } from "@/data/ese/questions";

export default function EsePyqPage() {
  return (
    <ExamPyqList
      examName="ESE / IES — Civil"
      examTagline="Practice ESE Civil Engineering questions subject by subject in a real exam interface — timer, palette, calculator, and detailed solutions for every question."
      subjects={ESE_SUBJECTS}
      bank={ESE_QUESTIONS}
      basePath="/education/test-series/ese-pyq"
    />
  );
}
