import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/utils.cn'
import type { ChatMessage } from '@/types/bill-calculator.types'
import { ChatBubble } from '@/components/chat/chat-bubble'
import { QuickReplies } from '@/components/chat/quick-replies'

interface ChatContainerProps {
  messages: ChatMessage[]
  isTyping?: boolean
  onQuickReply: (value: string) => void
  renderComponent?: (message: ChatMessage) => ReactNode
}

export function ChatContainer({
  messages,
  isTyping = false,
  onQuickReply,
  renderComponent,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Find the index of the LAST message that has quickReplies
  const lastQuickReplyIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (
        messages[i].role === 'bot' &&
        messages[i].quickReplies &&
        messages[i].quickReplies!.length > 0
      ) {
        return i
      }
    }
    return -1
  })()

  // Auto-scroll to bottom when messages change or typing starts
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
    })
  }, [messages, isTyping, prefersReducedMotion])

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden scroll-smooth px-1.5 sm:px-3 py-3 sm:py-4">
      {messages.map((message, index) => (
        <div key={message.id} className="flex flex-col gap-2 w-full min-w-0">
          <ChatBubble message={message} />

          {/* Quick replies — only interactive for the last message with them */}
          {message.role === 'bot' &&
            message.quickReplies &&
            message.quickReplies.length > 0 && (
              <QuickReplies
                replies={message.quickReplies}
                onSelect={onQuickReply}
                disabled={index !== lastQuickReplyIndex}
              />
            )}

          {/* Custom component rendering */}
          {message.component && renderComponent && (
            <div className="w-full min-w-0 sm:pl-10.5">{renderComponent(message)}</div>
          )}
        </div>
      ))}

      {/* Typing indicator */}
      {isTyping && <TypingIndicator reducedMotion={!!prefersReducedMotion} />}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  )
}

function TypingIndicator({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="flex items-end gap-2.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span className="text-xs font-bold">···</span>
      </div>
      <div className="flex gap-1 rounded-2xl rounded-bl-md border bg-card px-4 py-3 shadow-sm">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={cn('block size-2 rounded-full bg-muted-foreground/50')}
            animate={
              reducedMotion
                ? {}
                : {
                    y: [0, -4, 0],
                  }
            }
            transition={
              reducedMotion
                ? {}
                : {
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }
            }
          />
        ))}
      </div>
    </div>
  )
}
