import { CULTURES } from "@/lib/cultures";

interface CultureSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function CultureSelector({ value, onChange, disabled }: CultureSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40 cursor-pointer"
    >
      <option value="" disabled>
        Select a culture...
      </option>
      {CULTURES.map((culture) => (
        <option key={culture.key} value={culture.key}>
          {culture.emoji} {culture.label}
        </option>
      ))}
    </select>
  );
}
