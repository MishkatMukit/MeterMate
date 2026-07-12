import { Link } from 'react-router-dom'
import { Clock, Trash2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'
import { getHistory, clearHistory, type HistoryEntry } from '@/lib/history'
import { toast } from 'sonner'
import { useState } from 'react'

function formatDate(ts: number): string {
  const d = new Date(ts)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const PROVIDER_STYLES: Record<string, string> = {
  BPDB: 'bg-primary/10 text-primary',
  BREB: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  DESCO: 'bg-primary-surface text-primary',
  DPDC: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  NESCO: 'bg-primary/10 text-primary',
  WZPDCL: 'bg-primary-surface text-primary',
  UNKNOWN: 'bg-muted text-muted-foreground',
}

function CopyButton({ rawSms }: { rawSms: string }) {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(rawSms)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success(t('history.smsCopied'))
    } catch {
      toast.error(t('history.smsCopyFailed'))
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      aria-label="Copy original SMS"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}

export default function HistoryPage() {
  const { t } = useTranslation()
  const history = getHistory()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('history.title')}</h1>
          {history.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {history.length} {history.length === 1 ? 'entry' : 'entries'}
            </p>
          )}
        </div>
        {history.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearHistory} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Clock className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <p className="text-sm text-muted-foreground">{t('history.empty')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {history.map((entry: HistoryEntry) => {
            const firstToken = entry.formattedTokens[0]
            const remainder = entry.tokenCount - 1
            return (
              <Link
                key={entry.id}
                to={`/formatter?entry=${entry.id}`}
                className="group block"
              >
                <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <div className="px-4 py-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`inline-block shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${PROVIDER_STYLES[entry.provider] || PROVIDER_STYLES.UNKNOWN}`}
                        >
                          {entry.provider}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                      <CopyButton rawSms={entry.rawSms} />
                    </div>

                    <p className="text-sm font-semibold">
                      {entry.meterInfo.meterNumber
                        ? `Meter ${entry.meterInfo.meterNumber}`
                        : 'Unknown meter'}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {entry.tokenCount} {entry.tokenCount === 1 ? 'token' : 'tokens'}
                      {entry.meterInfo.rechargeAmount &&
                        ` · Tk ${entry.meterInfo.rechargeAmount}`}
                    </p>

                    <p className="font-mono text-sm tracking-[0.15em] text-foreground truncate">
                      {firstToken}
                      {remainder > 0 && (
                        <span className="text-muted-foreground ml-2 text-xs not-italic font-sans">
                          +{remainder} more
                        </span>
                      )}
                    </p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
