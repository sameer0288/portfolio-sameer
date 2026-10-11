import test from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit } from "@/lib/rate-limiter";
import { getDeterministicFallback } from "@/data/knowledge-base";
import { OpenRouterProvider } from "@/lib/chat-provider";

test("Rate limiter enforces request limits within sliding time window", () => {
  const testId = `test-client-${Date.now()}`;
  const opts = { intervalMs: 2000, maxRequests: 3 };

  // First 3 requests must succeed
  assert.equal(checkRateLimit(testId, opts).success, true);
  assert.equal(checkRateLimit(testId, opts).success, true);
  assert.equal(checkRateLimit(testId, opts).success, true);

  // 4th request must be rate limited
  const blocked = checkRateLimit(testId, opts);
  assert.equal(blocked.success, false);
  assert.equal(blocked.remaining, 0);
  assert.ok(blocked.resetSeconds > 0);
});

test("Deterministic fallback returns verified facts for Sameer's experience", () => {
  const expReply = getDeterministicFallback("Tell me about Sameer's experience and companies");
  assert.ok(expReply.includes("Techdome"));
  assert.ok(expReply.includes("Kuanta"));
  assert.ok(expReply.includes("TCS"));
  assert.ok(expReply.includes("Markoknow"));
  assert.ok(expReply.includes("2.5+ years"));
});

test("Deterministic fallback accurately explains JourneyWise AI", () => {
  const reply = getDeterministicFallback("Explain JourneyWise AI and ATS scoring");
  assert.ok(reply.includes("JourneyWise AI"));
  assert.ok(reply.includes("ATS"));
  assert.ok(reply.includes("https://journeywise-ai.vercel.app/"));
});

test("Deterministic fallback accurately describes Kuanta AI & Milvus", () => {
  const reply = getDeterministicFallback("What was Sameer's contribution to Kuanta AI?");
  assert.ok(reply.includes("Milvus"));
  assert.ok(reply.includes("3M+"));
  assert.ok(reply.includes("FastAPI"));
  assert.ok(reply.includes("https://kuanta.ai/"));
});

test("Deterministic fallback explains MPRAR Central CRM accurately", () => {
  const reply = getDeterministicFallback("What about MPRAR workforce management CRM?");
  assert.ok(reply.includes("MPRAR Central"));
  assert.ok(reply.includes("clock-in/out"));
  assert.ok(reply.includes("https://central.mprar.com/"));
});

test("Deterministic fallback explains Growza accurately", () => {
  const reply = getDeterministicFallback("What is Growza?");
  assert.ok(reply.includes("Growza"));
  assert.ok(reply.toLowerCase().includes("table ordering"));
  assert.ok(reply.includes("https://www.growza.me/"));
});

test("Deterministic fallback returns direct résumé download link", () => {
  const reply = getDeterministicFallback("Download Sameer's resume");
  assert.ok(reply.includes("/Sameer_Ali_Resume.pdf"));
  assert.ok(reply.includes("sameersheikh0288@gmail.com"));
});

test("OpenRouterProvider gracefully defaults to fallback when unconfigured", async () => {
  const provider = new OpenRouterProvider();
  const res = await provider.sendMessage([{ role: "user", content: "Tell me about Sameer" }]);
  assert.ok(res.content.length > 20);
  if (!provider.isConfigured()) {
    assert.equal(res.isFallback, true);
    assert.equal(res.provider, "deterministic-kb");
  }
});
