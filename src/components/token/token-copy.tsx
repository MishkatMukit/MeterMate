import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'
import { useTranslation } from '@/context/language-context'
import { useSettings } from '@/context/settings-context'
import { motion, AnimatePresence } from 'framer-motion'

interface TokenCopyProps {
  currentToken: string
  allTokens: string[]
  onCopy?: () => void
}

export function TokenCopy({ currentToken, allTokens, onCopy }: TokenCopyProps) {
  const [copiedSingle, setCopiedSingle] = useState(false)
  const [copiedAll, setCopiedAll] = useState(false)
  const { t } = useTranslation()
  const { autoNext } = useSettings()

  const copyToClipboard = async (text: string, label: string, setCopied: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success(t('token.copied', label))
      if (onCopy && autoNext) {
        onCopy()
      }
    } catch {
      toast.error(t('token.copyFailed'))
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => copyToClipboard(currentToken, t('token.copy'), setCopiedSingle)}
        className="w-full md:w-auto min-h-[44px] md:min-h-0 gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copiedSingle ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <Check className="h-3.5 w-3.5 text-primary" />
              Copied!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <Copy className="h-3.5 w-3.5" />
              {t('token.copy')}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => copyToClipboard(allTokens.join('\n'), t('token.copyAll', String(allTokens.length)), setCopiedAll)}
        className="w-full md:w-auto min-h-[44px] md:min-h-0 gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copiedAll ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <Check className="h-3.5 w-3.5 text-primary" />
              Copied!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <Copy className="h-3.5 w-3.5" />
              {t('token.copyAll', String(allTokens.length))}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}
