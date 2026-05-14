export function LoadingSkeleton() {
  return (
    <div className="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6 space-y-3">
      <div className="h-4 bg-zinc-700 rounded animate-pulse w-1/4" />
      <div className="h-4 bg-zinc-700 rounded animate-pulse w-full" />
      <div className="h-4 bg-zinc-700 rounded animate-pulse w-5/6" />
      <div className="h-4 bg-zinc-700 rounded animate-pulse w-4/6" />
    </div>
  );
}
