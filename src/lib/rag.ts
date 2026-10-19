/**
 * Retrieval-first portfolio RAG.
 *
 * Answers are composed from scored knowledge chunks in-process.
 * No embedding API, no network hop, and no model wait on the common path.
 * The chat provider may optionally rephrase a medium-confidence hit with an LLM,
 * but only with these retrieved passages as context.
 */

export interface KnowledgeChunk {
  id: string;
  title: string;
  /** Phrases that should win over incidental mentions inside other answers. */
  aliases: string[];
  answer: string;
}

export type RagConfidence = "high" | "medium" | "low";

export interface RagAnswer {
  content: string;
  sources: string[];
  confidence: RagConfidence;
  topScore: number;
}

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "to", "of", "for", "in", "on", "at", "is", "are",
  "was", "were", "what", "who", "how", "does", "do", "did", "me", "my", "his",
  "her", "about", "tell", "please", "can", "you", "your", "sameer", "ali", "i",
  "with", "from", "this", "that", "it", "be", "explain", "describe", "show",
  "give", "want", "know", "like", "just", "any", "there", "their", "into", "over",
  "has", "have", "had", "he", "she", "him", "s",
]);

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+.#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function contentTokens(value: string): string[] {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

export function scoreChunk(query: string, chunk: KnowledgeChunk): number {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 0;

  const queryTokens = contentTokens(query);
  const aliasBlob = normalizeText(`${chunk.title} ${chunk.aliases.join(" ")}`);
  let score = 0;

  for (const alias of chunk.aliases) {
    const normalizedAlias = normalizeText(alias);
    if (normalizedAlias.length < 3) continue;
    if (normalizedQuery.includes(normalizedAlias)) {
      score += 14 + Math.min(normalizedAlias.length, 24);
    }
  }

  for (const token of queryTokens) {
    if (token.length <= 2) continue;
    if (aliasBlob.includes(token)) score += 7;
    else if (normalizeText(chunk.answer).includes(token)) score += 1;
  }

  return score;
}

export function answerFromChunks(query: string, chunks: KnowledgeChunk[], fallback: string): RagAnswer {
  const ranked = chunks
    .map((chunk) => ({ chunk, score: scoreChunk(query, chunk) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  const second = ranked[1];

  if (!top || top.score < 6) {
    return {
      content: fallback,
      sources: [],
      confidence: "low",
      topScore: top?.score ?? 0,
    };
  }

  const asksForMultiple = /\b(and|vs\.?|versus|compare|both|difference)\b/i.test(query);
  const secondIsRelevant =
    Boolean(second) &&
    second.score >= 12 &&
    second.chunk.id !== top.chunk.id &&
    (asksForMultiple || second.score >= top.score * 0.82);

  if (second && secondIsRelevant) {
    return {
      content: `${top.chunk.answer}\n\n${second.chunk.answer}`,
      sources: [top.chunk.title, second.chunk.title],
      confidence: "high",
      topScore: top.score,
    };
  }

  return {
    content: top.chunk.answer,
    sources: [top.chunk.title],
    confidence: top.score >= 12 ? "high" : "medium",
    topScore: top.score,
  };
}
