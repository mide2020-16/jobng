/**
 * Normalise a Nigerian phone number to digits-only international format (234…).
 */
export function normalizeNigerianPhone(raw: string, countryCode = "+234"): string {
  if (!raw) return "";

  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);

  const cc = countryCode.replace(/\D/g, "");

  if (digits.startsWith(cc) && digits.length >= cc.length + 10) {
    return digits;
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    return `${cc}${digits.slice(1)}`;
  }

  if (digits.length === 10 && /^[789]/.test(digits)) {
    return `${cc}${digits}`;
  }

  if (cc === "234" && !digits.startsWith("234")) {
    return `${cc}${digits}`;
  }

  return digits;
}
