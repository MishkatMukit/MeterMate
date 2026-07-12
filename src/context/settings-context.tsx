import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface SettingsContextValue {
  autoNext: boolean
  setAutoNext: (value: boolean) => void
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [autoNext, setAutoNextState] = useState<boolean>(() => {
    const stored = localStorage.getItem('autoNext')
    return stored === 'true'
  })

  const setAutoNext = useCallback((value: boolean) => {
    setAutoNextState(value)
    localStorage.setItem('autoNext', String(value))
  }, [])

  return (
    <SettingsContext.Provider value={{ autoNext, setAutoNext }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider')
  return ctx
}
