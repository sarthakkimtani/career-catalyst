const PASTEL_COLORS = [
  "bg-pastel-purple",
  "bg-pastel-pink",
  "bg-pastel-green",
  "bg-pastel-yellow",
] as const;

export function getPastelColor(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash += input.charCodeAt(i);
  }

  return PASTEL_COLORS[hash % PASTEL_COLORS.length];
}
