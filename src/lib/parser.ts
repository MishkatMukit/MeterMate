import type { MeterInfo, ProviderName } from '../types/token.types'

/* ------------------------------------------------------------------ */
/*  Token extraction from SMS body                                    */
/* ------------------------------------------------------------------ */

export function extractTokenDigits(sms: string): string {
  const hyphenGroups = sms.match(/\d{4}(?:[-\s]\d{4}){4}/g)
  if (hyphenGroups && hyphenGroups.length > 0) {
    return hyphenGroups.map((g) => g.replace(/[-\s]/g, '')).join('')
  }

  const tokenKeyword = /token\s*(?:is|:)?/i
  const keywordMatch = tokenKeyword.exec(sms)
  let segment = keywordMatch ? sms.slice(keywordMatch.index + keywordMatch[0].length) : sms

  const stopLabel =
    /(Sq?u?n?No|Seq(?:uence)?\s*No|Meter\s*No|Vending\s*Amt|Recharge\s*Amount|Enrg\s*Cost|Total\s*Charge|Meter\s*Rent|Demand\s*Charge|VAT|Rebate|Trans(?:action)?\s*(?:ID|No))/i
  const stopMatch = stopLabel.exec(segment)
  if (stopMatch) {
    segment = segment.slice(0, stopMatch.index)
  }

  segment = stripTrailingText(segment)

  return segment.replace(/[^0-9]/g, '')
}

/* ------------------------------------------------------------------ */
/*  Field definitions per provider                                     */
/* ------------------------------------------------------------------ */

interface FieldDef {
  key: keyof MeterInfo
  patterns: RegExp[]
}

const COMMON_FIELDS: FieldDef[] = [
  { key: 'meterNumber', patterns: [/Meter\s*(?:No)?\.?\s*:?/i] },
  { key: 'rechargeAmount', patterns: [/Recharge\s*(?:Amt|Amount)\s*:?/i, /Vending\s*Amt\s*:?/i] },
  { key: 'energyCost', patterns: [/Enrg\s*Cost\s*:?/i, /Energy\s*Cost\s*:?/i] },
  { key: 'totalCharge', patterns: [/Total\s*Charge\s*:?/i] },
  { key: 'meterRent', patterns: [/Meter\s*Rent(?:\s*\w+)?\s*:?/i] },
  { key: 'demandCharge', patterns: [/Demand\s*Charge\s*:?/i] },
  { key: 'vat', patterns: [/\bVAT\s*:?/i] },
  { key: 'rebate', patterns: [/\bRebate\s*:?/i] },
  { key: 'transactionId', patterns: [/Trans(?:action)?\s*(?:ID|No)\s*:?/i, /Txn\s*(?:ID|No)?\s*:?/i] },
  { key: 'sequenceNumber', patterns: [/S[qe]u?\s*No\s*:?/i, /SquNo\s*:?/i, /Seq(?:uence)?\s*No\s*:?/i] },
]

const PROVIDER_FIELDS: Partial<Record<ProviderName, FieldDef[]>> = {
  BPDB: [
    { key: 'sequenceNumber', patterns: [/SquNo\s*:?/i, /S[qe]u?\s*No\s*:?/i, /Seq(?:uence)?\s*No\s*:?/i] },
    { key: 'meterNumber', patterns: [/Meter\s*(?:No)?\.?\s*:?/i, /Mtr\s*No\s*:?/i] },
    { key: 'rechargeAmount', patterns: [/Vending\s*Amt\s*:?/i, /Recharge\s*(?:Amt|Amount)\s*:?/i] },
    { key: 'energyCost', patterns: [/Enrg\s*Cost\s*:?/i, /Energy\s*Cost\s*:?/i] },
    { key: 'totalCharge', patterns: [/Total\s*Charge\s*:?/i] },
    { key: 'meterRent', patterns: [/Meter\s*Rent(?:\s*\w+)?\s*:?/i] },
    { key: 'demandCharge', patterns: [/Demand\s*Charge\s*:?/i] },
    { key: 'vat', patterns: [/\bVAT\s*:?/i] },
    { key: 'rebate', patterns: [/\bRebate\s*:?/i] },
    { key: 'transactionId', patterns: [/Trans(?:action)?\s*(?:ID|No)\s*:?/i] },
  ],
}

/* ------------------------------------------------------------------ */
/*  Helper: strip trailing non-essential text                          */
/* ------------------------------------------------------------------ */

const TRAILING_PATTERNS = [
  /https?:\/\/\S+/i,
  /www\.\S+/i,
  /helpline\s*:?\s*\d[\d\s-]*/i,
  /customer\s*(?:care|support|service)\s*:?\s*\d[\d\s-]*/i,
  /contact\s*(?:us|number)?\s*:?\s*\d[\d\s-]*/i,
  /powered\s+by\s+\S+/i,
  /Sent\s+from\s+\S+/i,
  /Terms\s+(?:&\s*)?Conditions[\s\S]*$/i,
  /For\s+(?:any\s+)?(?:query|help|assistance|info)[\s\S]*$/i,
  /Thank\s+you\s+for\s+using\s+\S+/i,
]

function stripTrailingText(text: string): string {
  let cleaned = text.trim()
  for (const pattern of TRAILING_PATTERNS) {
    const match = pattern.exec(cleaned)
    if (match && match.index > cleaned.length / 2) {
      cleaned = cleaned.slice(0, match.index).trim()
    }
  }
  return cleaned
}

/* ------------------------------------------------------------------ */
/*  Helper: extract the first numeric value (int or decimal)           */
/* ------------------------------------------------------------------ */

function extractNumericValue(raw: string): string | undefined {
  const trimmed = raw.trim()
  if (!trimmed) return undefined
  const numeric = trimmed.match(/\d+(?:\.\d+)?/)
  return numeric ? numeric[0] : undefined
}

/* ------------------------------------------------------------------ */
/*  Helper: read a field's raw value from SMS given its label match    */
/* ------------------------------------------------------------------ */

function readFieldValue(sms: string, labelEnd: number, nextLabelStart: number): string {
  const raw = sms.slice(labelEnd, nextLabelStart)
  const trimmed = raw.trim()
  const stopAt = trimmed.search(/[,.\n\r]+(?:\s|$)/)
  return stopAt > 0 ? trimmed.slice(0, stopAt).trim() : trimmed
}

/* ------------------------------------------------------------------ */
/*  Meter info extraction — provider-aware                             */
/* ------------------------------------------------------------------ */

export function extractMeterInfo(sms: string, provider?: ProviderName): MeterInfo {
  const cleaned = stripTrailingText(sms)
  const fields = provider && PROVIDER_FIELDS[provider] ? PROVIDER_FIELDS[provider]! : COMMON_FIELDS

  type MatchEntry = { key: keyof MeterInfo; start: number; end: number }
  const found: MatchEntry[] = []

  for (const { key, patterns } of fields) {
    for (const regex of patterns) {
      const match = regex.exec(cleaned)
      if (match) {
        found.push({ key, start: match.index, end: match.index + match[0].length })
        break
      }
    }
  }

  found.sort((a, b) => a.start - b.start)

  const info: MeterInfo = {}
  for (let i = 0; i < found.length; i++) {
    const current = found[i]
    const next = found[i + 1]
    const rawValue = readFieldValue(cleaned, current.end, next ? next.start : cleaned.length)
    const numeric = extractNumericValue(rawValue)
    if (numeric !== undefined) {
      info[current.key] = numeric
    }
  }

  return info
}
