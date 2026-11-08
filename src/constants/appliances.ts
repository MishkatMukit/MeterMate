import type { ApplianceCategory, ApplianceDefinition } from '@/types/bill-calculator.types'

export const APPLIANCES: ApplianceDefinition[] = [
  // Lights
  { id: 'led-bulb', category: 'lights', nameKey: 'bill.appliance.ledBulb', wattage: 10, icon: 'Lightbulb' },
  { id: 'cfl', category: 'lights', nameKey: 'bill.appliance.cfl', wattage: 20, icon: 'Lightbulb' },
  { id: 'incandescent', category: 'lights', nameKey: 'bill.appliance.incandescent', wattage: 60, icon: 'Lightbulb' },

  // Fans
  { id: 'ceiling-fan', category: 'fans', nameKey: 'bill.appliance.ceilingFan', wattage: 75, icon: 'Fan' },
  { id: 'table-fan', category: 'fans', nameKey: 'bill.appliance.tableFan', wattage: 50, icon: 'Fan' },
  { id: 'exhaust-fan', category: 'fans', nameKey: 'bill.appliance.exhaustFan', wattage: 40, icon: 'Fan' },

  // Cooling
  { id: 'ac-1ton', category: 'cooling', nameKey: 'bill.appliance.ac1Ton', wattage: 1200, icon: 'Snowflake' },
  { id: 'ac-1.5ton', category: 'cooling', nameKey: 'bill.appliance.ac15Ton', wattage: 1800, icon: 'Snowflake' },
  { id: 'ac-2ton', category: 'cooling', nameKey: 'bill.appliance.ac2Ton', wattage: 2400, icon: 'Snowflake' },

  // Kitchen
  { id: 'refrigerator', category: 'kitchen', nameKey: 'bill.appliance.refrigerator', wattage: 150, icon: 'Refrigerator' },
  { id: 'rice-cooker', category: 'kitchen', nameKey: 'bill.appliance.riceCooker', wattage: 800, icon: 'CookingPot' },
  { id: 'microwave', category: 'kitchen', nameKey: 'bill.appliance.microwave', wattage: 1000, icon: 'Microwave' },
  { id: 'electric-stove', category: 'kitchen', nameKey: 'bill.appliance.electricStove', wattage: 1500, icon: 'Flame' },

  // Entertainment
  { id: 'tv-led', category: 'entertainment', nameKey: 'bill.appliance.tvLed', wattage: 60, icon: 'Tv' },
  { id: 'desktop', category: 'entertainment', nameKey: 'bill.appliance.desktop', wattage: 200, icon: 'Monitor' },
  { id: 'laptop', category: 'entertainment', nameKey: 'bill.appliance.laptop', wattage: 65, icon: 'Laptop' },
  { id: 'router', category: 'entertainment', nameKey: 'bill.appliance.router', wattage: 12, icon: 'Wifi' },

  // Laundry
  { id: 'iron', category: 'laundry', nameKey: 'bill.appliance.iron', wattage: 1000, icon: 'Heater' },
  { id: 'washing-machine', category: 'laundry', nameKey: 'bill.appliance.washingMachine', wattage: 400, icon: 'WashingMachine' },

  // Other
  { id: 'water-pump', category: 'other', nameKey: 'bill.appliance.waterPump', wattage: 750, icon: 'Droplets' },
  { id: 'mobile-charger', category: 'other', nameKey: 'bill.appliance.mobileCharger', wattage: 10, icon: 'Smartphone' },
  { id: 'geyser', category: 'other', nameKey: 'bill.appliance.geyser', wattage: 1500, icon: 'Thermometer' },
]

export interface CategoryInfo {
  key: ApplianceCategory
  nameKey: string
  icon: string
}

export const APPLIANCE_CATEGORIES: CategoryInfo[] = [
  { key: 'lights', nameKey: 'bill.category.lights', icon: 'Lightbulb' },
  { key: 'fans', nameKey: 'bill.category.fans', icon: 'Fan' },
  { key: 'cooling', nameKey: 'bill.category.cooling', icon: 'Snowflake' },
  { key: 'kitchen', nameKey: 'bill.category.kitchen', icon: 'CookingPot' },
  { key: 'entertainment', nameKey: 'bill.category.entertainment', icon: 'Tv' },
  { key: 'laundry', nameKey: 'bill.category.laundry', icon: 'Heater' },
  { key: 'other', nameKey: 'bill.category.other', icon: 'Zap' },
]

export const getApplianceById = (id: string): ApplianceDefinition | undefined =>
  APPLIANCES.find((a) => a.id === id)

export const getAppliancesByCategory = (category: ApplianceCategory): ApplianceDefinition[] =>
  APPLIANCES.filter((a) => a.category === category)
