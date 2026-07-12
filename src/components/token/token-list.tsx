import { cn } from '@/utils/utils.cn'
import { motion } from 'framer-motion'

interface TokenListProps {
  formattedTokens: string[]
  currentIndex: number
  onSelect: (index: number) => void
}

export function TokenList({ formattedTokens, currentIndex, onSelect }: TokenListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {formattedTokens.map((ft, i) => {
        const isCurrent = i === currentIndex
        const isDone = i < currentIndex
        return (
          <motion.button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'w-full min-h-11 md:min-h-0 rounded-md border px-2 py-1 md:px-2 md:py-1 font-mono text-xs tracking-widest transition-all duration-150',
              isCurrent &&
                'border-primary bg-primary/5 ring-1 ring-primary font-medium shadow-sm',
              isDone &&
                'line-through text-red-500 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30',
              !isCurrent &&
                !isDone &&
                'border-border bg-card text-muted-foreground hover:border-muted-foreground/30',
            )}
          >
            {ft}
          </motion.button>
        )
      })}
    </div>
  )
}
