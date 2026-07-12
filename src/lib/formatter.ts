/** Splits a digit string into consecutive 20-digit token segments. */
export function splitIntoTokens(digits: string): string[] {
  const tokens: string[] = [];
  for (let i = 0; i < digits.length; i += 20) {
    tokens.push(digits.slice(i, i + 20));
  }
  return tokens;
}

/** Formats a 20-digit token into 4-digit blocks for display, e.g. "3217 4077 7320 1949 8463". */
export function formatTokenForDisplay(token: string): string {
  return token.match(/.{1,4}/g)?.join(' ') ?? token;
}
