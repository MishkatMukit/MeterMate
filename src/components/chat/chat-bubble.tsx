import { motion, useReducedMotion } from 'framer-motion'
import { Calculator } from 'lucide-react'
import { cn } from '@/utils/utils.cn'
import type { ChatMessage } from '@/types/bill-calculator.types'

interface ChatBubbleProps {
  message: ChatMessage
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const prefersReducedMotion = useReducedMotion()
  const isBot = message.role === 'bot'

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }

  return (
    <motion.div
      {...motionProps}
      className={cn(
        'flex items-end gap-2.5',
        isBot ? 'justify-start' : 'justify-end',
      )}
    >
      {/* Bot avatar */}
      {isBot && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Calculator className="size-4" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          'max-w-[85%] sm:max-w-[80%] min-w-0 break-words [overflow-wrap:anywhere] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap',
          isBot
            ? 'rounded-bl-md border bg-card text-card-foreground shadow-xs'
            : 'rounded-br-md bg-primary text-primary-foreground',
        )}
      >
        {message.content}
      </div>
    </motion.div>
  )
}
