// ============================================================
// PLACE THIS FILE AT:  src/data/exams/gate/index.ts
// ============================================================

import { MockTest } from "../types";
import { gateTest1 } from "./test-1";
// We import the new test from test-2 and rename it to gateTest2
import { gateTest2 } from "./test-2";

// We add gateTest2 to the exported array
export const GATE_TESTS: MockTest[] = [
  gateTest1,
  gateTest2,
];
