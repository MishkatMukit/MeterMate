import { useState, useRef, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Trash2, ChevronDown, ChevronRight, RotateCcw } from 'lucide-react'
import { useTranslation } from '@/context/language-context'
import { motion, AnimatePresence } from 'framer-motion'

interface SmsInputProps {
  value: string
  onChange: (value: string) => void
  onParse: () => void
  onReset: () => void
  hasResult: boolean
  parsed: boolean
}

export function SmsInput({ value, onChange, onParse, onReset, hasResult, parsed }: SmsInputProps) {
  const { t } = useTranslation()
  const [showOriginal, setShowOriginal] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!parsed && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [parsed])

  if (parsed) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
            <motion.button
            type="button"
            onClick={() => setShowOriginal(!showOriginal)}
            whileHover={{ x: 2 }}
            className="flex min-h-[44px] sm:min-h-0 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showOriginal ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            Show Original SMS
          </motion.button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button variant="outline" size="sm" onClick={onReset} className="min-h-[44px] sm:min-h-0 gap-1.5">
              <RotateCcw className="h-4 w-4" />
              Parse Another
            </Button>
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {showOriginal && (
            <motion.div
              key="original"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <Textarea
                value={value}
                readOnly
                className="h-[140px] resize-none text-muted-foreground"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-3"
    >
      <Textarea
        ref={textareaRef}
        placeholder={t('formatter.placeholder')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[180px] resize-none"
        maxLength={2000}
      />
      <div className="flex items-center gap-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Button onClick={onParse} disabled={!value.trim()} className="min-h-[44px] sm:min-h-0">
            {t('formatter.parse')}
          </Button>
        </motion.div>
        {hasResult && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15 }}
          >
            <Button variant="outline" size="icon" onClick={onReset} aria-label="Reset" className="min-h-[44px] sm:min-h-0 min-w-[44px] sm:min-w-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
