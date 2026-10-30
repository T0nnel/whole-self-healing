/**
 * test-email.mjs
 * Run from the project root: node test-email.mjs
 * Reads .env.local and fires both Resend email flows.
 */

import { readFileSync } from "fs";
import { createRequire } from "module";
import https from "https";

// ── 1. Parse .env.local manually (no dotenv dependency needed) ──────────────
const envRaw = readFileSync(".env.local", "utf8");
const env = {};
for (const line of envRaw.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim().replace(/^"|"$/g, "");
  env[key] = val;
}

const RESEND_API_KEY = env.RESEND_API_KEY;
const FROM_EMAIL     = env.FROM_EMAIL     || "Whole Self Healing <onboarding@resend.dev>";
const NOTIFY_EMAIL   = env.NOTIFY_EMAIL   || "info@wholeselfhealing.co.uk";

console.log("\n━━━  Whole Self Healing — Email Test  ━━━");
console.log(`API Key : ${RESEND_API_KEY ? RESEND_API_KEY.slice(0, 8) + "…" : "⚠️  MISSING"}`);
console.log(`From    : ${FROM_EMAIL}`);
console.log(`Notify  : ${NOTIFY_EMAIL}`);
console.log("─────────────────────────────────────────\n");

if (!RESEND_API_KEY) {
  console.error("❌  RESEND_API_KEY is not set in .env.local — aborting.");
  process.exit(1);
}

// ── 2. Helper: POST to Resend via native https with simple retry ──────────
function sendEmail(payload, retries = 2) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const attempt = () => {
      const req = https.request(
        {
          hostname: "api.resend.com",
          path: "/emails",
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body),
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve({ status: res.statusCode, body: data }));
        }
      );
      req.on("error", (err) => {
        if (retries > 0) {
          retries--;
          setTimeout(attempt, 1200);
        } else {
          reject(err);
        }
      });
      req.write(body);
      req.end();
    };
    attempt();
  });
}

// ── 3. Test A: Coaching interest confirmation (to account owner — works without domain) ─
async function testCoachingConfirmation() {
  // Without a verified domain, Resend only allows sending to the account owner's address
  const testEmail = "mbuguatonnel@gmail.com";

  console.log(`📧  [Test A] Coaching confirmation → ${testEmail}`);
  const result = await sendEmail({
    from: FROM_EMAIL,
    to:   testEmail,
    subject: "Thank you for registering your interest — Whole Self Healing",
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#2a2b2f;background:#fef9ef;border-radius:12px;border:1px solid #d1c9bf;">
        <p style="font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#b05a36;font-weight:600;margin:0 0 16px 0;">Whole Self Healing</p>
        <h2 style="font-size:24px;font-weight:400;color:#2a2b2f;margin:0 0 16px 0;">Hello Bibi,</h2>
        <p style="font-size:16px;line-height:1.6;color:#333;margin:0 0 16px 0;">
          Thank you for registering your interest in 1:1 coaching. I have received your enquiry and will be in touch personally as private openings become available.
        </p>
        <p style="font-size:14px;line-height:1.6;color:#515151;margin:24px 0 0 0;">
          Warmly,<br/><strong>Bibi Beck</strong><br/>
          <span style="font-size:12px;color:#65765d;">Psychological Wellbeing Practitioner • Yoga Teacher</span>
        </p>
        <hr style="margin:24px 0;border:none;border-top:1px solid #d1c9bf;"/>
        <p style="font-size:11px;color:#999;margin:0;">
          ✅ EMAIL TEST — sent via Resend sandbox | ${new Date().toISOString()}
        </p>
      </div>
    `,
  });
  return result;
}

// ── 4. Test B: Admin notification (to Bibi's notify address) ─────────────
async function testAdminNotification() {
  // NOTIFY_EMAIL from .env.local — must be mbuguatonnel@gmail.com until domain is verified
  console.log(`📬  [Test B] Admin notification → ${NOTIFY_EMAIL}`);
  const result = await sendEmail({
    from: FROM_EMAIL,
    to:   NOTIFY_EMAIL,
    subject: "✅ TEST — New Coaching Enquiry from Test User (COACH-TESTXX)",
    html: `
      <div style="font-family:sans-serif;padding:20px;color:#333;">
        <h3>New 1:1 Coaching Registration (TEST)</h3>
        <p><strong>Name:</strong> Test User</p>
        <p><strong>Email:</strong> testuser@example.com</p>
        <p><strong>Focus Area:</strong> Rest guilt / Inner critic</p>
        <p><strong>Message:</strong> Testing the email pipeline — everything looks good!</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}</p>
        <hr/>
        <p style="font-size:11px;color:#999;">✅ EMAIL TEST — sent via Resend | ${new Date().toISOString()}</p>
      </div>
    `,
  });
  return result;
}

// ── 5. Test C: Workshop booking confirmation ──────────────────────────────
async function testWorkshopBooking() {
  // Also sending to mbuguatonnel@gmail.com — the only allowed recipient without domain
  const testEmail = NOTIFY_EMAIL;
  const bookingRef = `WSH-${Math.floor(100000 + Math.random() * 900000)}`;
  console.log(`🗓️  [Test C] Workshop booking → ${testEmail}  (ref: ${bookingRef})`);
  const result = await sendEmail({
    from: FROM_EMAIL,
    to:   testEmail,
    subject: `Your Workshop Spot is Confirmed (${bookingRef}) — Whole Self Healing`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#2a2b2f;background:#fef9ef;border-radius:12px;border:1px solid #d1c9bf;">
        <p style="font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#b05a36;font-weight:600;margin:0 0 16px 0;">Whole Self Healing Workshop</p>
        <h2 style="font-size:24px;font-weight:400;margin:0 0 16px 0;">Welcome, Test User</h2>
        <p style="font-size:16px;line-height:1.6;margin:0 0 16px 0;">
          Your place has been reserved for the <strong>Start with Self-Compassion</strong> online cohort.
        </p>
        <div style="background:#f5eee1;padding:18px 20px;border-radius:8px;margin:24px 0;border:1px solid #d1c9bf;">
          <p style="margin:0 0 8px;font-size:14px;"><strong>Booking Reference:</strong> ${bookingRef}</p>
          <p style="margin:0 0 8px;font-size:14px;"><strong>Session:</strong> Saturday 15 November 2026, 10:00 AM GMT</p>
          <p style="margin:0;font-size:14px;"><strong>Format:</strong> 60 minutes online via Zoom</p>
        </div>
        <p style="font-size:15px;line-height:1.6;">
          You will receive your private Zoom meeting link and preparation materials 24 hours prior to the session.
        </p>
        <p style="font-size:14px;line-height:1.6;color:#515151;margin:24px 0 0 0;">
          Warmly,<br/><strong>Bibi Beck</strong><br/>
          <span style="font-size:12px;color:#65765d;">Whole Self Healing</span>
        </p>
        <hr style="margin:24px 0;border:none;border-top:1px solid #d1c9bf;"/>
        <p style="font-size:11px;color:#999;margin:0;">✅ EMAIL TEST | ${new Date().toISOString()}</p>
      </div>
    `,
  });
  return result;
}

// ── 6. Run all tests ──────────────────────────────────────────────────────
(async () => {
  const tests = [
    { name: "Coaching confirmation (to user)",   fn: testCoachingConfirmation },
    { name: "Admin notification (to Bibi)",       fn: testAdminNotification },
    { name: "Workshop booking confirmation",      fn: testWorkshopBooking },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const res = await test.fn();
      const parsed = JSON.parse(res.body);
      if (res.status === 200 && parsed.id) {
        console.log(`   ✅  PASS  status=${res.status}  id=${parsed.id}`);
        passed++;
      } else {
        console.log(`   ❌  FAIL  status=${res.status}  body=${res.body}`);
        failed++;
      }
    } catch (err) {
      console.log(`   💥  ERROR  ${err.message}`);
      failed++;
    }
    console.log();
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (passed === tests.length) {
    console.log("🎉  All email flows confirmed working via Resend API!\n");
    console.log("Next steps for production:");
    console.log("  1. In Resend dashboard, add & verify your domain (e.g. wholeselfhealing.co.uk)");
    console.log("  2. Update FROM_EMAIL to: Whole Self Healing <hello@wholeselfhealing.co.uk>");
    console.log("  3. Set NOTIFY_EMAIL to Bibi's real inbox in your hosting platform env vars");
    console.log("  4. Deploy to Vercel/Railway with those 3 env vars set\n");
  } else {
    console.log("⚠️  Some tests failed — check the error output above.\n");
    process.exit(1);
  }
})();

