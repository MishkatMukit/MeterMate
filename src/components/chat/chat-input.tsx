import { useState, useRef, type KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/utils.cn'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
  suggestions?: string[]
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
  suggestions = [],
}: ChatInputProps) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col gap-2 border-t bg-card/60 p-2 sm:p-3 backdrop-blur-xs">
      {suggestions.length > 0 && !disabled && (
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 text-xs">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSend(suggestion)}
              className="inline-flex items-center gap-1 rounded-full border bg-background/80 px-2.5 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
            >
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'flex-1 rounded-xl border bg-background px-3.5 py-2 text-base sm:text-sm text-foreground shadow-xs',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />
        <Button
          type="button"
          size="icon"
          disabled={disabled || !text.trim()}
          onClick={handleSend}
          className="rounded-xl shrink-0"
          aria-label="Send message"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  )
}
