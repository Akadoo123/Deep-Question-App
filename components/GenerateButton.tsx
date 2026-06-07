"use client";

interface Props {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function GenerateButton({ onClick, loading, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative w-full sm:w-auto px-10 py-4 rounded-xl font-semibold text-sm tracking-widest uppercase
        transition-all duration-300
        ${
          disabled || loading
            ? "bg-charcoal-600 text-slate-600 border border-charcoal-500 cursor-not-allowed"
            : "bg-gold text-charcoal-900 hover:bg-gold-light shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(201,168,76,0.5)] active:scale-95"
        }
      `}
    >
      {loading ? (
        <span className="flex items-center gap-3 justify-center">
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce [animation-delay:300ms]" />
          </span>
          กำลัง Generate...
        </span>
      ) : (
        "Generate Deep Insight"
      )}
    </button>
  );
}
