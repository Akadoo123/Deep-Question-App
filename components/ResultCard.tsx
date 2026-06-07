"use client";

import { useState } from "react";

export interface InsightResult {
  category: string;
  categoryId: string;
  randomedFrom?: string;
  question: string;
  perspective: string;
  mental_model: string;
  real_example: string;
  reflection: string;
}

interface Props {
  result: InsightResult;
  onGenerateAgain: () => void;
  loading: boolean;
}

function Section({
  label,
  accent,
  children,
}: {
  label: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl p-5 ${accent ? "bg-gold/5 border border-gold/20" : "bg-charcoal-700"}`}>
      <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${accent ? "text-gold" : "text-slate-500"}`}>
        {label}
      </p>
      <div className="text-slate-200 leading-relaxed text-sm">{children}</div>
    </div>
  );
}

export default function ResultCard({ result, onGenerateAgain, loading }: Props) {
  const [copied, setCopied] = useState(false);

  const fullText = `
═══ Deep Question Companion ═══

หมวด: ${result.category}${result.randomedFrom ? ` (สุ่มได้)` : ""}

❓ คำถามวันนี้
${result.question}

💡 บทสนทนา / มุมมอง
${result.perspective}

🧠 Mental Model
${result.mental_model}

🌍 ตัวอย่างจากโลกจริง
${result.real_example}

🔍 คำถามไว้คิดต่อวันนี้
${result.reflection}
`.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = fullText;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="animate-slide-up">
      {/* Card header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          {result.randomedFrom && (
            <p className="text-xs text-gold/70 mb-1 tracking-wide">
              ∞ หมวดที่สุ่มได้คือ: {result.randomedFrom}
            </p>
          )}
          <h2 className="text-slate-300 text-sm font-medium tracking-wide">
            {result.category}
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium tracking-wide
              border border-charcoal-500 text-slate-400 hover:border-gold/40 hover:text-gold
              transition-all duration-200"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>

          <button
            onClick={onGenerateAgain}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium tracking-wide
              border border-gold/30 text-gold hover:bg-gold/10
              transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate Again
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6" />

      {/* Sections */}
      <div className="space-y-4">
        <Section label="คำถามวันนี้" accent>
          <p className="text-base font-medium text-slate-100 leading-relaxed">
            {result.question}
          </p>
        </Section>

        <Section label="บทสนทนา / มุมมอง">
          {result.perspective.split("\n").filter(Boolean).map((para, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>
          ))}
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Section label="Mental Model">
            <p>{result.mental_model}</p>
          </Section>

          <Section label="ตัวอย่างจากโลกจริง">
            <p>{result.real_example}</p>
          </Section>
        </div>

        <div className="rounded-xl p-5 bg-charcoal-800 border border-charcoal-500">
          <p className="text-xs font-bold tracking-widest uppercase mb-2 text-slate-500">
            คำถามไว้คิดต่อวันนี้
          </p>
          <p className="text-gold-light text-sm font-medium italic leading-relaxed">
            "{result.reflection}"
          </p>
        </div>
      </div>
    </div>
  );
}
