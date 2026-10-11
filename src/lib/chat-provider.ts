import { SYSTEM_PROMPT, getDeterministicFallback } from "@/data/knowledge-base";

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
}

export interface ChatProvider {
  name: string;
  sendMessage(messages: ChatMessage[]): Promise<ChatProviderResult>;
}

/**
 * OpenRouter Provider implementation
 * Uses configurable free or low-cost model via server environment variables.
 */
export class OpenRouterProvider implements ChatProvider {
  name = "openrouter";
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || "";
    // Default to a widely available free model; configurable via env
    this.model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async sendMessage(messages: ChatMessage[]): Promise<ChatProviderResult> {
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content || "";

    if (!this.isConfigured()) {
      return {
        content: getDeterministicFallback(lastUserMessage),
        isFallback: true,
        provider: "deterministic-kb",
        model: "offline-knowledge-base",
        note: "Live AI key (OPENROUTER_API_KEY) not configured. Responding via verified portfolio knowledge base.",
      };
    }

    // Keep up to 5 conversation turns to preserve token limits
    const recentHistory = messages.slice(-5).map((m) => ({
      role: m.role,
      content: m.content.slice(0, 500), // Cap length
    }));

    const payload = {
      model: this.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...recentHistory,
      ],
      max_tokens: 550,
      temperature: 0.25, // Lower temperature to prevent hallucination
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 14000); // 14s timeout

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey.trim()}`,
          "HTTP-Referer": "https://sameerali.dev",
          "X-Title": "Sameer Ali Portfolio Guide",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorStatus = response.status;
        console.warn(`[ChatProvider] OpenRouter responded with status ${errorStatus}`);
        
        // If primary model is rate-limited or temporarily unavailable, try alternate free model
        if ((errorStatus === 429 || errorStatus === 404) && this.model !== "nvidia/nemotron-3.5-lightning:free") {
          try {
            const backupPayload = { ...payload, model: "nvidia/nemotron-3.5-lightning:free" };
            const backupRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey.trim()}`,
                "HTTP-Referer": "https://sameerali.dev",
                "X-Title": "Sameer Ali Portfolio Guide",
              },
              body: JSON.stringify(backupPayload),
            });
            if (backupRes.ok) {
              const bData = await backupRes.json();
              const bReply = bData?.choices?.[0]?.message?.content?.trim();
              if (bReply) {
                return {
                  content: bReply,
                  isFallback: false,
                  provider: "openrouter",
                  model: "nvidia/nemotron-3.5-lightning:free",
                };
              }
            }
          } catch {
            // Fall through to deterministic fallback
          }
        }

        let warning = `Provider error (${errorStatus}). Using verified knowledge fallback.`;
        if (errorStatus === 429) {
          warning = "OpenRouter free-tier rate limit reached. Switched to verified knowledge fallback.";
        } else if (errorStatus === 401) {
          warning = "OpenRouter authentication failed. Please verify OPENROUTER_API_KEY in .env.";
        }

        return {
          content: getDeterministicFallback(lastUserMessage),
          isFallback: true,
          provider: "openrouter-fallback",
          model: this.model,
          note: warning,
        };
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        return {
          content: getDeterministicFallback(lastUserMessage),
          isFallback: true,
          provider: "openrouter-fallback",
          model: this.model,
          note: "Empty response from provider. Switched to verified knowledge fallback.",
        };
      }

      return {
        content: reply,
        isFallback: false,
        provider: "openrouter",
        model: this.model,
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (err as { name?: string })?.name === "AbortError";
      console.warn(`[ChatProvider] Request failed: ${isAbort ? "Timeout" : "Network error"}`);

      return {
        content: getDeterministicFallback(lastUserMessage),
        isFallback: true,
        provider: "offline-knowledge-base",
        model: this.model,
        note: isAbort
          ? "Request timed out after 14s. Delivered verified knowledge fallback."
          : "Network connectivity issue with provider. Delivered verified knowledge fallback.",
      };
    }
  }
}

/**
 * Factory function to retrieve the active provider.
 * Allows easy switching to Gemini or another provider without touching the UI.
 */
export function getActiveChatProvider(): ChatProvider {
  // Provider can be extended here (e.g. GeminiProvider if GEMINI_API_KEY is preferred)
  return new OpenRouterProvider();
}
