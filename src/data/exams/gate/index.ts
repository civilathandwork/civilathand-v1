// ============================================================
// PLACE THIS FILE AT:  src/data/exams/gate/index.ts
// ============================================================
// The list of GATE full-length tests.
// TO ADD A NEW TEST: create test-2.ts (copy test-1.ts), then add it here:
//    import { gateTest2 } from "./test-2";
//    export const GATE_TESTS = [gateTest1, gateTest2];
// ============================================================

import { MockTest } from "../types";
import { gateTest1 } from "./test-1";
import { gateTest2 } from "./test-2";

export const GATE_TESTS: MockTest[] = [
  gateTest1,
  gateTest2,
];
