"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/app/education/test-series/gate-pyq/[subject]/page.tsx
// ============================================================

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GATE_SUBJECTS }   from "@/data/gate/subjects";
import { GATE_QUESTIONS }  from "@/data/gate/questions";
import type { GateQuestion } from "@/data/gate/questions";
import ScientificCalculator from "@/components/gate/ScientificCalculator";

// ─── Types ────────────────────────────────────────────────────────────────────
type QStatus = "not-visited" | "not-answered" | "answered" | "marked" | "answered-marked";

// ─── Constants ────────────────────────────────────────────────────────────────
const EXAM_DURATION = 3 * 3600; // 3 hours in seconds

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtTime(sec: number) {
  const h = Math.floor(sec / 3600).toString().padStart(3, "0");
  const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function genSampleQuestions(subjectId: string, subjectName: string): GateQuestion[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    type: "MCQ" as const,
    marks: 2 as const,
    neg: "2/3",
    year: "GATE-2022",
    question: `[Sample Q${i + 1}] Placeholder for <strong>${subjectName}</strong>. Add real questions to <code>src/data/gate/questions.ts</code> under the key <code>"${subjectId}"</code>.`,
    options: ["(a) Option A — Correct", "(b) Option B", "(c) Option C", "(d) Option D"],
    correct: 0,
    solution: `Sample solution for ${subjectName} Q${i + 1}. Add real data from your IES Master book.`,
  }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Palette box colour */
function paletteClass(status: QStatus, isCurrent: boolean) {
  if (isCurrent)          return "bg-orange-500 border-orange-600 text-white";
  if (status === "answered")         return "bg-green-600 border-green-700 text-white";
  if (status === "marked")           return "bg-purple-600 border-purple-700 text-white";
  if (status === "answered-marked")  return "bg-purple-600 border-green-500 text-white border-2";
  if (status === "not-answered")     return "bg-red-500 border-red-600 text-white";
  return "bg-slate-400 border-slate-500 text-white"; // not-visited
}

function LegendRow({ color, label, count }: { color: string; label: string; count: number }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-white text-xs ${color}`}>
        {count}
      </div>
      <span className="text-slate-600">{label}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GateExamPage() {
  const params     = useParams();
  const subjectId  = params.subject as string;
  const subject    = GATE_SUBJECTS.find((s) => s.id === subjectId);
  const rawQs      = GATE_QUESTIONS[subjectId];
  const questions: GateQuestion[] = rawQs?.length
    ? rawQs
    : genSampleQuestions(subjectId, subject?.name ?? subjectId);

  // ── state ──────────────────────────────────────────────────
  const [phase, setPhase] = useState<"exam" | "result">("exam");
  const [current, setCurrent] = useState(0);
  const [answers,  setAnswers]  = useState<Record<number, number | string>>({});
  const [statuses, setStatuses] = useState<Record<number, QStatus>>(() =>
    Object.fromEntries(questions.map((_, i) => [i, "not-visited"]))
  );
  const [showSolution, setShowSolution] = useState(false);
  const [showCalc,     setShowCalc]     = useState(false);
  const [showInstr,    setShowInstr]    = useState(false);
  const [showSubmit,   setShowSubmit]   = useState(false);
  const [timeLeft,     setTimeLeft]     = useState(EXAM_DURATION);
  const [sidebarOpen,  setSidebarOpen]  = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── score results ──────────────────────────────────────────
  const [scoreData, setScoreData] = useState({
    score: 0, maxScore: 0, correct: 0, wrong: 0, unattempted: 0, marked: 0,
  });

  // ── timer ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current!); handleSubmit(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── mark question visited when opened ─────────────────────
  useEffect(() => {
    setStatuses((prev) => {
      if (prev[current] === "not-visited") {
        return { ...prev, [current]: "not-answered" };
      }
      return prev;
    });
    setShowSolution(false);
  }, [current]);

  // ── counts ─────────────────────────────────────────────────
  const counts = {
    answered:        Object.values(statuses).filter((s) => s === "answered").length,
    notAnswered:     Object.values(statuses).filter((s) => s === "not-answered").length,
    notVisited:      Object.values(statuses).filter((s) => s === "not-visited").length,
    marked:          Object.values(statuses).filter((s) => s === "marked" || s === "answered-marked").length,
  };

  // ── actions ────────────────────────────────────────────────
  const selectOption = (idx: number) => {
    setAnswers((a) => ({ ...a, [current]: idx }));
    setStatuses((s) => {
      const prev = s[current];
      const next = prev === "marked" || prev === "answered-marked" ? "answered-marked" : "answered";
      return { ...s, [current]: next };
    });
  };

  const clearResponse = () => {
    setAnswers((a) => { const n = { ...a }; delete n[current]; return n; });
    setStatuses((s) => ({ ...s, [current]: "not-answered" }));
  };

  const markForReview = () => {
    setStatuses((s) => {
      const prev = s[current];
      const next = (prev === "answered" || prev === "answered-marked") ? "answered-marked" : "marked";
      return { ...s, [current]: next };
    });
    goNext();
  };

  const saveAndNext = () => goNext();
  const goNext = () => { if (current < questions.length - 1) setCurrent((c) => c + 1); };
  const goPrev = () => { if (current > 0) setCurrent((c) => c - 1); };
  const goTo   = (i: number) => setCurrent(i);

  // ── submit ─────────────────────────────────────────────────
  const handleSubmit = useCallback((auto = false) => {
    clearInterval(timerRef.current!);
    let score = 0, maxScore = 0, correct = 0, wrong = 0, unattempted = 0;
    questions.forEach((q, i) => {
      maxScore += q.marks;
      const ans = answers[i];
      if (ans === undefined) { unattempted++; return; }
      if (typeof ans === "number" && ans === q.correct) {
        correct++;
        score += q.marks;
      } else {
        wrong++;
        const neg = parseFloat(q.neg.split("/")[0]) / (parseFloat(q.neg.split("/")[1]) || 1);
        score -= neg;
      }
    });
    score = Math.max(0, score);
    const markedCount = Object.values(statuses).filter(
      (s) => s === "marked" || s === "answered-marked"
    ).length;
    setScoreData({ score, maxScore, correct, wrong, unattempted, marked: markedCount });
    setShowSubmit(false);
    setPhase("result");
  }, [answers, questions, statuses]);

  // ── redirect if subject not found ─────────────────────────
  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-lg font-bold text-slate-700 mb-4">Subject not found.</p>
          <Link href="/education/test-series/gate-pyq" className="text-blue-600 underline">
            ← Back to subject list
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[current];

  // ══════════════════════════════════════════════════════════
  // RESULT SCREEN
  // ══════════════════════════════════════════════════════════
  if (phase === "result") {
    const pct = Math.round((scoreData.score / scoreData.maxScore) * 100);
    const grade = pct >= 70 ? "🎉 Excellent!" : pct >= 50 ? "👍 Good Attempt" : "📚 Keep Practicing";
    return (
      <div className="min-h-screen bg-slate-100">
        {/* Header */}
        <div className="bg-blue-800 text-white px-6 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-white/20 flex items-center justify-center font-bold text-sm">CAH</div>
          <div>
            <h1 className="font-bold text-lg">Exam Result — {subject.name}</h1>
            <p className="text-white/70 text-xs">GATE CE PYQ · Civil At Hand Education</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
          {/* Score card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 text-center shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Your Score</p>
            <div className="text-6xl font-bold text-blue-700">{scoreData.score.toFixed(2)}</div>
            <div className="text-slate-400 text-xl">/ {scoreData.maxScore}</div>
            <div className="text-slate-600 text-sm mt-1">{pct}% — {grade}</div>
            <div className="mt-4 h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Correct",      val: scoreData.correct,     color: "text-green-600" },
              { label: "Wrong",        val: scoreData.wrong,        color: "text-red-600" },
              { label: "Unattempted", val: scoreData.unattempted,  color: "text-slate-500" },
              { label: "Marked",       val: scoreData.marked,       color: "text-purple-600" },
            ].map(({ label, val, color }) => (
              <div key={label} className="bg-white rounded-lg border border-slate-200 p-4 text-center shadow-sm">
                <div className={`text-3xl font-bold ${color}`}>{val}</div>
                <div className="text-xs text-slate-500 font-semibold uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Answer Key */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Answer Key & Detailed Review</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {questions.map((q, i) => {
                const userAns = answers[i];
                const isCorrect    = typeof userAns === "number" && userAns === q.correct;
                const isUnattempted = userAns === undefined;
                return (
                  <div
                    key={i}
                    className={`px-5 py-4 border-l-4 ${
                      isUnattempted ? "border-slate-300" : isCorrect ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">
                        {isUnattempted ? "⬜" : isCorrect ? "✅" : "❌"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-slate-800">Q{i + 1}</span>
                          <span className="text-xs text-slate-400">{q.year}</span>
                          <span className={`ml-auto text-xs font-bold ${
                            isUnattempted ? "text-slate-400" : isCorrect ? "text-green-600" : "text-red-600"
                          }`}>
                            {isUnattempted ? "—" : isCorrect ? `+${q.marks}` : `−${q.neg}`}
                          </span>
                        </div>
                        <p
                          className="text-xs text-slate-600 mb-2 line-clamp-2 font-serif"
                          dangerouslySetInnerHTML={{ __html: q.question }}
                        />
                        {!isUnattempted && (
                          <p className="text-xs text-slate-500 mb-1">
                            Your answer:{" "}
                            <strong>{typeof userAns === "number" ? q.options[userAns] : userAns}</strong>
                          </p>
                        )}
                        <p className="text-xs text-green-700">
                          Correct: <strong>{q.options[q.correct]}</strong>
                        </p>
                        <details className="mt-2">
                          <summary className="text-xs text-blue-600 cursor-pointer">View Solution</summary>
                          <p
                            className="text-xs text-slate-600 mt-1 leading-relaxed font-serif"
                            dangerouslySetInnerHTML={{ __html: q.solution }}
                          />
                        </details>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap pb-8">
            <button
              onClick={() => {
                setAnswers({});
                setStatuses(Object.fromEntries(questions.map((_, i) => [i, "not-visited"])));
                setCurrent(0);
                setTimeLeft(EXAM_DURATION);
                setPhase("exam");
              }}
              className="px-6 py-2.5 bg-blue-700 text-white rounded font-bold text-sm hover:bg-blue-800 transition-colors"
            >
              🔁 Retake Exam
            </button>
            <Link
              href="/education/test-series/gate-pyq"
              className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              📚 Choose Another Subject
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════
  // EXAM SCREEN
  // ══════════════════════════════════════════════════════════
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100 select-none">

      {/* ── TOP HEADER ─────────────────────────────────────── */}
      <header className="bg-white border-b-2 border-slate-200 flex items-center px-3 gap-3 flex-shrink-0" style={{ height: 64 }}>
        <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-black text-xs text-center leading-tight flex-shrink-0">
          GATE<br/>2027
        </div>
        <div className="flex-1 text-center">
          <p className="text-blue-800 font-bold text-sm leading-tight">
            GRADUATE APTITUDE TEST IN ENGINEERING (GATE 2027)
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            Organizing Institute : Civil At Hand Education — Mock PYQ Series
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center text-white font-black text-xs text-center leading-tight flex-shrink-0">
          CAH<br/>EDU
        </div>
      </header>

      {/* ── DARK EXAM BAR ──────────────────────────────────── */}
      <div className="bg-[#1a1a2e] text-white flex items-center px-4 gap-3 flex-shrink-0" style={{ height: 36 }}>
        <span className="text-xs font-bold truncate">CE Civil Engineering PYQ — {subject.name}</span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setShowInstr(true)}
            className="flex items-center gap-1 border border-white/30 text-white/90 text-xs px-3 py-1 rounded hover:bg-white/10 transition-colors"
          >
            ℹ Instructions
          </button>
          <button
            onClick={() => setShowCalc((v) => !v)}
            className="flex items-center gap-1 border border-white/30 text-white/90 text-xs px-3 py-1 rounded hover:bg-white/10 transition-colors"
          >
            🧮 Calculator
          </button>
        </div>
      </div>

      {/* ── SECTION TABS ───────────────────────────────────── */}
      <div className="bg-slate-200 border-b border-slate-300 flex items-center px-3 gap-2 flex-shrink-0" style={{ height: 38 }}>
        <span className="text-xs text-slate-500">Section:</span>
        <div className="flex items-center gap-1 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded">
          {subject.short}
          <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[10px] ml-1">i</span>
        </div>
        <button
          onClick={() => setShowCalc((v) => !v)}
          className="ml-auto text-lg border border-slate-300 bg-white w-7 h-7 rounded flex items-center justify-center hover:bg-blue-50 transition-colors"
          title="Scientific Calculator"
        >
          🧮
        </button>
      </div>

      {/* ── Q NAV ARROWS ───────────────────────────────────── */}
      <div className="bg-slate-200 border-b border-slate-300 flex items-center px-3 gap-2 flex-shrink-0" style={{ height: 34 }}>
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="w-7 h-6 bg-blue-50 border border-slate-300 text-blue-700 font-bold text-xs rounded hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ◀
        </button>
        <button
          onClick={goNext}
          disabled={current === questions.length - 1}
          className="w-7 h-6 bg-blue-50 border border-slate-300 text-blue-700 font-bold text-xs rounded hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ▶
        </button>
        <span className="ml-auto text-xs text-slate-500">
          Question {current + 1} of {questions.length}
        </span>
      </div>

      {/* ── MAIN BODY ──────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: QUESTION AREA ──────────────────────────── */}
        <div
          className="flex flex-col overflow-hidden border-r border-slate-300 transition-all"
          style={{ flex: 1, minWidth: 0 }}
        >
          {/* Meta row */}
          <div className="bg-white border-b border-slate-200 flex items-center px-4 gap-4 flex-shrink-0" style={{ height: 34 }}>
            <span className="text-xs text-slate-500">
              Question Type: <strong className="text-slate-800">{q.type}</strong>
            </span>
            <span className="ml-auto text-xs text-slate-500">
              Marks for correct answer:{" "}
              <strong className="text-green-700">+{q.marks}</strong>
              {" "}|{" "}Negative Marks:{" "}
              <strong className="text-red-600">{q.neg}</strong>
            </span>
          </div>

          {/* Question content */}
          <div className="flex-1 overflow-y-auto bg-white px-5 py-4">
            {/* Year badge */}
            <div className="inline-block bg-slate-50 border border-slate-200 text-blue-700 text-xs font-bold px-2 py-0.5 rounded mb-3 uppercase tracking-wider">
              📅 {q.year}
            </div>

            <h3 className="font-bold text-slate-800 text-sm mb-3">
              Question No. {current + 1}
            </h3>

            <div
              className="text-sm text-slate-800 leading-relaxed mb-5 font-serif"
              dangerouslySetInnerHTML={{ __html: q.question }}
            />

            {/* Options */}
            {q.type === "NAT" ? (
              <input
                type="number"
                value={answers[current] as string ?? ""}
                onChange={(e) => {
                  setAnswers((a) => ({ ...a, [current]: e.target.value }));
                  setStatuses((s) => ({ ...s, [current]: "answered" }));
                }}
                placeholder="Enter numerical answer"
                className="border border-slate-300 rounded px-3 py-2 text-sm w-48 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="flex flex-col gap-2">
                {q.options.map((opt, i) => {
                  const selected = answers[current] === i;
                  return (
                    <div
                      key={i}
                      onClick={() => selectOption(i)}
                      className={`flex items-start gap-3 px-3 py-2.5 border rounded cursor-pointer transition-all ${
                        selected
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type={q.type === "MSQ" ? "checkbox" : "radio"}
                        checked={selected}
                        onChange={() => selectOption(i)}
                        className="mt-0.5 w-4 h-4 accent-blue-700 flex-shrink-0 cursor-pointer"
                      />
                      <label
                        className="text-sm text-slate-800 cursor-pointer font-serif leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: opt }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Solution */}
            <button
              onClick={() => setShowSolution((v) => !v)}
              className="mt-5 border border-green-600 text-green-700 text-xs font-bold px-4 py-1.5 rounded hover:bg-green-50 transition-colors"
            >
              {showSolution ? "🙈 Hide Solution" : "💡 Show Solution"}
            </button>

            {showSolution && (
              <div className="mt-3 bg-green-50 border border-green-200 rounded p-4">
                <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1">
                  ✅ Answer &amp; Solution
                </p>
                <p className="text-sm font-bold text-green-700 mb-2">
                  Correct Answer: {q.options[q.correct]}
                </p>
                <p
                  className="text-xs text-slate-700 leading-relaxed font-serif"
                  dangerouslySetInnerHTML={{ __html: q.solution }}
                />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="bg-white border-t border-slate-200 flex items-center px-4 py-2.5 gap-2 flex-shrink-0">
            <div className="flex gap-2">
              <button
                onClick={markForReview}
                className="px-3 py-1.5 border border-slate-400 text-slate-700 text-xs font-bold rounded hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                Mark for Review &amp; Next
              </button>
              <button
                onClick={clearResponse}
                className="px-3 py-1.5 border border-slate-400 text-slate-700 text-xs font-bold rounded hover:bg-slate-50 transition-colors"
              >
                Clear Response
              </button>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={saveAndNext}
                className="px-4 py-1.5 bg-blue-700 text-white text-xs font-bold rounded hover:bg-blue-800 transition-colors"
              >
                Save &amp; Next
              </button>
              <button
                onClick={() => setShowSubmit(true)}
                className="px-4 py-1.5 bg-green-800 text-white text-xs font-bold rounded hover:bg-green-900 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ────────────────────────────────── */}
        {sidebarOpen && (
          <div className="w-52 flex-shrink-0 flex flex-col bg-slate-50 border-l border-slate-200 overflow-hidden">
            {/* Profile */}
            <div className="bg-white border-b border-slate-200 p-3 flex items-center gap-2">
              <div className="w-10 h-10 bg-slate-300 rounded flex items-center justify-center text-xl flex-shrink-0">
                👤
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Student</p>
                <p className="text-[10px] text-slate-500">GATE CE PYQ</p>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-white border-b border-slate-200 px-3 py-2 text-center">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Time Left</p>
              <p
                className={`text-xl font-bold font-mono tracking-wider ${
                  timeLeft < 300 ? "text-red-600" : "text-slate-800"
                }`}
              >
                {fmtTime(timeLeft)}
              </p>
            </div>

            {/* Legend */}
            <div className="bg-white border-b border-slate-200 px-3 py-2 space-y-1.5">
              <LegendRow color="bg-green-600"  label="Answered"        count={counts.answered} />
              <LegendRow color="bg-red-500"    label="Not Answered"    count={counts.notAnswered} />
              <LegendRow color="bg-slate-400"  label="Not Visited"     count={counts.notVisited} />
              <LegendRow color="bg-purple-600" label="Marked for Review" count={counts.marked} />
            </div>

            {/* Palette */}
            <div className="flex-1 overflow-y-auto p-2">
              <div className="bg-blue-700 text-white text-xs font-bold px-2 py-1.5 rounded-t">
                {subject.short}
              </div>
              <p className="text-[10px] text-slate-500 py-1 px-1">Choose a Question</p>
              <div className="grid grid-cols-4 gap-1">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-9 h-9 border rounded text-xs font-bold transition-all hover:brightness-110 active:scale-95 ${paletteClass(statuses[i], i === current)}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sidebar toggle arrow */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-10 bg-blue-700 text-white text-xs font-bold rounded-l flex items-center justify-center z-20 hover:bg-blue-800 transition-colors"
          style={{ position: "fixed", right: sidebarOpen ? 208 : 0 }}
          title={sidebarOpen ? "Hide palette" : "Show palette"}
        >
          {sidebarOpen ? "›" : "‹"}
        </button>
      </div>

      {/* ── VERSION BAR ────────────────────────────────────── */}
      <div className="bg-slate-300 text-center text-[10px] text-slate-500 py-0.5 flex-shrink-0">
        Civil At Hand Education — GATE PYQ Interface v2.7.0 | Questions: IES Master Publication 1987–2025
      </div>

      {/* ══════════════════════════════════════════════════════
          MODALS
      ══════════════════════════════════════════════════════ */}

      {/* Instructions */}
      {showInstr && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowInstr(false)}
        >
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="bg-blue-700 text-white px-5 py-3 flex items-center justify-between rounded-t-lg">
              <h2 className="font-bold text-sm">General Instructions for the Examination</h2>
              <button onClick={() => setShowInstr(false)} className="text-white/80 hover:text-white text-xl font-bold">×</button>
            </div>
            <div className="p-5 text-sm leading-relaxed text-slate-700 space-y-4">
              <div>
                <h3 className="font-bold text-blue-700 text-xs uppercase mb-2">Question Types</h3>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>MCQ:</strong> One correct answer. Negative marking applies.</li>
                  <li><strong>MSQ:</strong> One or more correct answers. No negative marking.</li>
                  <li><strong>NAT:</strong> Type a numerical answer. No negative marking.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-700 text-xs uppercase mb-2">Marking Scheme</h3>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li>1-mark MCQ: +1 correct, −1/3 wrong</li>
                  <li>2-mark MCQ: +2 correct, −2/3 wrong</li>
                  <li>NAT / MSQ: No negative marking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-700 text-xs uppercase mb-2">Colour Legend</h3>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><span className="text-green-700 font-bold">Green:</span> Answered</li>
                  <li><span className="text-red-600 font-bold">Red:</span> Visited but not answered</li>
                  <li><span className="text-slate-500 font-bold">Grey:</span> Not yet visited</li>
                  <li><span className="text-purple-700 font-bold">Purple:</span> Marked for Review</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-700 text-xs uppercase mb-2">Navigation</h3>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li>Click <strong>Save &amp; Next</strong> to record answer and move forward.</li>
                  <li>Click <strong>Mark for Review &amp; Next</strong> to flag and move on.</li>
                  <li>Click any palette number to jump directly to that question.</li>
                  <li>Click <strong>Submit</strong> when done.</li>
                </ul>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowInstr(false)}
                className="bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded hover:bg-blue-800 transition-colors"
              >
                I Have Read the Instructions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirm */}
      {showSubmit && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowSubmit(false)}
        >
          <div className="bg-white rounded-lg w-full max-w-sm shadow-2xl">
            <div className="bg-green-800 text-white px-5 py-3 flex items-center justify-between rounded-t-lg">
              <h2 className="font-bold text-sm">Submit Examination?</h2>
              <button onClick={() => setShowSubmit(false)} className="text-white/80 hover:text-white text-xl font-bold">×</button>
            </div>
            <div className="p-5">
              <p className="text-xs text-slate-600 mb-4">Please review your attempt summary before submitting:</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Answered",    val: counts.answered,    color: "text-green-600" },
                  { label: "Not Answered",val: counts.notAnswered, color: "text-red-600" },
                  { label: "Marked",      val: counts.marked,      color: "text-purple-600" },
                  { label: "Not Visited", val: counts.notVisited,  color: "text-slate-500" },
                ].map(({ label, val, color }) => (
                  <div key={label} className="border border-slate-200 rounded p-3 text-center">
                    <div className={`text-2xl font-bold ${color}`}>{val}</div>
                    <div className="text-xs text-slate-500 font-semibold">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-600 mb-4">
                ⚠ Once submitted, you cannot change your answers.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowSubmit(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded hover:bg-slate-50 transition-colors"
                >
                  Return to Exam
                </button>
                <button
                  onClick={() => handleSubmit(false)}
                  className="px-5 py-2 bg-blue-700 text-white text-xs font-bold rounded hover:bg-blue-800 transition-colors"
                >
                  Yes, Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scientific Calculator */}
      {showCalc && <ScientificCalculator onClose={() => setShowCalc(false)} />}
    </div>
  );
}
