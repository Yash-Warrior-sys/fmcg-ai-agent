import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { chatWithAgent } from "@/lib/api/agent.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, User, Database, TrendingUp, Package, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FMCG BI Agent — Beverages Promotional Analytics" },
      {
        name: "description",
        content:
          "AI-powered Business Intelligence Agent for FMCG beverages — ask plain-English questions about promotions, sales, inventory and regional performance.",
      },
      { property: "og:title", content: "FMCG BI Agent — Beverages Promotional Analytics" },
      {
        property: "og:description",
        content:
          "Ask the agent about promotional performance, stock levels and regional sales — get instant, verified answers.",
      },
    ],
  }),
  component: Index,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  { icon: TrendingUp, label: "Bangalore B1G1 sales", q: "What were the sales in the North region during the B1G1 promotion vs baseline?" },
  { icon: Package, label: "Stockouts during promos", q: "Are any warehouses running low on stock because of recent promotions? Which SKUs are at risk?" },
  { icon: MapPin, label: "Best performing region", q: "Which region performed best during our promotional periods? Give a % breakdown and rank cities from best to worst." },
  { icon: Sparkles, label: "Highest sales lift", q: "Which beverage category had the highest sales lift during the promotional period?" },
];

function Index() {
  const chat = useServerFn(chatWithAgent);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    taRef.current?.focus();
  }, [loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await chat({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch (e) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: `⚠️ Agent error: ${e instanceof Error ? e.message : String(e)}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <header className="border-b border-white/10 backdrop-blur sticky top-0 z-10 bg-slate-950/70">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center shadow-lg shadow-indigo-500/30">
              <Bot className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">FMCG BI Agent</h1>
              <p className="text-xs text-slate-400">Beverages Category · Promotional Analytics · Q1 2024</p>
            </div>
          </div>
          <Badge variant="outline" className="border-emerald-400/30 text-emerald-300 bg-emerald-400/10 gap-1">
            <Database className="size-3" /> 769 rows live
          </Badge>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-4" style={{ minHeight: "calc(100vh - 73px)" }}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-1" style={{ maxHeight: "calc(100vh - 260px)" }}>
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="size-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center shadow-xl shadow-indigo-500/30 mb-5">
                <Sparkles className="size-7 text-white" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Ask anything about beverages performance</h2>
              <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                Plain English in, verified insights out. Powered by Text-to-Tool agent over the Gold Analytical Table.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-8 max-w-3xl mx-auto">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => send(s.q)}
                    className="text-left p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-indigo-400/40 transition group"
                  >
                    <div className="flex items-center gap-2 text-indigo-300 mb-1 text-xs font-medium uppercase tracking-wide">
                      <s.icon className="size-3.5" />
                      {s.label}
                    </div>
                    <div className="text-sm text-slate-200 group-hover:text-white">{s.q}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="size-8 shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center">
                  <Bot className="size-4 text-white" />
                </div>
              )}
              <Card
                className={`max-w-[80%] px-4 py-3 border-0 ${
                  m.role === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-white/[0.05] backdrop-blur border border-white/10 text-slate-100"
                }`}
              >
                {m.role === "assistant" ? (
                  <div className="prose prose-sm prose-invert max-w-none prose-table:my-2 prose-th:text-indigo-300 prose-headings:text-white prose-strong:text-white">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                )}
              </Card>
              {m.role === "user" && (
                <div className="size-8 shrink-0 rounded-lg bg-slate-700 grid place-items-center">
                  <User className="size-4 text-slate-200" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="size-8 shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center">
                <Bot className="size-4 text-white" />
              </div>
              <Card className="px-4 py-3 bg-white/[0.05] border border-white/10">
                <div className="flex gap-1.5 items-center">
                  <span className="size-2 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="size-2 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="size-2 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="text-xs text-slate-400 ml-2">Querying dataset…</span>
                </div>
              </Card>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="sticky bottom-4 flex gap-2 items-end p-2 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur shadow-2xl"
        >
          <Textarea
            ref={taRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask about sales, promotions, stock, regions…"
            rows={1}
            className="resize-none min-h-[44px] max-h-32 bg-transparent border-0 focus-visible:ring-0 text-slate-100 placeholder:text-slate-500"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-br from-indigo-500 to-cyan-400 hover:opacity-90 text-white border-0 shrink-0"
          >
            <Send className="size-4" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-slate-500 -mt-2">
          Human-in-the-loop · Confidence scoring · Accuracy prioritised over latency
        </p>
      </main>
    </div>
  );
}
