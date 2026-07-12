import { cn } from '@/utils/utils.cn'

interface ProgressDotsProps {
  total: number
  current: number
  onDotClick?: (index: number) => void
}

export function ProgressDots({ total, current, onDotClick }: ProgressDotsProps) {
  if (total <= 1) return null

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onDotClick?.(i)}
          className={cn(
            'h-2.5 w-2.5 rounded-full transition-all duration-200',
            i === current
              ? 'bg-primary w-4'
              : 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
          )}
          aria-label={`Go to token ${i + 1}`}
        />
      ))}
    </div>
  )
}
