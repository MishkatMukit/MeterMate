import { useEffect, useCallback, useState } from 'react'
import { SmsInput } from '@/components/token/sms-input'
import { TokenDisplay } from '@/components/token/token-display'
import { TokenList } from '@/components/token/token-list'
import { TokenNavigation } from '@/components/token/token-navigation'
import { ProviderBadge } from '@/components/token/provider-badge'
import { MeterInfoPanel } from '@/components/token/meter-info'
import { ParseError } from '@/components/token/parse-error'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Button } from '@/components/ui/button'
import { useTokenContext } from '@/context/token-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'
import { CheckCircle, RotateCcw, ArrowLeft, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useSettings } from '@/context/settings-context'

export default function FormatterPage() {
  const { t } = useTranslation()
  const {
    inputText,
    setInputText,
    parse,
    reset,
    parseResult,
    validation,
    currentIndex,
    setCurrentIndex,
  } = useTokenContext()

  const [pendingReinsert, setPendingReinsert] = useState<number | null>(null)
  const [pendingSkip, setPendingSkip] = useState<number | null>(null)

  const isComplete = parseResult !== null && currentIndex >= parseResult.tokens.length
  const parsed = !!parseResult && validation?.isValid === true

  const confirmReinsert = useCallback(() => {
    if (pendingReinsert !== null) {
      setCurrentIndex(pendingReinsert)
      setPendingReinsert(null)
    }
  }, [pendingReinsert, setCurrentIndex])

  const cancelReinsert = useCallback(() => {
    setPendingReinsert(null)
  }, [])

  const confirmSkip = useCallback(() => {
    if (pendingSkip !== null) {
      setCurrentIndex(pendingSkip)
      setPendingSkip(null)
    }
  }, [pendingSkip, setCurrentIndex])

  const cancelSkip = useCallback(() => {
    setPendingSkip(null)
  }, [])

  const goToLastToken = useCallback(() => {
    if (!parseResult) return
    setCurrentIndex(parseResult.tokens.length - 1)
  }, [parseResult, setCurrentIndex])

  const handlePrevious = useCallback(() => {
    if (!parseResult) return
    const target = currentIndex - 1
    if (target < 0) return
    if (target < parseResult.tokens.length && currentIndex < parseResult.tokens.length) {
      setPendingReinsert(target)
    } else {
      setCurrentIndex(target)
    }
  }, [currentIndex, parseResult, setCurrentIndex])

  const handleNext = useCallback(() => {
    if (!parseResult) return
    if (currentIndex < parseResult.tokens.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }, [currentIndex, parseResult, setCurrentIndex])

  const handleSelectToken = useCallback((index: number) => {
    if (index === currentIndex || index === currentIndex + 1 || index < currentIndex) {
      setCurrentIndex(index)
    } else {
      setPendingSkip(index)
    }
  }, [currentIndex, setCurrentIndex])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!parseResult) return
      if (e.key === 'ArrowLeft') {
        const target = currentIndex - 1
        if (target >= 0) {
          if (isComplete) {
            setCurrentIndex(target)
          } else if (target < parseResult.tokens.length && currentIndex < parseResult.tokens.length) {
            setPendingReinsert(target)
          } else {
            setCurrentIndex(target)
          }
        }
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    },
    [parseResult, currentIndex, setCurrentIndex, isComplete, handleNext],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const currentToken = parseResult?.tokens[currentIndex]
  const currentFormatted = parseResult?.formattedTokens[currentIndex]

  return (
    <div className="flex flex-col gap-8 md:gap-7">
      <div>
        <h1 className="text-2xl font-bold">{t('formatter.title')}</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {t('formatter.subtitle')}
        </p>
      </div>

      <div className={parsed ? 'order-last md:order-1' : 'order-1'}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('formatter.inputTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <SmsInput
              value={inputText}
              onChange={setInputText}
              onParse={parse}
              onReset={reset}
              hasResult={!!parseResult}
              parsed={parsed}
            />
          </CardContent>
        </Card>
      </div>

      {validation && !validation.isValid && <ParseError validation={validation} />}

      {parseResult && (
        <div className="order-4 md:order-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <ProviderBadge provider={parseResult.provider} />
              <span className={`flex items-center gap-1.5 text-xs ${isComplete ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                <CheckCircle className={`h-3.5 w-3.5 ${isComplete ? 'text-primary' : 'text-primary'}`} />
                <span>{parseResult.tokens.length} token{parseResult.tokens.length !== 1 ? 's' : ''}</span>
                {isComplete && (
                  <>
                    <span className="text-muted-foreground font-normal">·</span>
                    <span className="text-primary font-medium">{t('token.allDone')}</span>
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!isComplete && (
                <ToolbarCopyButton
                  label={t('token.copy')}
                  value={currentToken!}
                  onCopy={handleNext}
                />
              )}
              <ToolbarCopyButton
                label={t('token.copyAll', String(parseResult.tokens.length))}
                value={parseResult.tokens.join('\n')}
              />
            </div>
          </div>
        </div>
      )}

      {parseResult && !isComplete && currentToken && (
        <>
          <div className="order-2 md:order-3">
            <TokenDisplay formatted={currentFormatted!} />
          </div>

          <div className="order-3 md:order-4">
            <div className="flex justify-center">
              <TokenNavigation
                currentIndex={currentIndex}
                totalTokens={parseResult.tokens.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>
          </div>

          <div className="order-5 md:order-5">
            <TokenList
              formattedTokens={parseResult.formattedTokens}
              currentIndex={currentIndex}
              onSelect={handleSelectToken}
            />
          </div>

          <div className="order-6 md:order-6">
            <MeterInfoPanel info={parseResult.meterInfo} />
          </div>
        </>
      )}

      {parseResult && isComplete && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="order-2 md:order-2"
          >
            <Card>
              <CardContent className="flex flex-col items-center gap-4 py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="h-12 w-12 text-primary" />
                </motion.div>
                <h2 className="text-xl font-bold">{t('token.completed.title')}</h2>
                <p className="text-sm text-muted-foreground">
                  {t('token.completed.count', String(parseResult.tokens.length))}
                </p>
                <div className="mt-1 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" size="sm" onClick={goToLastToken} className="w-full sm:w-auto min-h-[44px] sm:min-h-0 gap-1.5">
                    <ArrowLeft className="h-4 w-4" />
                    {t('token.prev')}
                  </Button>
                  <Button onClick={reset} className="w-full sm:w-auto min-h-[44px] sm:min-h-0 gap-2">
                    <RotateCcw className="h-4 w-4" />
                    {t('token.completed.parseAnother')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="order-3 md:order-3">
            <TokenList
              formattedTokens={parseResult.formattedTokens}
              currentIndex={currentIndex}
              onSelect={handleSelectToken}
            />
          </div>
        </>
      )}

      <ConfirmDialog
        open={pendingReinsert !== null}
        title={t('token.reinsertTitle')}
        message={t('token.reinsertMessage')}
        confirmLabel={t('token.reinsertConfirm')}
        cancelLabel={t('token.reinsertCancel')}
        onConfirm={confirmReinsert}
        onCancel={cancelReinsert}
      />

      <ConfirmDialog
        open={pendingSkip !== null}
        title={t('token.skipTitle')}
        message={t('token.skipMessage')}
        confirmLabel={t('token.skipConfirm')}
        cancelLabel={t('token.skipCancel')}
        onConfirm={confirmSkip}
        onCancel={cancelSkip}
      />
    </div>
  )
}

interface ToolbarCopyButtonProps {
  label: string
  value: string
  onCopy?: () => void
}

function ToolbarCopyButton({ label, value, onCopy }: ToolbarCopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const { t: tt } = useTranslation()
  const { autoNext } = useSettings()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success(tt('token.copied', label))
      if (onCopy && autoNext) {
        onCopy()
      }
    } catch {
      toast.error(tt('token.copyFailed'))
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-1.5"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {label}
    </Button>
  )
}
