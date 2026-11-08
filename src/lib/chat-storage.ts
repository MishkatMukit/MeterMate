import type { ChatMessage, BillResult } from '@/types/bill-calculator.types'
import type { GroqMessage } from '@/lib/groq'

const CHAT_STORAGE_KEY = 'metermate_bill_chat_session'

export interface PersistedChatSession {
  messages: ChatMessage[]
  groqHistory: GroqMessage[]
  billResult: BillResult | null
  updatedAt: number
}

/**
 * Load the persisted chat session from localStorage.
 */
export function loadPersistedChat(): PersistedChatSession | null {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedChatSession
    if (Array.isArray(parsed?.messages) && Array.isArray(parsed?.groqHistory)) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

/**
 * Save the active chat session to localStorage.
 */
export function savePersistedChat(data: {
  messages: ChatMessage[]
  groqHistory: GroqMessage[]
  billResult: BillResult | null
}): void {
  try {
    const payload: PersistedChatSession = {
      messages: data.messages,
      groqHistory: data.groqHistory,
      billResult: data.billResult,
      updatedAt: Date.now(),
    }
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* storage quota exceeded or disabled */
  }
}

/**
 * Clear the chat session from localStorage.
 */
export function clearPersistedChat(): void {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
