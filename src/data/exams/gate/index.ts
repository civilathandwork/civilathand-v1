// ============================================================
// PLACE THIS FILE AT:  src/data/exams/gate/index.ts
// ============================================================

import { MockTest } from "../types";
import { gateTest1 } from "./test-1";
// We import the test you created in test-2.ts
import { gate2026 as gateTest2 } from "./test-2";

// We add gateTest2 to the array
export const GATE_TESTS: MockTest[] = [
  gateTest1,
  gateTest2,
];
