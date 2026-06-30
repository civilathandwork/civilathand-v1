// ============================================================
// PLACE THIS FILE AT:
//   src/data/education/site.ts
// ============================================================
// ONE place to control links + payment for the whole Education
// section. Change a value here and it updates EVERY page.
// You do not need to touch any page code.
// ============================================================

// ── Mentorship Google Form ───────────────────────────────────
// Short share link (used for the big "Apply" buttons).
export const MENTORSHIP_FORM_URL =
  "https://forms.gle/ugpUtBR1xNDYUSti9";

// Embed link (used to show the form INSIDE the page).
// This is the same form, "embedded=true" version.
export const MENTORSHIP_FORM_EMBED =
  "https://docs.google.com/forms/d/e/1FAIpQLScOOKnQXpGm6UUxj14ApEMOlEHpbtzIYZQd3ow4HR21UJHrBw/viewform?embedded=true";

// ── Payment (Cashfree) ───────────────────────────────────────
// LEAVE THESE EMPTY ("") while everything is FREE.
// When you are ready to charge, paste your Cashfree payment-link
// URL into the matching line below. The button text changes
// automatically from "Free for now" to "Pay & Enroll".
//
//   1. Create a Payment Link in your Cashfree dashboard.
//   2. Copy the link (looks like https://payments.cashfree.com/...).
//   3. Paste it between the quotes below.
export const PAYMENT_LINKS = {
  mentorship: "",      // ₹999 mentorship — paste Cashfree link here later
  testSeries: "",      // test-series pack — paste link here later
  course: "",          // courses — paste link here later
};

// ── Contact ──────────────────────────────────────────────────
export const WHATSAPP_NUMBER = "917703977002"; // no + sign
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// ── Mentorship price (display only) ──────────────────────────
export const MENTORSHIP_PRICE = "₹999";
export const MENTORSHIP_PRICE_NOTE = "Free for now — limited early seats";

// Helper: WhatsApp link with a pre-filled message.
export function whatsapp(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
