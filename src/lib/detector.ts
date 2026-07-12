import type { ProviderName } from '../types/token.types';

// Plain substring match (case-insensitive) rather than \b-bounded regex,
// because real SMS text runs provider codes directly into the next word
// with no space (e.g. "BPDBprepaid" — a \bBPDB\b regex would miss this,
// since there's no word boundary between the "B" and the "p" that follows).
const PROVIDER_PATTERNS: Record<Exclude<ProviderName, 'UNKNOWN'>, RegExp> = {
  BPDB: /BPDB/i,
  BREB: /BREB|PALLI\s*BIDYUT/i,
  DESCO: /DESCO/i,
  DPDC: /DPDC/i,
  NESCO: /NESCO/i,
  WZPDCL: /WZPDCL/i,
};

export function detectProvider(sms: string): ProviderName {
  for (const [name, pattern] of Object.entries(PROVIDER_PATTERNS) as [
    Exclude<ProviderName, 'UNKNOWN'>,
    RegExp,
  ][]) {
    if (pattern.test(sms)) return name;
  }
  return 'UNKNOWN';
}
