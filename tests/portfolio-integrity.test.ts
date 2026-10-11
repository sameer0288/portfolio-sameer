import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

test("Portfolio personal info matches verified résumé", () => {
  assert.equal(PORTFOLIO_DATA.personal.name, "Sameer Ali");
  assert.equal(PORTFOLIO_DATA.personal.email, "sameersheikh0288@gmail.com");
  assert.equal(PORTFOLIO_DATA.personal.phone, "+91 8306690288");
  assert.ok(PORTFOLIO_DATA.personal.github.includes("sameer0288"));
  assert.equal(PORTFOLIO_DATA.personal.linkedin, "https://www.linkedin.com/in/sameer0288/");
});

test("All 4 required primary projects exist with verified live URLs", () => {
  const mprar = PORTFOLIO_DATA.projects.find((p) => p.id === "mprar-crm");
  assert.ok(mprar, "MPRAR CRM should exist");
  assert.equal(mprar.liveUrl, "https://central.mprar.com/");
  assert.ok(mprar.tags.includes("PostgreSQL"));

  const growza = PORTFOLIO_DATA.projects.find((p) => p.id === "growza");
  assert.ok(growza, "Growza should exist");
  assert.equal(growza.liveUrl, "https://www.growza.me/");

  const journeyWise = PORTFOLIO_DATA.projects.find((p) => p.id === "journeywise-ai");
  assert.ok(journeyWise, "JourneyWise AI should exist");
  assert.equal(journeyWise.liveUrl, "https://journeywise-ai.vercel.app/");

  const kuanta = PORTFOLIO_DATA.projects.find((p) => p.id === "kuanta-ai");
  assert.ok(kuanta, "Kuanta AI should exist");
  assert.equal(kuanta.liveUrl, "https://kuanta.ai/");
  assert.ok(kuanta.description.includes("Milvus"));
  assert.ok(kuanta.description.includes("3M+"));
});

test("Experience history reflects verified roles from résumé", () => {
  const companies = PORTFOLIO_DATA.experience.map((e) => e.company);
  assert.ok(companies.includes("Techdome"));
  assert.ok(companies.some((c) => c.includes("Kuanta")));
  assert.ok(companies.some((c) => c.includes("Tata Consultancy Services")));
  assert.ok(companies.includes("Markoknow"));
});

test("Public resume PDF files exist on disk", () => {
  const resume1 = path.join(process.cwd(), "public", "Sameer_Ali_Resume.pdf");
  const resume2 = path.join(process.cwd(), "public", "assets", "Sameer-Ali-Resume.pdf");
  assert.ok(fs.existsSync(resume1), "public/Sameer_Ali_Resume.pdf must exist");
  assert.ok(fs.existsSync(resume2), "public/assets/Sameer-Ali-Resume.pdf must exist");
  assert.ok(fs.statSync(resume1).size > 100000, "Resume file must be a non-empty genuine PDF");
});
