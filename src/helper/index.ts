export *  from "./getNameChar"
export *  from "./exportDataBattle"
export *  from "./importDataBattle"

/**
 * Định dạng số với K, M, B để dễ đọc hơn
 * @param value - Giá trị số cần định dạng
 * @param decimals - Số chữ số thập phân (mặc định: 1)
 * @returns Chuỗi số được định dạng (vd: 1.2K, 5.6M, 3B)
 */
export function formatNumber(value: number, decimals: number = 1): string {
  if (!isFinite(value) || value === 0) return "0";
  
  const absValue = Math.abs(value);
  const multiplier = Math.pow(10, decimals);
  
  let formattedValue: string;
  let suffix: string = "";
  
  if (absValue >= 1_000_000_000) {
    // Tỷ (Billion)
    formattedValue = (Math.round((value / 1_000_000_000) * multiplier) / multiplier).toFixed(decimals);
    suffix = "B";
  } else if (absValue >= 1_000_000) {
    // Triệu (Million)
    formattedValue = (Math.round((value / 1_000_000) * multiplier) / multiplier).toFixed(decimals);
    suffix = "M";
  } else if (absValue >= 1_000) {
    // Nghìn (Thousand)
    formattedValue = (Math.round((value / 1_000) * multiplier) / multiplier).toFixed(decimals);
    suffix = "K";
  } else {
    // Số nhỏ hơn 1000 - hiển thị bình thường
    formattedValue = (Math.round(value * multiplier) / multiplier).toFixed(decimals);
  }
  
  // Loại bỏ các số 0 thừa ở cuối
  formattedValue = formattedValue.replace(/\.?0+$/, "");
  
  return suffix ? `${formattedValue}${suffix}` : formattedValue;
}