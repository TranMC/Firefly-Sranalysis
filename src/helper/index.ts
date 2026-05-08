export *  from "./getNameChar"
export *  from "./exportDataBattle"
export *  from "./importDataBattle"

export function formatNumber(value: number, decimals: number = 1): string {
  const multiplier = Math.pow(10, decimals);
  const rounded = Math.round(value * multiplier) / multiplier;
  return rounded.toFixed(decimals);
}