"use client";

import { useState } from "react";
import { CultureSelector } from "./CultureSelector";
import { TranslateButton } from "./TranslateButton";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { OutputCard } from "./OutputCard";

export function TranslatorForm() {
  const [eventInput, setEventInput] = useState<string>("");
  const [selectedCulture, setSelectedCulture] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analogyResult, setAnalogyResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!eventInput.trim() || !selectedCulture) return;
    setIsLoading(true);
    setAnalogyResult(null);
    setError(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: eventInput, culture: selectedCulture }),
      });
      if (!res.ok) throw new Error("Translation failed");
      const data = await res.json();
      setAnalogyResult(data.analogy);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-4">
      <textarea
        value={eventInput}
        onChange={(e) => {
          setEventInput(e.target.value);
          if (analogyResult) setAnalogyResult(null);
          if (error) setError(null);
        }}
        placeholder="Paste a news event here..."
        rows={4}
        disabled={isLoading}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 px-4 py-3 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40"
      />

      <CultureSelector
        value={selectedCulture}
        onChange={setSelectedCulture}
        disabled={isLoading}
      />

      <TranslateButton
        isLoading={isLoading}
        disabled={isLoading || !eventInput.trim() || !selectedCulture}
        onClick={handleTranslate}
      />

      {isLoading && <LoadingSkeleton />}
      {!isLoading && analogyResult !== null && (
        <OutputCard
          analogy={analogyResult}
          culture={selectedCulture}
          originalEvent={eventInput}
        />
      )}
      {!isLoading && error !== null && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  );
}
