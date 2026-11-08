import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { KeyRound, ExternalLink, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getGroqApiKey, setGroqApiKey } from '@/lib/groq'
import { toast } from 'sonner'
import { useTranslation } from '@/context/language-context'

interface ApiKeyDialogProps {
  open: boolean
  onClose: () => void
  onSaved?: () => void
}

export function ApiKeyDialog({ open, onClose, onSaved }: ApiKeyDialogProps) {
  const { t } = useTranslation()
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    if (open) {
      setApiKey(getGroqApiKey())
    }
  }, [open])

  const handleSave = () => {
    setGroqApiKey(apiKey.trim())
    toast.success(t('bill.apiKeySaved'))
    onSaved?.()
    onClose()
  }

  const handleClear = () => {
    setApiKey('')
    setGroqApiKey('')
    toast.success(t('bill.apiKeyCleared'))
    onSaved?.()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border bg-card p-5 shadow-xl flex flex-col gap-3.5 text-foreground"
          >
            <div className="flex items-center gap-2">
              <KeyRound className="size-5 text-primary" />
              <h3 className="text-base font-semibold">{t('bill.apiKeyTitle')}</h3>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('bill.apiKeyDesc')}
            </p>

            <div className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2 text-xs">
              <span className="text-muted-foreground">{t('bill.apiKeyGetFree')}</span>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
              >
                console.groq.com <ExternalLink className="size-3" />
              </a>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Groq API Key
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                {apiKey && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleClear}
                    title="Clear Key"
                    aria-label="Clear Key"
                    className="rounded-xl shrink-0"
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={onClose} className="rounded-xl">
                {t('bill.apiKeyCancel')}
              </Button>
              <Button size="sm" onClick={handleSave} className="rounded-xl">
                {t('bill.apiKeySave')}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ApiKeyNotice({ onConfigure }: { onConfigure: () => void }) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs text-amber-800 dark:text-amber-200">
      <div className="flex items-center gap-2 min-w-0">
        <KeyRound className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <span className="leading-snug">{t('bill.apiKeyRequiredNotice')}</span>
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={onConfigure}
        className="h-7 shrink-0 rounded-lg text-xs border-amber-500/40 hover:bg-amber-500/20 self-end sm:self-auto"
      >
        {t('bill.apiKeyConfigure')}
      </Button>
    </div>
  )
}
