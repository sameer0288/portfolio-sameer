import { SYSTEM_PROMPT, answerQuestion, buildGroundingContext } from "@/data/knowledge-base";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatProviderResult {
  content: string;
  isFallback: boolean;
  provider: string;
  model: string;
  note?: string;
  sources?: string[];
}

export interface ChatProvider {
  name: string;
  sendMessage(messages: ChatMessage[]): Promise<ChatProviderResult>;
}

const LLM_TIMEOUT_MS = 4500;

/**
 * Retrieval-first chat provider.
 *
 * Portfolio questions are answered from the local RAG index immediately.
 * An optional LLM call runs only for medium-confidence questions when an
 * OpenRouter key exists, and it is bounded to a short timeout so the UI
 * never sits on a slow model.
 */
export class OpenRouterProvider implements ChatProvider {
  name = "openrouter";
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || "";
    this.model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async sendMessage(messages: ChatMessage[]): Promise<ChatProviderResult> {
    const lastUserMessage = messages.filter((message) => message.role === "user").pop()?.content || "";
    const local = answerQuestion(lastUserMessage);
    const localResult: ChatProviderResult = {
      content: local.content,
      isFallback: !this.isConfigured(),
      provider: this.isConfigured() ? "portfolio-rag" : "deterministic-kb",
      model: "portfolio-rag-v1",
      sources: local.sources,
      note: local.sources.length
        ? `Answered from ${local.sources.join(" · ")}`
        : "Answered from the verified portfolio index",
    };

    const shouldTryModel = this.isConfigured() && local.confidence === "medium";
    if (!shouldTryModel) {
      return localResult;
    }

    try {
      const reply = await this.completeWithContext(messages, lastUserMessage);
      if (!reply) return localResult;
      return {
        content: reply,
        isFallback: false,
        provider: "openrouter",
        model: this.model,
        sources: local.sources,
        note: local.sources.length
          ? `Drafted from ${local.sources.join(" · ")}`
          : "Drafted from retrieved portfolio passages",
      };
    } catch {
      return {
        ...localResult,
        note: "Model was slow or unavailable. Answered from the portfolio index instead.",
      };
    }
  }

  private async completeWithContext(messages: ChatMessage[], lastUserMessage: string): Promise<string | null> {
    const history = messages.slice(-4).map((message) => ({
      role: message.role,
      content: message.content.slice(0, 500),
    }));

    const payload = {
      model: this.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "system",
          content: `Retrieved passages:\n\n${buildGroundingContext(lastUserMessage)}`,
        },
        ...history,
      ],
      max_tokens: 420,
      temperature: 0.1,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey.trim()}`,
          "HTTP-Referer": "https://sameerali.dev",
          "X-Title": "Sameer Ali Portfolio",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) return null;
      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();
      return reply || null;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

export function getActiveChatProvider(): ChatProvider {
  return new OpenRouterProvider();
}
