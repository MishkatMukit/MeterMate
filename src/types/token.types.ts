export type ProviderName =
  | 'BPDB'
  | 'BREB'
  | 'DESCO'
  | 'DPDC'
  | 'NESCO'
  | 'WZPDCL'
  | 'UNKNOWN';

export interface MeterInfo {
  meterNumber?: string;
  rechargeAmount?: string;
  energyCost?: string;
  totalCharge?: string;
  meterRent?: string;
  demandCharge?: string;
  vat?: string;
  rebate?: string;
  transactionId?: string;
  sequenceNumber?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  code?: 'no_digits' | 'wrong_length';
  digitCount?: number;
}

export interface ParseResult {
  provider: ProviderName;
  rawDigits: string;
  tokens: string[];
  formattedTokens: string[];
  meterInfo: MeterInfo;
  validation: ValidationResult;
}
