"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/components/testseries/ExamRunner.tsx
// ============================================================
// ONE exam engine for the whole platform. Both the subject-wise
// PYQ pages and the full-length test pages render this component
// and just pass it a list of questions + a config. No exam logic
// is duplicated anywhere else.
//
// Features: timer, question palette, mark-for-review, MCQ / MSQ /
// NAT support, per-question or uniform marks, negative marking,
// scientific calculator, instant solutions, full result review,
// and a fully responsive layout (phone + tablet + desktop).
// ============================================================

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import ScientificCalculator from "@/components/gate/ScientificCalculator";

// ─── Question shape (matches src/data/gate/questions.ts) ──────
export interface ExamQuestion {
  id: number;
  type: "MCQ" | "MSQ" | "NAT";
  marks: 1 | 2;
  neg: string;            // "1/3" | "2/3" | "1/4" | "1" | "0"
  year: string;
  question: string;       // HTML allowed
  options: string[];
  correct: number;
  natAnswer?: string;
  solution: string;
  sectionLabel?: string;  // shown on full-length tests
}

export interface ExamRunnerProps {
  questions: ExamQuestion[];
  examTitle: string;       // big header line, e.g. "GATE CE — Full Length Test 1"
  examSubtitle: string;    // small line under it
  paperLabel: string;      // dark bar label, e.g. "Civil Engineering · 65 Q"
  durationSec: number;
  backHref: string;        // where "choose another" returns to
  backLabel: string;
  notice?: string;         // optional yellow banner (e.g. bank incomplete)
}

type QStatus = "not-visited" | "not-answered" | "answered" | "marked" | "answered-marked";

function fmtTime(sec: number) {
  const h = Math.floor(sec / 3600).toString().padStart(2, "0");
  const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function negValue(neg: string): number {
  if (!neg || neg === "0") return 0;
  const [a, b] = neg.split("/");
  return parseFloat(a) / (parseFloat(b) || 1);
}

function natCorrect(q: ExamQuestion, ans: string): boolean {
  if (q.natAnswer === undefined) return false;
  const u = parseFloat(ans);
  const c = parseFloat(q.natAnswer);
  if (Number.isNaN(u) || Number.isNaN(c)) return ans.trim() === q.natAnswer.trim();
  return Math.abs(u - c) <= Math.max(0.01, Math.abs(c) * 0.01); // 1% tolerance
}

function paletteClass(status: QStatus, isCurrent: boolean) {
  if (isCurrent) return "bg-orange-500 border-orange-600 text-white";
  if (status === "answered") return "bg-green-600 border-green-700 text-white";
  if (status === "marked") return "bg-purple-600 border-purple-700 text-white";
  if (status === "answered-marked") return "bg-purple-600 border-green-500 text-white border-2";
  if (status === "not-answered") return "bg-red-500 border-red-600 text-white";
  return "bg-slate-300 border-slate-400 text-slate-700";
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

export default function ExamRunner({
  questions, examTitle, examSubtitle, paperLabel,
  durationSec, backHref, backLabel, notice,
}: ExamRunnerProps) {
  const [phase, setPhase] = useState<"exam" | "result">("exam");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [statuses, setStatuses] = useState<Record<number, QStatus>>(() =>
    Object.fromEntries(questions.map((_, i) => [i, "not-visited"]))
  );
  const [showSolution, setShowSolution] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [showInstr, setShowInstr] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showPalette, setShowPalette] = useState(false); // mobile drawer
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [scoreData, setScoreData] = useState({
    score: 0, maxScore: 0, correct: 0, wrong: 0, unattempted: 0, marked: 0,
  });

  const handleSubmit = useCallback((/* auto */) => {
    if (timerRef.current) clearInterval(timerRef.current);
    let score = 0, maxScore = 0, correct = 0, wrong = 0, unattempted = 0;
    questions.forEach((q, i) => {
      maxScore += q.marks;
      const ans = answers[i];
      const attempted = !(ans === undefined || (typeof ans === "string" && ans.trim() === ""));
      if (!attempted) { unattempted++; return; }
      const isRight = q.type === "NAT"
        ? natCorrect(q, String(ans))
        : typeof ans === "number" && ans === q.correct;
      if (isRight) { correct++; score += q.marks; }
      else { wrong++; score -= negValue(q.neg) * q.marks; }
    });
    score = Math.max(0, score);
    const marked = Object.values(statuses).filter((s) => s === "marked" || s === "answered-marked").length;
    setScoreData({ score, maxScore, correct, wrong, unattempted, marked });
    setShowSubmit(false);
    setPhase("result");
  }, [answers, questions, statuses]);

  // timer
  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { if (timerRef.current) clearInterval(timerRef.current); handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, handleSubmit]);

  // mark visited
  useEffect(() => {
    setStatuses((prev) => prev[current] === "not-visited" ? { ...prev, [current]: "not-answered" } : prev);
    setShowSolution(false);
  }, [current]);

  const counts = {
    answered: Object.values(statuses).filter((s) => s === "answered").length,
    notAnswered: Object.values(statuses).filter((s) => s === "not-answered").length,
    notVisited: Object.values(statuses).filter((s) => s === "not-visited").length,
    marked: Object.values(statuses).filter((s) => s === "marked" || s === "answered-marked").length,
  };

  const selectOption = (idx: number) => {
    setAnswers((a) => ({ ...a, [current]: idx }));
    setStatuses((s) => {
      const prev = s[current];
      return { ...s, [current]: prev === "marked" || prev === "answered-marked" ? "answered-marked" : "answered" };
    });
  };

  const clearResponse = () => {
    setAnswers((a) => { const n = { ...a }; delete n[current]; return n; });
    setStatuses((s) => ({ ...s, [current]: "not-answered" }));
  };

  const markForReview = () => {
    setStatuses((s) => {
      const prev = s[current];
      return { ...s, [current]: (prev === "answered" || prev === "answered-marked") ? "answered-marked" : "marked" };
    });
    goNext();
  };

  const goNext = () => setCurrent((c) => Math.min(c + 1, questions.length - 1));
  const goPrev = () => setCurrent((c) => Math.max(c - 1, 0));
  const goTo = (i: number) => { setCurrent(i); setShowPalette(false); };

  const q = questions[current];

  if (!q) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-sm">
          <p className="text-lg font-bold text-slate-700 mb-2">No questions available yet</p>
          <p className="text-sm text-slate-500 mb-4">This test&apos;s question bank is still being added.</p>
          <Link href={backHref} className="text-orange-600 underline text-sm font-bold">{backLabel}</Link>
        </div>
      </div>
    );
  }

  // ══════════════════ RESULT ══════════════════
  if (phase === "result") {
    const pct = scoreData.maxScore ? Math.round((scoreData.score / scoreData.maxScore) * 100) : 0;
    const grade = pct >= 70 ? "Excellent" : pct >= 50 ? "Good Attempt" : "Keep Practicing";
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="bg-[#0f2244] text-white px-4 sm:px-6 py-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="Civil At Hand" className="w-10 h-10 rounded object-cover bg-white/10" />
          <div>
            <h1 className="font-bold text-base sm:text-lg leading-tight">Result — {examTitle}</h1>
            <p className="text-white/70 text-xs">{examSubtitle} · Civil At Hand Education</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-5">
          <div className="bg-white rounded-lg border border-slate-200 p-6 text-center shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Your Score</p>
            <div className="text-5xl sm:text-6xl font-bold text-orange-500">{scoreData.score.toFixed(2)}</div>
            <div className="text-slate-400 text-lg sm:text-xl">/ {scoreData.maxScore}</div>
            <div className="text-slate-600 text-sm mt-1">{pct}% — {grade}</div>
            <div className="mt-4 h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Correct", val: scoreData.correct, color: "text-green-600" },
              { label: "Wrong", val: scoreData.wrong, color: "text-red-600" },
              { label: "Unattempted", val: scoreData.unattempted, color: "text-slate-500" },
              { label: "Marked", val: scoreData.marked, color: "text-purple-600" },
            ].map(({ label, val, color }) => (
              <div key={label} className="bg-white rounded-lg border border-slate-200 p-4 text-center shadow-sm">
                <div className={`text-3xl font-bold ${color}`}>{val}</div>
                <div className="text-xs text-slate-500 font-semibold uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Answer Key &amp; Detailed Review</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {questions.map((qq, i) => {
                const userAns = answers[i];
                const attempted = !(userAns === undefined || (typeof userAns === "string" && userAns.trim() === ""));
                const isCorrect = qq.type === "NAT"
                  ? attempted && natCorrect(qq, String(userAns))
                  : typeof userAns === "number" && userAns === qq.correct;
                return (
                  <div key={i} className={`px-4 sm:px-5 py-4 border-l-4 ${!attempted ? "border-slate-300" : isCorrect ? "border-green-500" : "border-red-500"}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">{!attempted ? "⬜" : isCorrect ? "✅" : "❌"}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-bold text-sm text-slate-800">Q{i + 1}</span>
                          {qq.sectionLabel && <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{qq.sectionLabel}</span>}
                          <span className="text-xs text-slate-400">{qq.year}</span>
                          <span className={`ml-auto text-xs font-bold ${!attempted ? "text-slate-400" : isCorrect ? "text-green-600" : "text-red-600"}`}>
                            {!attempted ? "—" : isCorrect ? `+${qq.marks}` : `−${(negValue(qq.neg) * qq.marks).toFixed(2)}`}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mb-2 font-serif" dangerouslySetInnerHTML={{ __html: qq.question }} />
                        {attempted && (
                          <p className="text-xs text-slate-500 mb-1">
                            Your answer: <strong>{typeof userAns === "number" ? qq.options[userAns] : String(userAns)}</strong>
                          </p>
                        )}
                        <p className="text-xs text-green-700">
                          Correct: <strong>{qq.type === "NAT" ? qq.natAnswer : qq.options[qq.correct]}</strong>
                        </p>
                        <details className="mt-2">
                          <summary className="text-xs text-orange-600 cursor-pointer font-bold">View Solution</summary>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-serif" dangerouslySetInnerHTML={{ __html: qq.solution }} />
                        </details>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 flex-wrap pb-8">
            <button
              onClick={() => {
                setAnswers({});
                setStatuses(Object.fromEntries(questions.map((_, i) => [i, "not-visited"])));
                setCurrent(0); setTimeLeft(durationSec); setPhase("exam");
              }}
              className="px-6 py-2.5 bg-orange-500 text-white rounded font-bold text-sm hover:bg-orange-600 transition-colors"
            >
              Retake Test
            </button>
            <Link href={backHref} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded font-bold text-sm hover:bg-slate-50 transition-colors">
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════ EXAM ══════════════════
  const PaletteBody = (
    <>
      <div className="bg-white border-b border-slate-200 px-3 py-2 text-center">
        <p className="text-[10px] text-slate-500 font-semibold uppercase">Time Left</p>
        <p className={`text-xl font-bold font-mono tracking-wider ${timeLeft < 300 ? "text-red-600" : "text-slate-800"}`}>{fmtTime(timeLeft)}</p>
      </div>
      <div className="bg-white border-b border-slate-200 px-3 py-2 space-y-1.5">
        <LegendRow color="bg-green-600" label="Answered" count={counts.answered} />
        <LegendRow color="bg-red-500" label="Not Answered" count={counts.notAnswered} />
        <LegendRow color="bg-slate-300" label="Not Visited" count={counts.notVisited} />
        <LegendRow color="bg-purple-600" label="Marked for Review" count={counts.marked} />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <p className="text-[10px] text-slate-500 py-1 px-1">Choose a Question</p>
        <div className="grid grid-cols-5 sm:grid-cols-4 gap-1.5">
          {questions.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`h-9 border rounded text-xs font-bold transition-all hover:brightness-110 active:scale-95 ${paletteClass(statuses[i], i === current)}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-slate-100 select-none">
      {/* HEADER */}
      <header className="bg-white border-b-2 border-slate-200 flex items-center px-3 gap-3 flex-shrink-0" style={{ height: 60 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.jpg" alt="Civil At Hand" className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-slate-200" />
        <div className="flex-1 text-center min-w-0">
          <p className="text-[#0f2244] font-bold text-xs sm:text-sm leading-tight truncate">{examTitle}</p>
          <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 truncate">{examSubtitle}</p>
        </div>
        <div className="hidden sm:flex w-10 h-10 rounded-full bg-orange-500 items-center justify-center text-white font-black text-[9px] text-center leading-tight flex-shrink-0">CAH<br />EDU</div>
      </header>

      {/* DARK BAR */}
      <div className="bg-[#0f2244] text-white flex items-center px-3 gap-2 flex-shrink-0" style={{ height: 38 }}>
        <span className="text-xs font-bold truncate">{paperLabel}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={() => setShowInstr(true)} className="border border-white/30 text-white/90 text-[11px] px-2.5 py-1 rounded hover:bg-white/10 transition-colors">ℹ <span className="hidden sm:inline">Instructions</span></button>
          <button onClick={() => setShowCalc((v) => !v)} className="border border-white/30 text-white/90 text-[11px] px-2.5 py-1 rounded hover:bg-white/10 transition-colors">🧮 <span className="hidden sm:inline">Calc</span></button>
          <button onClick={() => setShowPalette(true)} className="lg:hidden border border-white/30 text-white/90 text-[11px] px-2.5 py-1 rounded hover:bg-white/10 transition-colors">☰ Palette</button>
        </div>
      </div>

      {/* NAV ARROWS */}
      <div className="bg-slate-200 border-b border-slate-300 flex items-center px-3 gap-2 flex-shrink-0" style={{ height: 34 }}>
        <button onClick={goPrev} disabled={current === 0} className="w-7 h-6 bg-white border border-slate-300 text-[#0f2244] font-bold text-xs rounded hover:bg-blue-50 disabled:opacity-40 transition-colors">◀</button>
        <button onClick={goNext} disabled={current === questions.length - 1} className="w-7 h-6 bg-white border border-slate-300 text-[#0f2244] font-bold text-xs rounded hover:bg-blue-50 disabled:opacity-40 transition-colors">▶</button>
        {q.sectionLabel && <span className="text-[11px] font-bold text-[#0f2244] bg-white px-2 py-0.5 rounded truncate max-w-[45%]">{q.sectionLabel}</span>}
        <span className="ml-auto text-xs text-slate-500 whitespace-nowrap">Q {current + 1} / {questions.length}</span>
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col overflow-hidden flex-1 min-w-0">
          <div className="bg-white border-b border-slate-200 flex items-center px-4 gap-3 flex-shrink-0 text-[11px] sm:text-xs" style={{ minHeight: 32 }}>
            <span className="text-slate-500">Type: <strong className="text-slate-800">{q.type}</strong></span>
            <span className="ml-auto text-slate-500 text-right">
              <strong className="text-green-700">+{q.marks}</strong> | Neg: <strong className="text-red-600">{q.neg}</strong>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto bg-white px-4 sm:px-5 py-4">
            <div className="inline-block bg-slate-50 border border-slate-200 text-[#0f2244] text-[11px] font-bold px-2 py-0.5 rounded mb-3 uppercase tracking-wider">📅 {q.year}</div>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Question No. {current + 1}</h3>
            <div className="text-sm text-slate-800 leading-relaxed mb-5 font-serif" dangerouslySetInnerHTML={{ __html: q.question }} />

            {q.type === "NAT" ? (
              <input
                type="text" inputMode="decimal"
                value={(answers[current] as string) ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setAnswers((a) => ({ ...a, [current]: v }));
                  setStatuses((s) => ({ ...s, [current]: v.trim() ? "answered" : "not-answered" }));
                }}
                placeholder="Enter numerical answer"
                className="border border-slate-300 rounded px-3 py-2 text-sm w-full sm:w-56 focus:outline-none focus:border-orange-500"
              />
            ) : (
              <div className="flex flex-col gap-2">
                {q.options.map((opt, i) => {
                  const selected = answers[current] === i;
                  return (
                    <div key={i} onClick={() => selectOption(i)}
                      className={`flex items-start gap-3 px-3 py-2.5 border rounded cursor-pointer transition-all ${selected ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-white hover:border-orange-300 hover:bg-slate-50"}`}>
                      <input type={q.type === "MSQ" ? "checkbox" : "radio"} checked={selected} onChange={() => selectOption(i)} className="mt-0.5 w-4 h-4 accent-orange-500 flex-shrink-0 cursor-pointer" />
                      <label className="text-sm text-slate-800 cursor-pointer font-serif leading-relaxed" dangerouslySetInnerHTML={{ __html: opt }} />
                    </div>
                  );
                })}
              </div>
            )}

            <button onClick={() => setShowSolution((v) => !v)} className="mt-5 border border-green-600 text-green-700 text-xs font-bold px-4 py-1.5 rounded hover:bg-green-50 transition-colors">
              {showSolution ? "🙈 Hide Solution" : "💡 Show Solution"}
            </button>
            {showSolution && (
              <div className="mt-3 bg-green-50 border border-green-200 rounded p-4">
                <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1">✅ Answer &amp; Solution</p>
                <p className="text-sm font-bold text-green-700 mb-2">Correct Answer: {q.type === "NAT" ? q.natAnswer : q.options[q.correct]}</p>
                <p className="text-xs text-slate-700 leading-relaxed font-serif" dangerouslySetInnerHTML={{ __html: q.solution }} />
              </div>
            )}
          </div>

          <div className="bg-white border-t border-slate-200 flex items-center px-3 py-2.5 gap-2 flex-shrink-0 flex-wrap">
            <button onClick={markForReview} className="px-3 py-1.5 border border-slate-400 text-slate-700 text-[11px] sm:text-xs font-bold rounded hover:bg-slate-50 transition-colors whitespace-nowrap">Mark &amp; Next</button>
            <button onClick={clearResponse} className="px-3 py-1.5 border border-slate-400 text-slate-700 text-[11px] sm:text-xs font-bold rounded hover:bg-slate-50 transition-colors">Clear</button>
            <div className="ml-auto flex gap-2">
              <button onClick={goNext} className="px-4 py-1.5 bg-[#0f2244] text-white text-[11px] sm:text-xs font-bold rounded hover:bg-[#16345f] transition-colors">Save &amp; Next</button>
              <button onClick={() => setShowSubmit(true)} className="px-4 py-1.5 bg-green-700 text-white text-[11px] sm:text-xs font-bold rounded hover:bg-green-800 transition-colors">Submit</button>
            </div>
          </div>
        </div>

        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:flex w-56 flex-shrink-0 flex-col bg-slate-50 border-l border-slate-200 overflow-hidden">
          {PaletteBody}
        </div>
      </div>

      {/* FOOTER (copyright-clean — Civil At Hand branding only) */}
      <div className="bg-slate-200 text-center text-[10px] text-slate-500 py-0.5 flex-shrink-0">
        Civil At Hand Education — Test Series · Original practice content
      </div>

      {/* MOBILE PALETTE DRAWER */}
      {showPalette && (
        <div className="lg:hidden fixed inset-0 z-40 flex" onClick={(e) => e.target === e.currentTarget && setShowPalette(false)}>
          <div className="ml-auto w-64 max-w-[80%] h-full bg-slate-50 flex flex-col shadow-2xl">
            <div className="bg-[#0f2244] text-white px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-bold">Question Palette</span>
              <button onClick={() => setShowPalette(false)} className="text-white/80 text-xl font-bold leading-none">×</button>
            </div>
            {PaletteBody}
          </div>
        </div>
      )}

      {/* NOTICE */}
      {notice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-yellow-50 border border-yellow-300 text-yellow-800 text-[11px] font-medium px-4 py-2 rounded-md shadow max-w-[90%] text-center">
          {notice}
        </div>
      )}

      {/* INSTRUCTIONS */}
      {showInstr && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setShowInstr(false)}>
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="bg-[#0f2244] text-white px-5 py-3 flex items-center justify-between rounded-t-lg">
              <h2 className="font-bold text-sm">General Instructions</h2>
              <button onClick={() => setShowInstr(false)} className="text-white/80 hover:text-white text-xl font-bold">×</button>
            </div>
            <div className="p-5 text-sm leading-relaxed text-slate-700 space-y-4">
              <div>
                <h3 className="font-bold text-[#0f2244] text-xs uppercase mb-2">Question Types</h3>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>MCQ:</strong> One correct answer. Negative marking applies.</li>
                  <li><strong>MSQ:</strong> One or more correct answers. No negative marking.</li>
                  <li><strong>NAT:</strong> Type a numerical answer. No negative marking.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#0f2244] text-xs uppercase mb-2">Colour Legend</h3>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><span className="text-green-700 font-bold">Green:</span> Answered</li>
                  <li><span className="text-red-600 font-bold">Red:</span> Visited, not answered</li>
                  <li><span className="text-slate-500 font-bold">Grey:</span> Not visited</li>
                  <li><span className="text-purple-700 font-bold">Purple:</span> Marked for review</li>
                </ul>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-slate-200 flex justify-end">
              <button onClick={() => setShowInstr(false)} className="bg-[#0f2244] text-white text-xs font-bold px-5 py-2 rounded hover:bg-[#16345f] transition-colors">I Understand</button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT CONFIRM */}
      {showSubmit && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setShowSubmit(false)}>
          <div className="bg-white rounded-lg w-full max-w-sm shadow-2xl">
            <div className="bg-green-700 text-white px-5 py-3 flex items-center justify-between rounded-t-lg">
              <h2 className="font-bold text-sm">Submit Test?</h2>
              <button onClick={() => setShowSubmit(false)} className="text-white/80 hover:text-white text-xl font-bold">×</button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Answered", val: counts.answered, color: "text-green-600" },
                  { label: "Not Answered", val: counts.notAnswered, color: "text-red-600" },
                  { label: "Marked", val: counts.marked, color: "text-purple-600" },
                  { label: "Not Visited", val: counts.notVisited, color: "text-slate-500" },
                ].map(({ label, val, color }) => (
                  <div key={label} className="border border-slate-200 rounded p-3 text-center">
                    <div className={`text-2xl font-bold ${color}`}>{val}</div>
                    <div className="text-xs text-slate-500 font-semibold">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-600 mb-4">⚠ Once submitted, you cannot change your answers.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowSubmit(false)} className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded hover:bg-slate-50 transition-colors">Return</button>
                <button onClick={() => handleSubmit()} className="px-5 py-2 bg-[#0f2244] text-white text-xs font-bold rounded hover:bg-[#16345f] transition-colors">Yes, Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCalc && <ScientificCalculator onClose={() => setShowCalc(false)} />}
    </div>
  );
}
