"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Minus,
  Send,
  RotateCcw,
  Bot,
  User,
  ExternalLink,
  FileDown,
  AlertTriangle,
  Info,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isFallback?: boolean;
  note?: string;
}

const SUGGESTED_PROMPTS = [
  "Tell me about Sameer’s experience",
  "Explain JourneyWise AI",
  "What backend systems has he built?",
  "Which projects demonstrate GenAI?",
  "Download his résumé",
];

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "Greetings! I'm **Cosmic Guide**, Sameer Ali's portfolio assistant. I can answer questions about his 2.5+ years of software engineering, GenAI projects, backend systems, and technical background strictly from his verified résumé.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (userText: string) => {
    const text = userText.trim();
    if (!text || loading) return;

    setErrorMessage(null);
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const apiPayload = {
        messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setErrorMessage("Rate limit reached. Please wait a moment before sending another message.");
        } else {
          setErrorMessage(data.error || "Unable to reach assistant. Please try again.");
        }
        setLoading(false);
        return;
      }

      const botMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.content,
        isFallback: data.isFallback,
        note: data.note,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setErrorMessage("Network error connecting to portfolio assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "init",
        role: "assistant",
        content:
          "Conversation reset. What would you like to know about Sameer's engineering experience or projects?",
      },
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          type="button"
          aria-label="Open Cosmic AI Portfolio Guide"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[var(--panel-solid)] border border-[var(--accent)] text-[var(--text)] shadow-[0_0_25px_rgba(var(--accent-rgb),0.25)] hover:shadow-[0_0_35px_rgba(var(--accent-rgb),0.4)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[var(--accent)]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wide">
            Ask Cosmic Guide
          </span>
          <span className="mono-label text-[10px] px-1.5 py-0.5 rounded bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--accent)] font-semibold">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`cosmic-panel rounded-2xl border border-[var(--border-strong)] bg-[var(--panel-solid)] shadow-2xl flex flex-col transition-all duration-300 ${
            isMinimized
              ? "w-72 h-14"
              : "w-[92vw] sm:w-[410px] h-[550px] max-h-[85vh]"
          }`}
          role="complementary"
          aria-label="AI Portfolio Assistant"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                  Cosmic Guide
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)]">
                  Verified Portfolio AI
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="w-7 h-7 rounded-lg hover:bg-[var(--panel)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                aria-label="Reset chat conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Maximize" : "Minimize"}
                className="w-7 h-7 rounded-lg hover:bg-[var(--panel)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                aria-label={isMinimized ? "Maximize chat window" : "Minimize chat window"}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="w-7 h-7 rounded-lg hover:bg-[var(--panel)] flex items-center justify-center text-[var(--text-muted)] hover:text-rose-400 transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Disclaimer bar */}
              <div className="px-3.5 py-1.5 bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] border-b border-[var(--border)] flex items-center gap-1.5 text-[10px] text-[var(--text-subtle)] font-mono">
                <Info className="w-3 h-3 text-[var(--accent)] flex-shrink-0" />
                <span className="truncate">
                  Grounded strictly in Sameer&apos;s verified résumé
                </span>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs select-text">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="w-6 h-6 rounded-full bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] flex-shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                          isUser
                            ? "bg-[var(--accent)] text-[var(--accent-dark)] font-medium rounded-tr-none shadow-md"
                            : "bg-[var(--panel)] border border-[var(--border)] text-[var(--text)] rounded-tl-none"
                        }`}
                      >
                        <div className="whitespace-pre-wrap space-y-1">
                          {renderFormattedText(msg.content)}
                        </div>

                        {msg.note && (
                          <div className="mt-2 pt-1.5 border-t border-[var(--border)] text-[10px] text-[var(--text-subtle)] font-mono flex items-center gap-1">
                            <Info className="w-3 h-3 text-[var(--accent)]" />
                            <span>{msg.note}</span>
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="w-6 h-6 rounded-full bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] flex-shrink-0 mt-0.5">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {loading && (
                  <div className="flex gap-2.5 items-center text-[var(--text-muted)]">
                    <div className="w-6 h-6 rounded-full bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="px-3.5 py-2 rounded-2xl bg-[var(--panel)] border border-[var(--border)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] font-mono text-[var(--text-muted)] ml-1">
                        Synthesizing verified facts...
                      </span>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 flex items-center gap-2 text-rose-300 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Prompts pills */}
              <div className="px-3 py-2 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_50%,transparent)] overflow-x-auto no-scrollbar flex items-center gap-1.5">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap bg-[var(--panel)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer flex-shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="p-3 border-t border-[var(--border)] bg-[var(--panel-solid)] flex items-center gap-2 rounded-b-2xl"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Sameer's projects or skills..."
                  maxLength={500}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] text-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-xl bg-[var(--accent)] text-[var(--accent-dark)] flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Simple markdown link and bold text renderer for assistant responses
 */
function renderFormattedText(text: string) {
  const parts = text.split("\n");
  return parts.map((line, lineIdx) => {
    // Process markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const elements: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        elements.push(line.substring(lastIndex, match.index));
      }
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
          className="text-[var(--accent)] underline font-semibold hover:opacity-80 inline-flex items-center gap-0.5 mx-0.5"
        >
          <span>{label}</span>
          {isDownload ? (
            <FileDown className="w-3 h-3 inline" />
          ) : (
            <ExternalLink className="w-2.5 h-2.5 inline" />
          )}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      elements.push(line.substring(lastIndex));
    }

    // Process bold text **bold**
    const renderedElements = elements.map((item, idx) => {
      if (typeof item !== "string") return item;
      const boldParts = item.split(/\*\*([^*]+)\*\*/g);
      return boldParts.map((bPart, bIdx) =>
        bIdx % 2 === 1 ? (
          <strong key={`b-${lineIdx}-${idx}-${bIdx}`} className="text-[var(--text)] font-bold">
            {bPart}
          </strong>
        ) : (
          bPart
        )
      );
    });

    return (
      <p key={`p-${lineIdx}`} className="min-h-[1em]">
        {renderedElements}
      </p>
    );
  });
}
