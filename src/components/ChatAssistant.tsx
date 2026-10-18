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
  Copy,
  Check,
  CornerDownLeft,
  ChevronDown,
  Maximize2,
  Terminal,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isFallback?: boolean;
  note?: string;
  copied?: boolean;
}

const SUGGESTED_PROMPTS = [
  "Tell me about Sameer's experience",
  "Markoknow Silver Belt Certificate & LOR",
  "How does Growza work?",
  "What is MPRAR Central CRM?",
  "Explain JourneyWise AI & Interview Prep",
  "Kuanta AI & 3M+ Milvus vectors",
  "Download Sameer's résumé",
];

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "Hi! I'm **Sameer's Portfolio AI**. Ask me anything about his **2.5+ years of engineering**, production projects (**Growza**, **MPRAR Central**, **JourneyWise**, **Movie Library**, **Kuanta**), or tech stack.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
          "Conversation reset. What would you like to know about Sameer's engineering experience, backend systems, or projects?",
      },
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* Floating Modern Pill Launcher */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          type="button"
          aria-label="Open AI Portfolio Assistant"
          className="group relative flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-full bg-slate-900/95 border border-slate-700/80 hover:border-emerald-500 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer backdrop-blur-xl"
        >
          {/* Sameer Portrait Launcher Avatar */}
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-slate-700 group-hover:border-emerald-400 transition-colors flex-shrink-0 shadow-sm">
            <img
              src="/images/sameer.jpg"
              alt="Sameer Ali"
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900 shadow-[0_0_6px_#34d399]" />
          </div>

          <div className="text-left">
            <div className="text-[11px] sm:text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>Ask AI Guide</span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                LIVE
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400">
              Interactive Guide
            </div>
          </div>
        </button>
      )}

      {/* Modern High-End Chat Window */}
      {isOpen && (
        <div
          className={`cosmic-panel rounded-2xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--panel-solid)_96%,transparent)] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col transition-all duration-300 overflow-hidden ${
            isMinimized
              ? "w-72 sm:w-80 h-14"
              : "w-[92vw] sm:w-[440px] h-[520px] sm:h-[580px] max-h-[78vh] sm:max-h-[86vh]"
          }`}
          role="complementary"
          aria-label="AI Portfolio Assistant"
        >
          {/* Top Window Header */}
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between bg-[color-mix(in_srgb,var(--bg)_80%,transparent)]">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--border-strong)] flex items-center justify-center flex-shrink-0 shadow-sm">
                <img
                  src="/images/sameer.jpg"
                  alt="Sameer Ali"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[var(--panel-solid)] animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                  <span>Sameer AI Assistant</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Online
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                  <span>Knowledge Base Live</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="w-7 h-7 rounded-lg hover:bg-[var(--panel)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                aria-label="Reset chat conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
                className="w-7 h-7 rounded-lg hover:bg-[var(--panel)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                aria-label={isMinimized ? "Maximize chat window" : "Minimize chat window"}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="w-7 h-7 rounded-lg hover:bg-[var(--panel)] flex items-center justify-center text-[var(--text-muted)] hover:text-rose-400 transition-colors cursor-pointer"
                aria-label="Close chat window"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Model status banner */}
              <div className="px-3.5 py-1.5 bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] border-b border-[var(--border)] flex items-center justify-between text-[10px] text-[var(--text-subtle)] font-mono">
                <span className="flex items-center gap-1.5 truncate">
                  <Terminal className="w-3 h-3 text-[var(--accent)] flex-shrink-0" />
                  <span className="truncate">AI Assistant · Powered by OpenRouter</span>
                </span>
                <span className="text-emerald-400 font-semibold flex-shrink-0">● Online</span>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs select-text no-scrollbar">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  const isCopied = copiedId === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"} group/msg`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-[var(--border)] flex-shrink-0 mt-0.5 shadow-sm">
                          <img
                            src="/images/sameer.jpg"
                            alt="Sameer Ali AI"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed relative ${
                          isUser
                            ? "bg-[color-mix(in_srgb,var(--accent)_92%,black)] text-[var(--accent-dark)] font-medium rounded-tr-sm shadow-md"
                            : "bg-[var(--panel)] border border-[var(--border)] text-[var(--text)] rounded-tl-sm shadow-sm"
                        }`}
                      >
                        <div className="space-y-1 text-xs">
                          {renderFormattedText(msg.content)}
                        </div>

                        {/* Bot message footer with copy button and note */}
                        {!isUser && (
                          <div className="mt-2 pt-2 border-t border-[var(--border)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                            <span className="flex items-center gap-1 text-[var(--text-subtle)]">
                              {msg.note ? (
                                <>
                                  <Info className="w-2.5 h-2.5 text-[var(--accent)]" />
                                  <span className="truncate">{msg.note}</span>
                                </>
                              ) : (
                                <span>Portfolio Assistant</span>
                              )}
                            </span>

                            <button
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="p-1 rounded hover:bg-[var(--panel-solid)] text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="Copy response"
                              aria-label="Copy assistant answer"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400 text-[9px]">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span className="text-[9px]">Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-lg bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] flex-shrink-0 mt-0.5">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {loading && (
                  <div className="flex gap-2.5 items-center text-[var(--text-muted)] animate-in fade-in duration-200">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-[var(--border)] flex-shrink-0 shadow-sm">
                      <img
                        src="/images/sameer.jpg"
                        alt="Sameer Ali AI"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="px-4 py-2.5 rounded-2xl bg-[var(--panel)] border border-[var(--border)] flex items-center gap-2 rounded-tl-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] font-mono text-[var(--text-muted)] ml-1">
                        Finding answer from resume & code...
                      </span>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 flex items-center gap-2 text-rose-300 text-xs">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Carousel */}
              <div className="px-3 py-2 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] overflow-x-auto no-scrollbar flex items-center gap-1.5">
                <span className="text-[9px] font-mono uppercase text-[var(--text-subtle)] mr-1 flex-shrink-0">
                  Quick Ask:
                </span>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap bg-[var(--panel)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer flex-shrink-0 hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="p-3 border-t border-[var(--border)] bg-[var(--panel-solid)] flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Sameer's projects, stack, or experience..."
                    maxLength={500}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] text-xs placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="px-3 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-dark)] font-bold text-xs flex items-center justify-center gap-1 hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer flex-shrink-0 shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
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
 * Enhanced markdown link, code, and bold renderer
 */
function renderFormattedText(text: string) {
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    // Check if line is bullet item
    const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
    const cleanLine = isBullet ? line.trim().replace(/^[-•]\s*/, "") : line;

    // Process markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const elements: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(cleanLine)) !== null) {
      if (match.index > lastIndex) {
        elements.push(cleanLine.substring(lastIndex, match.index));
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

    if (lastIndex < cleanLine.length) {
      elements.push(cleanLine.substring(lastIndex));
    }

    // Process inline code `code` and bold **bold**
    const renderedElements = elements.map((item, idx) => {
      if (typeof item !== "string") return item;

      // Handle bold
      const boldParts = item.split(/\*\*([^*]+)\*\*/g);
      return boldParts.map((bPart, bIdx) => {
        if (bIdx % 2 === 1) {
          return (
            <strong key={`b-${lineIdx}-${idx}-${bIdx}`} className="text-[var(--text)] font-bold">
              {bPart}
            </strong>
          );
        }

        // Handle inline code `code`
        const codeParts = bPart.split(/`([^`]+)`/g);
        return codeParts.map((cPart, cIdx) =>
          cIdx % 2 === 1 ? (
            <code
              key={`c-${lineIdx}-${idx}-${bIdx}-${cIdx}`}
              className="px-1.5 py-0.5 rounded bg-[var(--panel-solid)] text-[var(--accent)] font-mono text-[10px] border border-[var(--border)]"
            >
              {cPart}
            </code>
          ) : (
            cPart
          )
        );
      });
    });

    if (isBullet) {
      return (
        <div key={`p-${lineIdx}`} className="flex items-start gap-2 pl-1 my-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
          <span className="flex-1 leading-relaxed">{renderedElements}</span>
        </div>
      );
    }

    return (
      <p key={`p-${lineIdx}`} className="min-h-[1em] leading-relaxed">
        {renderedElements}
      </p>
    );
  });
}
