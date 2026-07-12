import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/context/language-context'

interface TokenNavigationProps {
  currentIndex: number
  totalTokens: number
  onPrevious: () => void
  onNext: () => void
}

export function TokenNavigation({
  currentIndex,
  totalTokens,
  onPrevious,
  onNext,
}: TokenNavigationProps) {
  const { t } = useTranslation()
  const remaining = totalTokens - currentIndex - 1

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div
        className="flex items-center gap-3 md:gap-4 w-full md:w-auto"
        role="group"
        aria-label={t('token.navLabel')}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex-1 md:flex-initial gap-2.5 px-4 md:px-6"
        >
          <ChevronLeft className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">{t('token.prev')}</span>
        </Button>
        <span className="min-w-[5rem] text-center text-sm font-medium text-muted-foreground tabular-nums shrink-0">
          {t('token.progress', String(currentIndex + 1), String(totalTokens))}
        </span>
        <Button
          variant="outline"
          size="lg"
          onClick={onNext}
          className="flex-1 md:flex-initial gap-2.5 px-4 md:px-6"
        >
          <span className="hidden sm:inline">{t('token.next')}</span>
          <ChevronRight className="h-5 w-5 shrink-0" />
        </Button>
      </div>
      {remaining > 0 && (
        <span className="text-xs text-muted-foreground/70">
          {t('token.remaining', String(remaining))}
        </span>
      )}
    </div>
  )
}
