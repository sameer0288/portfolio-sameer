"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Minus,
  Send,
  RotateCcw,
  User,
  ExternalLink,
  FileDown,
  AlertTriangle,
  Copy,
  Check,
  Maximize2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  note?: string;
}

const SUGGESTED_PROMPTS = [
  "Work experience",
  "Techdome EMR work",
  "Kuanta and Milvus",
  "JourneyWise AI",
  "Skills and stack",
  "Download résumé",
];

const WELCOME =
  "Hi, I am Sameer's portfolio assistant. Ask about his roles, projects, or stack. Answers come from his verified profile.";

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "assistant", content: WELCOME },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized, loading]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const handleSend = async (userText: string) => {
    const text = userText.trim();
    if (!text || loading) return;

    setErrorMessage(null);
    const userMsg: Message = { id: `user-${Date.now()}`, role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history
            .filter((message) => message.id !== "init")
            .map((message) => ({ role: message.role, content: message.content })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(
          res.status === 429
            ? "Too many questions in a short time. Wait a moment and try again."
            : data.error || "The assistant could not answer just now."
        );
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.content,
          note: data.note,
        },
      ]);
    } catch {
      setErrorMessage("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{ id: "init", role: "assistant", content: WELCOME }]);
    setErrorMessage(null);
    setInput("");
  };

  return (
    <div className="chat-dock">
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          type="button"
          aria-label="Open portfolio assistant"
          className="chat-launcher"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-full border border-[var(--border-strong)]">
            <img src="/images/sameer.jpg" alt="" className="h-full w-full object-cover object-top" />
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-[var(--panel-solid)] bg-[var(--accent)]" />
          </span>
          <span className="text-left">
            <span className="block text-xs font-semibold text-[var(--text)]">Ask about Sameer</span>
            <span className="block font-mono text-[10px] text-[var(--text-muted)]">Profile assistant</span>
          </span>
        </button>
      )}

      {isOpen && (
        <section
          className={`chat-panel ${isMinimized ? "chat-panel-min" : ""}`}
          aria-label="Portfolio assistant"
        >
          <header className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[var(--border)]">
                <img src="/images/sameer.jpg" alt="" className="h-full w-full object-cover object-top" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-[var(--text)]">Portfolio assistant</span>
                <span className="block truncate font-mono text-[10px] text-[var(--text-muted)]">
                  Answers from Sameer&apos;s verified profile
                </span>
              </span>
            </div>
            <div className="flex shrink-0 items-center">
              <button type="button" onClick={handleReset} className="chat-icon-btn" aria-label="Reset conversation">
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized((value) => !value)}
                className="chat-icon-btn"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
              </button>
              <button type="button" onClick={() => setIsOpen(false)} className="chat-icon-btn" aria-label="Close chat">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </header>

          {!isMinimized && (
            <>
              <div className="chat-thread" aria-live="polite">
                {messages.map((message) => {
                  const isUser = message.role === "user";
                  return (
                    <div key={message.id} className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
                      {!isUser && (
                        <span className="mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[var(--border)]">
                          <img src="/images/sameer.jpg" alt="" className="h-full w-full object-cover object-top" />
                        </span>
                      )}
                      <div className={isUser ? "chat-bubble-user" : "chat-bubble-bot"}>
                        <div className="space-y-1">{renderFormattedText(message.content)}</div>
                        {!isUser && (
                          <div className="mt-2 flex items-center justify-between gap-2 border-t border-[var(--border)] pt-1.5">
                            <span className="truncate font-mono text-[10px] text-[var(--text-subtle)]">
                              {message.note || "Portfolio index"}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(message.id, message.content)}
                              className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text)]"
                              aria-label="Copy answer"
                            >
                              {copiedId === message.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              {copiedId === message.id ? "Copied" : "Copy"}
                            </button>
                          </div>
                        )}
                      </div>
                      {isUser && (
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text-muted)]">
                          <User className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                  );
                })}

                {loading && (
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[var(--border)]">
                      <img src="/images/sameer.jpg" alt="" className="h-full w-full object-cover object-top" />
                    </span>
                    <span className="chat-bubble-bot !py-2.5 font-mono text-[11px]">Looking through the profile…</span>
                  </div>
                )}

                {errorMessage && (
                  <div className="flex items-start gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-700 dark:text-rose-200">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-[var(--border)] px-3 py-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    disabled={loading}
                    className="chip shrink-0 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2 border-t border-[var(--border)] p-3"
              >
                <label htmlFor="portfolio-chat-input" className="sr-only">
                  Ask about Sameer
                </label>
                <input
                  id="portfolio-chat-input"
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about a role, project, or skill"
                  maxLength={600}
                  className="chat-input"
                />
                <button type="submit" disabled={!input.trim() || loading} className="btn-primary !px-3 !py-2.5" aria-label="Send message">
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          )}
        </section>
      )}
    </div>
  );
}

function renderFormattedText(text: string) {
  return text.split("\n").map((line, lineIdx) => {
    const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
    const cleanLine = isBullet ? line.trim().replace(/^[-•]\s*/, "") : line;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const elements: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(cleanLine)) !== null) {
      if (match.index > lastIndex) elements.push(cleanLine.substring(lastIndex, match.index));
      const label = match[1];
      const href = match[2];
      const isDownload = href.endsWith(".pdf");
      elements.push(
        <a
          key={`link-${lineIdx}-${match.index}`}
          href={href}
          download={isDownload ? "Sameer_Ali_Resume.pdf" : undefined}
          target={isDownload ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="mx-0.5 inline-flex items-center gap-0.5 font-semibold text-[var(--accent)] underline"
        >
          <span>{label}</span>
          {isDownload ? <FileDown className="inline h-3 w-3" /> : <ExternalLink className="inline h-2.5 w-2.5" />}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < cleanLine.length) elements.push(cleanLine.substring(lastIndex));

    const rendered = elements.map((item, idx) => {
      if (typeof item !== "string") return item;
      return item.split(/\*\*([^*]+)\*\*/g).map((part, partIdx) => {
        if (partIdx % 2 === 1) {
          return (
            <strong key={`b-${lineIdx}-${idx}-${partIdx}`} className="font-semibold text-[var(--text)]">
              {part}
            </strong>
          );
        }
        return part.split(/`([^`]+)`/g).map((codePart, codeIdx) =>
          codeIdx % 2 === 1 ? (
            <code key={`c-${lineIdx}-${idx}-${codeIdx}`} className="rounded bg-[var(--bg-secondary)] px-1 py-0.5 font-mono text-[10px] text-[var(--accent)]">
              {codePart}
            </code>
          ) : (
            codePart
          )
        );
      });
    });

    if (!cleanLine.trim()) return <div key={`p-${lineIdx}`} className="h-2" />;

    if (isBullet) {
      return (
        <div key={`p-${lineIdx}`} className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <span>{rendered}</span>
        </div>
      );
    }

    return (
      <p key={`p-${lineIdx}`} className="leading-relaxed">
        {rendered}
      </p>
    );
  });
}
