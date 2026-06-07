"use client";

import { CATEGORIES, CategoryId } from "@/lib/categories";

interface Props {
  selected: CategoryId | null;
  onSelect: (id: CategoryId) => void;
  disabled?: boolean;
}

export default function CategorySelector({ selected, onSelect, disabled }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {CATEGORIES.map((cat) => {
        const isSelected = selected === cat.id;
        const isRandom = cat.id === "random";

        return (
          <button
            key={cat.id}
            onClick={() => !disabled && onSelect(cat.id)}
            disabled={disabled}
            className={`
              relative group text-left px-4 py-4 rounded-xl border transition-all duration-200
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              ${isSelected
                ? "border-gold bg-gold/10 shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                : "border-charcoal-600 bg-charcoal-700 hover:border-gold/40 hover:bg-charcoal-600"
              }
              ${isRandom ? "sm:col-span-2 lg:col-span-1" : ""}
            `}
          >
            {isSelected && (
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold animate-pulse" />
            )}
            <span className="block text-xl mb-2 opacity-80">{cat.icon}</span>
            <span
              className={`block text-sm font-semibold tracking-wide mb-1 ${
                isSelected ? "text-gold" : "text-slate-200"
              }`}
            >
              {cat.label}
            </span>
            <span className="block text-xs text-slate-500 leading-relaxed">
              {cat.subtitle}
            </span>
          </button>
        );
      })}
    </div>
  );
}
