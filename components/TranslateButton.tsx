interface TranslateButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function TranslateButton({ isLoading, disabled, onClick }: TranslateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold px-6 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Translating...
        </>
      ) : (
        "Translate"
      )}
    </button>
  );
}
