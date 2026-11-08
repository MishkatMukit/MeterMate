import type { TariffSlab } from '@/types/bill-calculator.types'

/**
 * Bangladesh BPDB prepaid electricity tariff slabs (2024-25).
 * Progressive/slab-based: each slab applies to the kWh range it covers.
 */
export const TARIFF_SLABS: TariffSlab[] = [
  { upTo: 75, rate: 4.19, label: '0–75' },
  { upTo: 200, rate: 5.72, label: '76–200' },
  { upTo: 300, rate: 6.00, label: '201–300' },
  { upTo: 400, rate: 6.34, label: '301–400' },
  { upTo: 600, rate: 9.94, label: '401–600' },
  { upTo: Infinity, rate: 11.46, label: '601+' },
]

/** Monthly meter rent for single-phase residential connection (৳) */
export const METER_RENT = 40

/** Demand charge per kW per month (৳) */
export const DEMAND_CHARGE_PER_KW = 45

/** VAT rate on energy charge */
export const VAT_RATE = 0.05
