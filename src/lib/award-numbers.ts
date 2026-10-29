export const AWARD_NUMBERS = [
  { value: 5, label: "Business days to a decision", prefix: "" },
  { value: 250, label: "Clients served", prefix: "" },
  { value: 13, label: "Countries", prefix: "" },
  { value: 389, label: "Awards presented", prefix: "+" },
] as const;

export function countAwardNumber(value: number, elapsed: number, delay = 0) {
  const progress = Math.min(1, Math.max(0, (elapsed - delay) / 1200));
  return Math.round(value * (1 - (1 - progress) ** 3));
}