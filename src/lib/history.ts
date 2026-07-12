import type { MeterInfo, ProviderName } from '@/types/types'

export interface HistoryEntry {
  id: string
  timestamp: number
  provider: ProviderName
  tokenCount: number
  formattedTokens: string[]
  meterInfo: MeterInfo
  rawSms: string
}

const STORAGE_KEY = 'meter-mate-history'
const MAX_ENTRIES = 50

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as HistoryEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function addHistoryEntry(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
  const history = getHistory()
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  }
  history.unshift(newEntry)
  if (history.length > MAX_ENTRIES) {
    history.length = MAX_ENTRIES
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    /* storage full or unavailable — silently ignore */
  }
}

export function removeHistoryEntry(id: string): void {
  const history = getHistory().filter((e) => e.id !== id)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    /* ignore */
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
