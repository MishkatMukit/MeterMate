import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { ParseResult, ValidationResult } from '@/types/types'
import { detectProvider } from '@/lib/detector'
import { extractTokenDigits, extractMeterInfo } from '@/lib/parser'
import { splitIntoTokens, formatTokenForDisplay } from '@/lib/formatter'
import { validateDigits } from '@/lib/validator'
import { addHistoryEntry } from '@/lib/history'

interface TokenContextValue {
  parseResult: ParseResult | null
  validation: ValidationResult | null
  currentIndex: number
  inputText: string
  setInputText: (text: string) => void
  parse: () => void
  setCurrentIndex: (index: number) => void
  reset: () => void
}

const TokenContext = createContext<TokenContextValue | undefined>(undefined)

export function TokenProvider({ children }: { children: ReactNode }) {
  const [inputText, setInputText] = useState('')
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const reset = useCallback(() => {
    setInputText('')
    setParseResult(null)
    setValidation(null)
    setCurrentIndex(0)
  }, [])

  const parse = useCallback(() => {
    const provider = detectProvider(inputText)
    const rawDigits = extractTokenDigits(inputText)
    const meterInfo = extractMeterInfo(inputText, provider)
    const validation = validateDigits(rawDigits)
    setValidation(validation)

    if (validation.isValid) {
      const tokens = splitIntoTokens(rawDigits)
      const formattedTokens = tokens.map(formatTokenForDisplay)
      const result: ParseResult = { provider, rawDigits, tokens, formattedTokens, meterInfo, validation }
      setParseResult(result)
      setCurrentIndex(0)
      addHistoryEntry({
        provider,
        tokenCount: tokens.length,
        formattedTokens,
        meterInfo,
        rawSms: inputText,
      })
    } else {
      setParseResult(null)
    }
  }, [inputText])

  return (
    <TokenContext.Provider
      value={{
        parseResult,
        validation,
        currentIndex,
        inputText,
        setInputText,
        parse,
        setCurrentIndex,
        reset,
      }}
    >
      {children}
    </TokenContext.Provider>
  )
}

export function useTokenContext() {
  const ctx = useContext(TokenContext)
  if (!ctx) throw new Error('useTokenContext must be used within a TokenProvider')
  return ctx
}
