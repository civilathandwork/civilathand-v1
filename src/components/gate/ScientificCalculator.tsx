"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/components/gate/ScientificCalculator.tsx
// ============================================================

import React, { useState, useRef, useEffect, useCallback } from "react";

interface Props {
  onClose: () => void;
}

export default function ScientificCalculator({ onClose }: Props) {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr]     = useState("");
  const [memory, setMemory] = useState(0);
  const [isDeg, setIsDeg]   = useState(true);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos]   = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const calcRef = useRef<HTMLDivElement>(null);
  const strRef  = useRef(""); // current entry string

  // ── drag ──────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    if (!calcRef.current) return;
    const rect = calcRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDragging(true);
    e.preventDefault();
  };
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragging) return;
      setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [dragging, offset]);

  // ── helpers ────────────────────────────────────────────────
  const toRad  = (v: number) => isDeg ? v * Math.PI / 180 : v;
  const fromRad = (v: number) => isDeg ? v * 180 / Math.PI : v;

  const push = useCallback((ch: string) => {
    if (strRef.current === "0" && ch !== ".") strRef.current = "";
    if (ch === "π") strRef.current += String(Math.PI);
    else strRef.current += ch;
    setDisplay(strRef.current || "0");
  }, []);

  const clear = () => { strRef.current = ""; setDisplay("0"); setExpr(""); };

  const backspace = () => {
    strRef.current = strRef.current.slice(0, -1);
    setDisplay(strRef.current || "0");
  };

  const evaluate = () => {
    try {
      const raw = strRef.current.replace(/π/g, String(Math.PI)).replace(/[×÷]/g, m => m === "×" ? "*" : "/");
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${raw})`)() as number;
      setExpr(strRef.current + " =");
      const rounded = parseFloat(result.toFixed(10));
      strRef.current = String(rounded);
      setDisplay(strRef.current);
    } catch {
      setDisplay("Error");
      strRef.current = "";
    }
  };

  const applyFn = (fn: string) => {
    const v = parseFloat(strRef.current) || 0;
    let r: number;
    switch (fn) {
      case "sin":   r = Math.sin(toRad(v)); break;
      case "cos":   r = Math.cos(toRad(v)); break;
      case "tan":   r = Math.tan(toRad(v)); break;
      case "asin":  r = fromRad(Math.asin(v)); break;
      case "acos":  r = fromRad(Math.acos(v)); break;
      case "atan":  r = fromRad(Math.atan(v)); break;
      case "sinh":  r = Math.sinh(v); break;
      case "cosh":  r = Math.cosh(v); break;
      case "tanh":  r = Math.tanh(v); break;
      case "asinh": r = Math.asinh(v); break;
      case "acosh": r = Math.acosh(v); break;
      case "atanh": r = Math.atanh(v); break;
      case "log":   r = Math.log10(v); break;
      case "ln":    r = Math.log(v); break;
      case "x2":    r = v * v; break;
      case "x3":    r = v * v * v; break;
      case "sqrt":  r = Math.sqrt(v); break;
      case "pow10": r = Math.pow(10, v); break;
      case "epow":  r = Math.exp(v); break;
      case "fact":  r = factorial(Math.floor(v)); break;
      case "pm":    r = -v; break;
      case "abs":   r = Math.abs(v); break;
      case "recip": r = 1 / v; break;
      default: return;
    }
    strRef.current = String(parseFloat(r.toFixed(10)));
    setDisplay(strRef.current);
  };

  const memOp = (cmd: string) => {
    const v = parseFloat(strRef.current) || 0;
    if (cmd === "MC") setMemory(0);
    else if (cmd === "MR") { strRef.current = String(memory); setDisplay(strRef.current); }
    else if (cmd === "MS") setMemory(v);
    else if (cmd === "M+") setMemory(m => m + v);
    else if (cmd === "M-") setMemory(m => m - v);
  };

  const style: React.CSSProperties = pos.x || pos.y
    ? { position: "fixed", left: pos.x, top: pos.y, zIndex: 9999, right: "auto", bottom: "auto" }
    : { position: "fixed", left: "50%", top: 70, transform: "translateX(-50%)", zIndex: 9999 };

  // ── button renderer ────────────────────────────────────────
  const Btn = ({
    label, onClick, variant = "sci", span = 1
  }: {
    label: string; onClick: () => void; variant?: "sci"|"num"|"op"|"red"|"orange"|"green"|"mem"; span?: number;
  }) => {
    const base = "flex items-center justify-center rounded border text-xs font-semibold h-7 cursor-pointer select-none transition-colors active:scale-95";
    const variants: Record<string, string> = {
      sci:    "bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100",
      num:    "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 text-sm font-bold",
      op:     "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100 font-bold",
      red:    "bg-red-500 border-red-600 text-white hover:bg-red-600 font-bold",
      orange: "bg-orange-400 border-orange-500 text-white hover:bg-orange-500",
      green:  "bg-green-700 border-green-800 text-white hover:bg-green-800 font-bold text-sm",
      mem:    "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 text-[10px]",
    };
    return (
      <button
        onClick={onClick}
        style={{ gridColumn: span > 1 ? `span ${span}` : undefined }}
        className={`${base} ${variants[variant]}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      ref={calcRef}
      style={{ ...style, width: "min(380px, calc(100vw - 16px))", maxWidth: "calc(100vw - 16px)", maxHeight: "90vh", overflowY: "auto" }}
      className="bg-white rounded shadow-2xl border border-slate-300"
    >
      {/* Title bar */}
      <div
        onMouseDown={onMouseDown}
        className="flex items-center justify-between px-3 py-2 bg-blue-700 text-white rounded-t cursor-move select-none"
      >
        <span className="text-sm font-bold">Scientific Calculator</span>
        <div className="flex items-center gap-1.5">
          <button className="w-5 h-5 rounded bg-white/20 hover:bg-white/35 text-xs flex items-center justify-center">?</button>
          <button className="w-5 h-5 rounded bg-white/20 hover:bg-white/35 text-xs flex items-center justify-center" onClick={onClose}>—</button>
          <button className="w-5 h-5 rounded bg-white/20 hover:bg-white/35 text-xs flex items-center justify-center" onClick={onClose}>✕</button>
        </div>
      </div>

      {/* Display */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2">
        <div className="text-xs text-slate-400 text-right min-h-[16px] font-mono">{expr}</div>
        <div className="text-xl font-bold text-right text-slate-900 font-mono min-h-[28px] break-all">{display}</div>
      </div>

      {/* Buttons */}
      <div className="p-2 flex flex-col gap-1.5">

        {/* Deg/Rad + Memory */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="dr" checked={isDeg} onChange={() => setIsDeg(true)} className="w-3 h-3" /> Deg
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="dr" checked={!isDeg} onChange={() => setIsDeg(false)} className="w-3 h-3" /> Rad
            </label>
          </div>
          <div className="grid grid-cols-5 gap-1 ml-auto flex-1">
            {["MC","MR","MS","M+","M-"].map(m => (
              <Btn key={m} label={m} onClick={() => memOp(m)} variant="mem" />
            ))}
          </div>
        </div>

        {/* Row 1 — hyp + backspace/clear */}
        <div className="grid grid-cols-10 gap-1">
          <Btn label="sinh"   onClick={() => applyFn("sinh")}  variant="sci" />
          <Btn label="cosh"   onClick={() => applyFn("cosh")}  variant="sci" />
          <Btn label="tanh"   onClick={() => applyFn("tanh")}  variant="sci" />
          <Btn label="Exp"    onClick={() => push("e")}         variant="sci" />
          <Btn label="("      onClick={() => push("(")}         variant="op"  />
          <Btn label=")"      onClick={() => push(")")}         variant="op"  />
          <Btn label="←"      onClick={backspace}               variant="orange" />
          <Btn label="C"      onClick={clear}                   variant="red" />
          <Btn label="+/−"    onClick={() => applyFn("pm")}     variant="sci" />
          <Btn label="√x"     onClick={() => applyFn("sqrt")}   variant="sci" />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-10 gap-1">
          <Btn label="sinh⁻¹" onClick={() => applyFn("asinh")} variant="sci" />
          <Btn label="cosh⁻¹" onClick={() => applyFn("acosh")} variant="sci" />
          <Btn label="tanh⁻¹" onClick={() => applyFn("atanh")} variant="sci" />
          <Btn label="logₓ"   onClick={() => applyFn("log")}   variant="sci" />
          <Btn label="ln"     onClick={() => applyFn("ln")}    variant="sci" />
          <Btn label="log"    onClick={() => applyFn("log")}   variant="sci" />
          <Btn label="7"      onClick={() => push("7")}         variant="num" />
          <Btn label="8"      onClick={() => push("8")}         variant="num" />
          <Btn label="9"      onClick={() => push("9")}         variant="num" />
          <Btn label="÷"      onClick={() => push("/")}         variant="op"  />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-10 gap-1">
          <Btn label="π"      onClick={() => push("π")}         variant="sci" />
          <Btn label="e"      onClick={() => push("2.718281828")} variant="sci" />
          <Btn label="n!"     onClick={() => applyFn("fact")}   variant="sci" />
          <Btn label="logᵧ"   onClick={() => applyFn("log")}   variant="sci" />
          <Btn label="eˣ"     onClick={() => applyFn("epow")}   variant="sci" />
          <Btn label="10ˣ"    onClick={() => applyFn("pow10")}  variant="sci" />
          <Btn label="4"      onClick={() => push("4")}          variant="num" />
          <Btn label="5"      onClick={() => push("5")}          variant="num" />
          <Btn label="6"      onClick={() => push("6")}          variant="num" />
          <Btn label="×"      onClick={() => push("*")}          variant="op"  />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-10 gap-1">
          <Btn label="sin"    onClick={() => applyFn("sin")}    variant="sci" />
          <Btn label="cos"    onClick={() => applyFn("cos")}    variant="sci" />
          <Btn label="tan"    onClick={() => applyFn("tan")}    variant="sci" />
          <Btn label="xʸ"     onClick={() => push("**")}         variant="sci" />
          <Btn label="x³"     onClick={() => applyFn("x3")}    variant="sci" />
          <Btn label="x²"     onClick={() => applyFn("x2")}    variant="sci" />
          <Btn label="1"      onClick={() => push("1")}          variant="num" />
          <Btn label="2"      onClick={() => push("2")}          variant="num" />
          <Btn label="3"      onClick={() => push("3")}          variant="num" />
          <Btn label="−"      onClick={() => push("-")}          variant="op"  />
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-10 gap-1">
          <Btn label="sin⁻¹"  onClick={() => applyFn("asin")}  variant="sci" />
          <Btn label="cos⁻¹"  onClick={() => applyFn("acos")}  variant="sci" />
          <Btn label="tan⁻¹"  onClick={() => applyFn("atan")}  variant="sci" />
          <Btn label="ʸ√x"    onClick={() => applyFn("sqrt")}  variant="sci" />
          <Btn label="|x|"    onClick={() => applyFn("abs")}   variant="sci" />
          <Btn label="0"      onClick={() => push("0")}          variant="num" />
          <Btn label="."      onClick={() => push(".")}          variant="num" />
          <Btn label="%"      onClick={() => push("%")}          variant="op"  />
          <Btn label="+"      onClick={() => push("+")}          variant="op"  />
          <Btn label="="      onClick={evaluate}                 variant="green" />
        </div>
      </div>
    </div>
  );
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
