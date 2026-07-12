import type { ProviderName } from '@/types/types'
import { cn } from '@/utils/utils.cn'
import { useTranslation } from '@/context/language-context'

const providerColors: Record<ProviderName, string> = {
  BPDB: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  BREB: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  DESCO: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  DPDC: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  NESCO: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  WZPDCL: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  UNKNOWN: 'bg-muted text-muted-foreground',
}

const providerLabels: Record<ProviderName, string> = {
  BPDB: 'BPDB',
  BREB: 'BREB / Palli Bidyut',
  DESCO: 'DESCO',
  DPDC: 'DPDC',
  NESCO: 'NESCO',
  WZPDCL: 'WZPDCL',
  UNKNOWN: 'provider.unknown',
}

interface ProviderBadgeProps {
  provider: ProviderName
}

export function ProviderBadge({ provider }: ProviderBadgeProps) {
  const { t } = useTranslation()

  const label = provider === 'UNKNOWN' ? t('provider.unknown') : providerLabels[provider]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        providerColors[provider],
      )}
    >
      {label}
    </span>
  )
}
