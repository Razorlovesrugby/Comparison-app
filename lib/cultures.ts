export const CULTURES = [
  {
    key: "pop-culture",
    label: "Pop Culture",
    emoji: "🎤",
    description: "Taylor Swift, celebrity drama, stan Twitter",
  },
  {
    key: "nrl-rugby",
    label: "NRL / Rugby",
    emoji: "🏉",
    description: "Trades, Origin, club loyalty, footy culture",
  },
  {
    key: "politics",
    label: "Politics",
    emoji: "🏛️",
    description: "Party dynamics, elections, political betrayal",
  },
  {
    key: "corporate",
    label: "Corporate Office Life",
    emoji: "💼",
    description: "Restructures, KPIs, passive-aggressive meetings",
  },
  {
    key: "nba",
    label: "NBA / Basketball",
    emoji: "🏀",
    description: "Trades, superteams, player empowerment, locker room drama",
  },
] as const;

export type CultureKey = typeof CULTURES[number]["key"];
