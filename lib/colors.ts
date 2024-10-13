export const colors = {
  primary: "#0f0d26",
  secondary: "#dbd9f2",
  tertiary: "	#f5a3ee",
  accent: "#a3eef5",
} as const;

export type ColorName = keyof typeof colors;

export function getColor(name: ColorName): string {
  return colors[name];
}
