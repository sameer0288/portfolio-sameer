import { NextRequest, NextResponse } from "next/server";
import { getActiveChatProvider, ChatMessage } from "@/lib/chat-provider";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: 10 requests per 60 seconds per IP
    const rateCheck = checkRateLimit(`chat:${ip}`, { intervalMs: 60_000, maxRequests: 10 });

    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait before asking another question.",
          resetSeconds: rateCheck.resetSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.resetSeconds),
            "X-RateLimit-Limit": String(rateCheck.limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request payload. Expected { messages: Array<{role, content}> }" },
        { status: 400 }
      );
    }

    // Validate and sanitize messages
    const sanitizedMessages: ChatMessage[] = [];
    for (const msg of body.messages) {
      if (typeof msg !== "object" || msg === null) continue;
      const role = msg.role === "assistant" ? "assistant" : "user";
      const rawContent = typeof msg.content === "string" ? msg.content.trim() : "";
      
      if (!rawContent) continue;
      // Cap individual message length at 600 characters
      const content = rawContent.slice(0, 600);
      sanitizedMessages.push({ role, content });
    }

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: "No valid message content provided." }, { status: 400 });
    }

    const provider = getActiveChatProvider();
    const result = await provider.sendMessage(sanitizedMessages);

    return NextResponse.json(
      {
        content: result.content,
        isFallback: result.isFallback,
        provider: result.provider,
        model: result.model,
        note: result.note,
        sources: result.sources ?? [],
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(rateCheck.limit),
          "X-RateLimit-Remaining": String(rateCheck.remaining),
        },
      }
    );
  } catch (err: unknown) {
    console.error("[API/chat] Internal server error:", err);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your query.",
      },
      { status: 500 }
    );
  }
}
