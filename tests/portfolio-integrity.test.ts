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

test("All 5 required projects exist in exact required order with WebSocket engine removed", () => {
  const ids = PORTFOLIO_DATA.projects.map((p) => p.id);
  assert.deepEqual(ids, [
    "growza",
    "mprar-crm",
    "journeywise-ai",
    "movie-library",
    "kuanta-ai",
  ]);

  // Real-Time WebSocket Engine must not exist
  assert.equal(
    PORTFOLIO_DATA.projects.some((p) => p.id === "realtime-chat"),
    false,
    "Real-Time WebSocket Engine must be removed"
  );

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

  const movieLib = PORTFOLIO_DATA.projects.find((p) => p.id === "movie-library");
  assert.ok(movieLib, "Movie Library should exist");
  assert.equal(movieLib.liveUrl, "https://movie-library-flame.vercel.app/");
  assert.equal(movieLib.githubUrl, "https://github.com/sameer0288/movie-library");
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

test("Markoknow certificate and LOR credentials match verified Drive document", () => {
  const markoknow = PORTFOLIO_DATA.experience.find((e) => e.company === "Markoknow");
  assert.ok(markoknow, "Markoknow entry must exist");
  assert.equal(markoknow.certificateId, "110080");
  assert.equal(markoknow.certificateBadge, "Silver Belt Badge");
  assert.equal(
    markoknow.certificateUrl,
    "https://drive.google.com/file/d/1XbJS6dSRiW62hg5Lz29BGc-0ojNn38PR/view?usp=sharing"
  );

  const certImage = path.join(process.cwd(), "public", "images", "certifications", "markoknow-certificate.png");
  assert.ok(fs.existsSync(certImage), "Markoknow certificate image must exist in public directory");
  assert.ok(fs.statSync(certImage).size > 50000, "Certificate image must be valid and non-empty");

  const certItem = PORTFOLIO_DATA.certifications.find((c) => c.issuer.includes("Markoknow"));
  assert.ok(certItem, "Markoknow must be listed under verified certifications");
  assert.equal(certItem.certificateId, "110080");
});
