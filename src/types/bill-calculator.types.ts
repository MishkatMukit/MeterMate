export type ApplianceCategory =
  | 'lights'
  | 'fans'
  | 'cooling'
  | 'kitchen'
  | 'entertainment'
  | 'laundry'
  | 'other'

export interface ApplianceDefinition {
  id: string
  category: ApplianceCategory
  nameKey: string
  wattage: number
  icon: string
}

export interface ApplianceEntry {
  applianceId: string
  quantity: number
  hoursPerDay: number
}

export interface QuickReply {
  label: string
  value: string
  icon?: string
}

export interface ChatMessage {
  id: string
  role: 'bot' | 'user'
  content: string
  timestamp: number
  quickReplies?: QuickReply[]
  component?: 'bill-summary' | 'stepper-quantity' | 'stepper-hours'
  componentProps?: Record<string, unknown>
}

export type ChatStep =
  | 'welcome'
  | 'ask-category'
  | 'pick-appliance'
  | 'ask-quantity'
  | 'ask-hours'
  | 'confirm-add-more'
  | 'ask-next-category'
  | 'show-result'
  | 'post-result'

export interface TariffSlab {
  upTo: number
  rate: number
  label: string
}

export interface SlabBreakdown {
  slab: string
  kwh: number
  rate: number
  cost: number
}

export interface ApplianceBreakdown {
  name?: string
  nameKey?: string
  quantity: number
  hoursPerDay: number
  kwh: number
  percentage: number
}

export interface BillResult {
  totalKwh: number
  energyCharge: number
  demandCharge: number
  meterRent: number
  vat: number
  totalBill: number
  slabBreakdown: SlabBreakdown[]
  applianceBreakdown: ApplianceBreakdown[]
}
