"use client";

import { useState } from "react";
import { CULTURES } from "@/lib/cultures";

interface OutputCardProps {
  analogy: string;
  culture: string;
  originalEvent: string;
}

export function OutputCard({ analogy, culture }: OutputCardProps) {
  const [copied, setCopied] = useState(false);
  const cultureData = CULTURES.find((c) => c.key === culture);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(analogy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6 relative animate-fadeIn">
      <button
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded p-1"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>

      {cultureData && (
        <span className="inline-block text-indigo-400 text-xs font-semibold uppercase tracking-wide bg-indigo-400/10 px-2.5 py-1 rounded-full mb-4">
          {cultureData.emoji} {cultureData.label}
        </span>
      )}

      <p className="text-zinc-100 text-base leading-relaxed pr-6">{analogy}</p>
    </div>
  );
}
