import type { ApplianceEntry, BillResult, SlabBreakdown, ApplianceBreakdown } from '@/types/bill-calculator.types'
import { getApplianceById } from '@/constants/appliances'
import { TARIFF_SLABS, METER_RENT, DEMAND_CHARGE_PER_KW, VAT_RATE } from '@/constants/tariffs'

const DAYS_PER_MONTH = 30

/**
 * Calculate the monthly kWh consumption for a single appliance entry.
 */
export function calculateApplianceKwh(entry: ApplianceEntry): number {
  const appliance = getApplianceById(entry.applianceId)
  if (!appliance) return 0
  return (appliance.wattage * entry.quantity * entry.hoursPerDay * DAYS_PER_MONTH) / 1000
}

/**
 * Calculate the energy charge using progressive tariff slabs.
 * Each slab applies only to the kWh within its range.
 */
export function calculateEnergyCharge(totalKwh: number): {
  total: number
  breakdown: SlabBreakdown[]
} {
  let remaining = totalKwh
  let total = 0
  let previousThreshold = 0
  const breakdown: SlabBreakdown[] = []

  for (const slab of TARIFF_SLABS) {
    if (remaining <= 0) break

    const slabSize = slab.upTo === Infinity ? remaining : slab.upTo - previousThreshold
    const kwhInSlab = Math.min(remaining, slabSize)
    const cost = kwhInSlab * slab.rate

    breakdown.push({
      slab: slab.label,
      kwh: round2(kwhInSlab),
      rate: slab.rate,
      cost: round2(cost),
    })

    total += cost
    remaining -= kwhInSlab
    previousThreshold = slab.upTo
  }

  return { total: round2(total), breakdown }
}

/**
 * Calculate the peak connected load in kW (sum of all wattages × quantities).
 * Used for demand charge estimation.
 */
export function calculatePeakKw(entries: ApplianceEntry[]): number {
  return entries.reduce((total, entry) => {
    const appliance = getApplianceById(entry.applianceId)
    if (!appliance) return total
    return total + (appliance.wattage * entry.quantity) / 1000
  }, 0)
}

/**
 * Calculate the full monthly bill from raw appliance items (e.g. from Groq AI or custom input).
 */
export function calculateBillFromItems(
  items: Array<{ name: string; wattage: number; quantity: number; hoursPerDay: number }>,
): BillResult {
  const totalKwh = items.reduce((sum, item) => {
    return sum + (item.wattage * item.quantity * item.hoursPerDay * DAYS_PER_MONTH) / 1000
  }, 0)
  const roundedTotalKwh = round2(totalKwh)

  const applianceBreakdown: ApplianceBreakdown[] = items.map((item) => {
    const kwh = (item.wattage * item.quantity * item.hoursPerDay * DAYS_PER_MONTH) / 1000
    return {
      name: item.name,
      quantity: item.quantity,
      hoursPerDay: item.hoursPerDay,
      kwh: round2(kwh),
      percentage: totalKwh > 0 ? round2((kwh / totalKwh) * 100) : 0,
    }
  })

  const { total: energyCharge, breakdown: slabBreakdown } = calculateEnergyCharge(roundedTotalKwh)

  const peakKw = items.reduce((sum, item) => sum + (item.wattage * item.quantity) / 1000, 0)
  const demandCharge = round2(Math.ceil(peakKw) * DEMAND_CHARGE_PER_KW)
  const vat = round2(energyCharge * VAT_RATE)
  const totalBill = round2(energyCharge + demandCharge + METER_RENT + vat)

  return {
    totalKwh: roundedTotalKwh,
    energyCharge,
    demandCharge,
    meterRent: METER_RENT,
    vat,
    totalBill,
    slabBreakdown,
    applianceBreakdown,
  }
}

/**
 * Calculate the full monthly bill from a list of appliance entries.
 */
export function calculateBill(entries: ApplianceEntry[]): BillResult {
  // Per-appliance breakdown
  const totalKwh = entries.reduce((sum, entry) => sum + calculateApplianceKwh(entry), 0)
  const roundedTotalKwh = round2(totalKwh)

  const applianceBreakdown: ApplianceBreakdown[] = entries.map((entry) => {
    const appliance = getApplianceById(entry.applianceId)
    const kwh = calculateApplianceKwh(entry)
    return {
      nameKey: appliance?.nameKey ?? entry.applianceId,
      quantity: entry.quantity,
      hoursPerDay: entry.hoursPerDay,
      kwh: round2(kwh),
      percentage: totalKwh > 0 ? round2((kwh / totalKwh) * 100) : 0,
    }
  })

  // Energy charge with slab breakdown
  const { total: energyCharge, breakdown: slabBreakdown } = calculateEnergyCharge(roundedTotalKwh)

  // Demand charge based on peak load
  const peakKw = calculatePeakKw(entries)
  const demandCharge = round2(Math.ceil(peakKw) * DEMAND_CHARGE_PER_KW)

  // VAT on energy charge
  const vat = round2(energyCharge * VAT_RATE)

  // Total
  const totalBill = round2(energyCharge + demandCharge + METER_RENT + vat)

  return {
    totalKwh: roundedTotalKwh,
    energyCharge,
    demandCharge,
    meterRent: METER_RENT,
    vat,
    totalBill,
    slabBreakdown,
    applianceBreakdown,
  }
}

/**
 * Format a bill result as plain text for clipboard copying.
 */
export function formatBillAsText(
  result: BillResult,
  translate: (key: string, ...args: string[]) => string,
): string {
  const lines: string[] = []

  lines.push(`📊 ${translate('bill.summary.title')}`)
  lines.push('━'.repeat(30))
  lines.push(`${translate('bill.summary.totalUsage')}: ${result.totalKwh} kWh`)
  lines.push('')

  // Appliance breakdown
  lines.push(`📋 ${translate('bill.summary.applianceBreakdown')}`)
  for (const item of result.applianceBreakdown) {
    const name = item.nameKey ? translate(item.nameKey) : item.name || 'Appliance'
    lines.push(`  ${name}: ${item.quantity}× ${item.hoursPerDay}h → ${item.kwh} kWh (${item.percentage}%)`)
  }
  lines.push('')

  // Cost breakdown
  lines.push(`💰 ${translate('bill.summary.costBreakdown')}`)
  lines.push(`  ${translate('bill.summary.energyCharge')}: ৳${result.energyCharge.toLocaleString()}`)
  lines.push(`  ${translate('bill.summary.demandCharge')}: ৳${result.demandCharge.toLocaleString()}`)
  lines.push(`  ${translate('bill.summary.meterRent')}: ৳${result.meterRent}`)
  lines.push(`  ${translate('bill.summary.vat')}: ৳${result.vat.toLocaleString()}`)
  lines.push('━'.repeat(30))
  lines.push(`  ${translate('bill.summary.total')}: ৳${result.totalBill.toLocaleString()}`)
  lines.push('')
  lines.push(`⚠️ ${translate('bill.summary.note')}`)

  return lines.join('\n')
}

/** Round to 2 decimal places. */
function round2(n: number): number {
  return Math.round(n * 100) / 100
}
