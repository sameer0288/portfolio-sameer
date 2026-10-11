import test from "node:test";
import assert from "node:assert/strict";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactPayload(body: {
  name?: string;
  email?: string;
  message?: string;
  botField?: string;
  website?: string;
}) {
  if (body.botField || body.website) {
    return { ok: true, isSpam: true };
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length < 2 || name.length > 100) {
    return { ok: false, error: "Name must be between 2 and 100 characters." };
  }
  if (!email || !EMAIL_REGEX.test(email) || email.length > 120) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (!message || message.length < 10 || message.length > 2500) {
    return { ok: false, error: "Message must be between 10 and 2500 characters." };
  }

  return { ok: true, isSpam: false, name, email, message };
}

test("Contact form validates valid submissions", () => {
  const result = validateContactPayload({
    name: "Alex Mercer",
    email: "alex.mercer@company.com",
    message: "We have an open SDE-2 position in our AI engineering team.",
  });
  assert.equal(result.ok, true);
  assert.equal(result.isSpam, false);
});

test("Contact form rejects invalid names, emails, and short messages", () => {
  assert.equal(validateContactPayload({ name: "", email: "a@b.com", message: "Hello world here" }).ok, false);
  assert.equal(validateContactPayload({ name: "A", email: "a@b.com", message: "Hello world here" }).ok, false);
  assert.equal(validateContactPayload({ name: "Alex", email: "invalid-email", message: "Hello world here" }).ok, false);
  assert.equal(validateContactPayload({ name: "Alex", email: "a@b.com", message: "Short" }).ok, false);
});

test("Contact honeypot flags spam bots cleanly", () => {
  const spamResult = validateContactPayload({
    name: "Spam Bot",
    email: "bot@spam.com",
    message: "Buy cheap backlinks now",
    botField: "I am a robot",
  });
  assert.equal(spamResult.ok, true);
  assert.equal(spamResult.isSpam, true);
});
