import { AlertTriangle } from 'lucide-react'
import type { ValidationResult } from '@/types/types'
import { useTranslation } from '@/context/language-context'

interface ParseErrorProps {
  validation: ValidationResult
}

export function ParseError({ validation }: ParseErrorProps) {
  const { t } = useTranslation()

  if (validation.isValid) return null

  const message =
    validation.code === 'no_digits'
      ? t('error.noDigits')
      : validation.code === 'wrong_length'
        ? t('error.wrongLength', String(validation.digitCount ?? 0))
        : validation.message

  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive-foreground">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  )
}
