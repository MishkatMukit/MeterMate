import type { ValidationResult } from '../types/token.types';

export function validateDigits(digits: string): ValidationResult {
  if (!digits || digits.length === 0) {
    return { isValid: false, code: 'no_digits', message: 'No numeric token data found in this message.' };
  }
  if (digits.length % 20 !== 0) {
    return {
      isValid: false,
      code: 'wrong_length',
      digitCount: digits.length,
      message: `Found ${digits.length} digits — expected a multiple of 20. Check for a missing or extra digit.`,
    };
  }
  return { isValid: true };
}
