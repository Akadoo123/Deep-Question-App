"use client";

import { useState } from "react";
import CategorySelector from "@/components/CategorySelector";
import GenerateButton from "@/components/GenerateButton";
import ResultCard, { InsightResult } from "@/components/ResultCard";
import LoadingState from "@/components/LoadingState";
import { CategoryId } from "@/lib/categories";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InsightResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async (categoryOverride?: CategoryId) => {
    const category = categoryOverride ?? selectedCategory;
    if (!category) return;

    setLoading(true);
    setError(null);
    if (!categoryOverride) setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่");
        return;
      }

      setResult(data);
    } catch {
      setError("ไม่สามารถเชื่อมต่อได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAgain = () => {
    if (selectedCategory) generate(selectedCategory);
  };

  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Ambient gradient top */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs tracking-widest uppercase font-medium">
              AI-Powered Insight
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 tracking-tight mb-4">
            Deep Question
            <span className="text-gold"> Companion</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            รู้จักเข้าใจสิ่งต่างๆให้ลึกขึ้น
          </p>
        </header>

        {/* Section: Category */}
        <section className="mb-8">
          <p className="text-xs text-slate-500 tracking-widest uppercase font-semibold mb-4">
            เลือกหมวดหมู่
          </p>
          <CategorySelector
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            disabled={loading}
          />
        </section>

        {/* Section: Generate */}
        <section className="flex justify-center mb-12">
          <GenerateButton
            onClick={() => generate()}
            loading={loading}
            disabled={!selectedCategory}
          />
        </section>

        {/* Divider */}
        {(loading || result || error) && (
          <div className="h-px bg-gradient-to-r from-transparent via-charcoal-500 to-transparent mb-10" />
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-xl p-5 border border-red-900/50 bg-red-950/20 text-red-400 text-sm animate-fade-in">
            <p className="font-semibold mb-1">เกิดข้อผิดพลาด</p>
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingState />}

        {/* Result */}
        {result && !loading && (
          <ResultCard
            result={result}
            onGenerateAgain={handleGenerateAgain}
            loading={loading}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-charcoal-700 mt-20 py-8 text-center">
        <p className="text-slate-600 text-xs tracking-wide">
          Deep Question Companion · Powered by Claude AI
        </p>
      </footer>
    </div>
  );
}
