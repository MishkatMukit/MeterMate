export interface MeterCodeEntry {
  code: string
  purpose: string
  purposeBn: string
  verified?: boolean
}

export interface MeterBrand {
  name: string
  providers: string[]
  models?: string[]
  verified?: boolean
  source?: string
  codes: MeterCodeEntry[]
}
