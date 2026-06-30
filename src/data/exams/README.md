# 📘 Test Series Guide — How to Add Questions & Tests

This file is **only a guide**. It does not change the website. Keep it here so anyone
who opens this folder understands how the test series works and can add questions easily.

---

## 1. Where everything lives

```
src/data/exams/
├── types.ts            ← do NOT edit (the rules of a question)
├── registry.ts         ← do NOT edit (lists the 3 exams)
│
├── gate/
│   ├── index.ts        ← lists GATE tests (edit only to add a new test)
│   └── test-1.ts       ← GATE Test 1 questions   ✏️ YOU EDIT THIS
│
└── ssc/
    ├── index.ts        ← lists SSC tests (edit only to add a new test)
    └── test-1.ts       ← SSC-JE Test 1 questions ✏️ YOU EDIT THIS
```

👉 **To add or change questions, you only ever open a `test-1.ts` (or `test-2.ts`) file.**
Everything else can be left alone.

> ESE has no test files yet — it shows **"Coming Soon"** on the website. When you are
> ready, make `src/data/exams/ese/test-1.ts` + `index.ts` the same way as GATE/SSC.

---

## 2. The 5 golden rules (very important)

1. Every question is a **block inside `{ }`** and ends with a **comma `,`**.
2. Every question needs a **different `id` number** (1, 2, 3 …) inside the same file.
3. Text always sits **inside double quotes** `"like this"`.
4. `correct` counts from **0**: (a)=0, (b)=1, (c)=2, (d)=3.
5. Use **straight quotes** `"` — not curly “smart quotes”. (If you copy from Word, retype the quotes.)

That's it. If you follow these 5 rules, it will work.

---

## 3. How to add ONE question

Open the test file (example: `gate/test-1.ts`). Find the part that says:

```
  questions: [
       ...lots of questions...
  ],
```

**Copy any existing block, paste it just before the `],`, and change the words.**

A normal question looks like this:

```ts
{
  id: 40,
  type: "MCQ",
  marks: 1,
  neg: "1/3",
  year: "Civil Engineering",
  sectionLabel: "Civil Engineering",
  question: "Which IS code is used for plain and reinforced concrete?",
  options: ["(a) IS 383", "(b) IS 800", "(c) IS 456", "(d) IS 875"],
  correct: 2,
  solution: "IS 456 is the code for plain and reinforced concrete.",
},
```

### What each line means

| Line | What to write |
|------|----------------|
| `id` | The next number (no repeats in this file). |
| `type` | `"MCQ"` = one answer · `"MSQ"` = many answers · `"NAT"` = type a number. |
| `marks` | `1` or `2`. |
| `neg` | Negative marking. GATE 1-mark = `"1/3"`, GATE 2-mark = `"2/3"`, SSC = `"1/4"`, no negative = `"0"`. |
| `year` | Any small label shown on top of the question, e.g. `"GATE-2022"` or `"Civil Engineering"`. |
| `sectionLabel` | **Which subject group the question belongs to** (see Section 5). |
| `question` | The question text. |
| `options` | The 4 choices. (For NAT, write `[]` — empty.) |
| `correct` | Position of the right option: (a)=0, (b)=1, (c)=2, (d)=3. |
| `solution` | Short explanation of the answer. |

---

## 4. The three question types (with examples)

### ✅ MCQ — one correct answer
```ts
{
  id: 41, type: "MCQ", marks: 1, neg: "1/3", year: "Civil Engineering",
  sectionLabel: "Civil Engineering",
  question: "The standard cube size for the concrete strength test is:",
  options: ["(a) 100 mm", "(b) 150 mm", "(c) 200 mm", "(d) 75 mm"],
  correct: 1,
  solution: "The standard cube is 150 mm (IS 516).",
},
```

### ✅ MSQ — more than one correct answer
Works the same as MCQ. (This system stores one main answer in `correct`; write the
full reasoning in `solution`.)
```ts
{
  id: 42, type: "MSQ", marks: 2, neg: "0", year: "Civil Engineering",
  sectionLabel: "Civil Engineering",
  question: "Which of the following are non-ferrous metals?",
  options: ["(a) Copper", "(b) Iron", "(c) Aluminium", "(d) Steel"],
  correct: 0,
  solution: "Copper and Aluminium are non-ferrous. (Answers: a and c.)",
},
```

### ✅ NAT — type a number (no options)
Set `options: []`, set `correct: 0`, and add a **`natAnswer`** line:
```ts
{
  id: 43, type: "NAT", marks: 2, neg: "0", year: "GATE-2021",
  sectionLabel: "Civil Engineering",
  question: "A fixed-fixed beam (mass 10 kg, stiffness 4π² kN/m) has natural frequency = ____ Hz.",
  options: [],
  correct: 0,
  natAnswer: "10",
  solution: "ω = √(k/m) = 20π rad/s → f = 10 Hz.",
},
```
> NAT answers allow a tiny rounding gap automatically (about 1%), so `10` and `10.0` both pass.

---

## 5. Which subject goes where (`sectionLabel`)

Just copy the exact words below into `sectionLabel`.

### GATE  (full paper ≈ 65 questions)
| Your question is about… | Use this `sectionLabel` |
|---|---|
| Aptitude / English / reasoning | `"General Aptitude"` |
| Engineering Mathematics | `"Engineering Mathematics"` |
| Any civil subject (SOM, RCC, Steel, Soil, Fluid, Surveying, Transportation, Environmental, Hydrology, Irrigation, Mechanics, Materials…) | `"Civil Engineering"` |

Rough GATE mix to aim for: **10 General Aptitude + ~5 Maths + ~50 Civil = 65.**

### SSC-JE  (full Paper-1 = 200 questions)
| Your question is about… | Use this `sectionLabel` |
|---|---|
| Reasoning / puzzles / series | `"General Intelligence & Reasoning"` |
| GK / science / current affairs | `"General Awareness"` |
| Any civil / technical topic | `"Civil & Structural"` |

SSC mix to aim for: **50 Reasoning + 50 General Awareness + 100 Civil = 200.**

---

## 6. How to add a NEW test (Test 2, Test 3 …)

**Step 1.** Copy the file `test-1.ts` and rename the copy to `test-2.ts` (same folder).

**Step 2.** Open `test-2.ts` and change the top 3 lines:
```ts
export const gateTest2: MockTest = {   // ← gateTest1 becomes gateTest2
  id: "test-2",                         // ← "test-1" becomes "test-2"
  name: "Full Length Test 2",           // ← change the name
```
(For SSC, it's `sscTest2` instead of `gateTest2`.)

**Step 3.** Put **different** questions inside (Test 2 should not repeat Test 1).

**Step 4.** Open `index.ts` in the same folder and add the new test:
```ts
import { gateTest1 } from "./test-1";
import { gateTest2 } from "./test-2";          // ← add this line
export const GATE_TESTS = [gateTest1, gateTest2]; // ← add gateTest2 here
```

Done. The new test appears on the website automatically. 🎉

---

## 7. Ready-to-copy blank templates

**Blank MCQ:**
```ts
{
  id: ,
  type: "MCQ", marks: 1, neg: "1/3",
  year: "",
  sectionLabel: "",
  question: "",
  options: ["(a) ", "(b) ", "(c) ", "(d) "],
  correct: 0,
  solution: "",
},
```

**Blank NAT:**
```ts
{
  id: ,
  type: "NAT", marks: 2, neg: "0",
  year: "",
  sectionLabel: "",
  question: "",
  options: [],
  correct: 0,
  natAnswer: "",
  solution: "",
},
```

---

## 8. Common mistakes & how to fix

| Problem | Cause | Fix |
|---|---|---|
| Website build fails after editing | A missing comma `,` at the end of a block | Make sure every `}` of a question is followed by `,` |
| Two questions look merged / wrong count | Two questions have the **same `id`** | Give each a different number |
| “Unterminated string” error | A quote `"` was deleted or it's a curly “smart quote” | Retype the quotes as straight `"` |
| Right answer marked wrong | `correct` number is off | Remember (a)=0, (b)=1, (c)=2, (d)=3 |
| NAT question never correct | Forgot `natAnswer`, or left options filled | Set `options: []` and add `natAnswer: "yourNumber"` |

---

## 9. Quick checklist before you commit

- [ ] Every question block ends with a comma `,`
- [ ] Every `id` is different in this file
- [ ] `correct` points to the right option (0 = first)
- [ ] NAT questions have `options: []` and a `natAnswer`
- [ ] Quotes are straight `"` (not curly)

If all five are ticked, save/commit on GitHub — Vercel will rebuild and your questions go live.

---

*Tip: you don't have to do this by hand. Send your questions (from books/PDFs) and say
**“GATE Test 1”** or **“SSC Test 2”**, and they can be formatted and dropped into the
correct file under the correct section for you.*
