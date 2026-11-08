import { useState } from 'react'
import { Calculator, Copy, Check, RotateCcw, Zap } from 'lucide-react'
import { cn } from '@/utils/utils.cn'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'
import type { BillResult } from '@/types/bill-calculator.types'

interface BillSummaryProps {
  result: BillResult
  onCopy: () => void
  onRestart: () => void
}

function formatCurrency(amount: number): string {
  return `৳ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

export function BillSummary({ result, onCopy, onRestart }: BillSummaryProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-full overflow-hidden border border-border/80 shadow-sm transition-shadow">
      {/* Header */}
      <CardHeader className="p-3 pb-2.5 sm:p-5 sm:pb-3 border-b bg-muted/20">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground min-w-0 flex-1">
            <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Calculator className="size-4" />
            </span>
            <span className="truncate">{t('bill.summary.title')}</span>
          </CardTitle>
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] sm:text-xs font-mono font-medium text-primary border border-primary/20">
            BPDB 2024-25
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3.5 p-2.5 sm:gap-5 sm:p-5 w-full min-w-0">
        {/* Section 1: Hero Stat Cards (Total Units & Estimated Bill) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full min-w-0">
          <div className="flex flex-col items-center justify-center rounded-xl bg-muted/40 border border-border/60 p-2 sm:p-3 text-center min-w-0 overflow-hidden">
            <span className="text-[11px] sm:text-xs font-medium text-muted-foreground truncate max-w-full px-1">
              {t('bill.summary.totalUsage')}
            </span>
            <p className="mt-0.5 text-sm sm:text-xl font-bold tabular-nums text-foreground truncate max-w-full px-1">
              {result.totalKwh.toLocaleString()}{' '}
              <span className="text-xs font-normal text-muted-foreground">kWh</span>
            </p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl bg-primary/10 border border-primary/25 p-2 sm:p-3 text-center min-w-0 overflow-hidden">
            <span className="text-[11px] sm:text-xs font-semibold text-primary truncate max-w-full px-1">
              {t('bill.summary.total')}
            </span>
            <p className="mt-0.5 text-sm sm:text-xl font-bold tabular-nums text-primary truncate max-w-full px-1">
              {formatCurrency(result.totalBill)}
            </p>
          </div>
        </div>

        {/* Section 2: Appliance Breakdown */}
        {result.applianceBreakdown.length > 0 && (
          <div className="w-full min-w-0">
            <div className="mb-2 flex items-center justify-between min-w-0">
              <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate">
                {t('bill.summary.applianceBreakdown')}
              </h4>
              <span className="text-[10px] sm:text-xs text-muted-foreground/80 font-mono shrink-0 ml-1">
                {result.applianceBreakdown.length} {t('bill.summary.applianceBreakdown').includes('যন্ত্রপাতি') ? 'টি' : 'items'}
              </span>
            </div>
            <div className="flex flex-col gap-1.5 sm:gap-2 w-full min-w-0">
              {result.applianceBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-1 rounded-lg bg-muted/40 border border-border/40 p-2 sm:p-2.5 transition-colors w-full min-w-0"
                >
                  <div className="flex items-center justify-between gap-2 text-xs sm:text-sm min-w-0">
                    <span className="font-medium text-foreground truncate min-w-0 flex-1">
                      {item.nameKey ? t(item.nameKey) : item.name}
                    </span>
                    <span className="shrink-0 text-xs font-semibold tabular-nums text-foreground/90 ml-1">
                      {item.kwh.toFixed(1)} kWh
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground min-w-0">
                    <span className="truncate min-w-0 pr-1 flex-1">
                      ×{item.quantity} · {item.hoursPerDay}h/day
                    </span>
                    <span className="shrink-0 tabular-nums font-medium text-primary ml-1">
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                  {/* Percentage bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary/85 transition-all duration-300"
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Tariff Breakdown (Table fits 100% width with no horizontal scroll) */}
        {result.slabBreakdown.length > 0 && (
          <div className="w-full min-w-0">
            <h4 className="mb-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate">
              {t('bill.summary.tariffBreakdown')}
            </h4>
            <div className="w-full overflow-hidden rounded-lg border border-border/70">
              <table className="w-full table-fixed text-[11px] sm:text-xs">
                <colgroup>
                  <col className="w-[28%]" />
                  <col className="w-[18%]" />
                  <col className="w-[24%]" />
                  <col className="w-[30%]" />
                </colgroup>
                <thead>
                  <tr className="border-b bg-muted/50 text-muted-foreground">
                    <th className="px-1.5 py-1.5 sm:px-2.5 sm:py-2 text-left font-medium truncate">
                      {t('bill.summary.slab')}
                    </th>
                    <th className="px-1 py-1.5 sm:px-2 sm:py-2 text-right font-medium truncate">
                      kWh
                    </th>
                    <th className="px-1 py-1.5 sm:px-2 sm:py-2 text-right font-medium truncate">
                      {t('bill.summary.rate')}
                    </th>
                    <th className="px-1.5 py-1.5 sm:px-2.5 sm:py-2 text-right font-medium truncate">
                      {t('bill.summary.cost')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.slabBreakdown.map((slab, idx) => (
                    <tr
                      key={idx}
                      className={cn(
                        'border-b last:border-b-0 transition-colors',
                        idx % 2 === 1 ? 'bg-muted/20' : 'bg-transparent',
                      )}
                    >
                      <td className="px-1.5 py-1.5 sm:px-2.5 sm:py-2 font-medium text-foreground truncate">
                        {slab.slab}
                      </td>
                      <td className="px-1 py-1.5 sm:px-2 sm:py-2 text-right tabular-nums text-muted-foreground truncate">
                        {slab.kwh}
                      </td>
                      <td className="px-1 py-1.5 sm:px-2 sm:py-2 text-right tabular-nums text-muted-foreground truncate">
                        {slab.rate.toFixed(2)}
                      </td>
                      <td className="px-1.5 py-1.5 sm:px-2.5 sm:py-2 text-right tabular-nums font-semibold text-foreground truncate">
                        {formatCurrency(slab.cost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 4: Cost Breakdown Summary (Receipt Style) */}
        <div className="w-full min-w-0 rounded-xl border border-border/80 bg-muted/30 p-2.5 sm:p-4">
          <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between gap-2 py-0.5 min-w-0">
              <span className="text-muted-foreground truncate min-w-0 flex-1">
                {t('bill.summary.energyCharge')}
              </span>
              <span className="tabular-nums font-medium text-foreground shrink-0 whitespace-nowrap ml-1">
                {formatCurrency(result.energyCharge)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 py-0.5 min-w-0">
              <span className="text-muted-foreground truncate min-w-0 flex-1">
                {t('bill.summary.demandCharge')}
              </span>
              <span className="tabular-nums font-medium text-foreground shrink-0 whitespace-nowrap ml-1">
                {formatCurrency(result.demandCharge)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 py-0.5 min-w-0">
              <span className="text-muted-foreground truncate min-w-0 flex-1">
                {t('bill.summary.meterRent')}
              </span>
              <span className="tabular-nums font-medium text-foreground shrink-0 whitespace-nowrap ml-1">
                {formatCurrency(result.meterRent)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 py-0.5 min-w-0">
              <span className="text-muted-foreground truncate min-w-0 flex-1">
                {t('bill.summary.vat')}
              </span>
              <span className="tabular-nums font-medium text-foreground shrink-0 whitespace-nowrap ml-1">
                {formatCurrency(result.vat)}
              </span>
            </div>

            <div className="my-1.5 border-t border-dashed border-border" />

            <div className="flex items-baseline justify-between gap-2 pt-0.5 min-w-0">
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <Zap className="size-4 text-primary shrink-0" />
                <span className="font-bold text-foreground text-xs sm:text-sm truncate">
                  {t('bill.summary.total')}
                </span>
              </div>
              <span className="text-base sm:text-2xl font-extrabold tabular-nums text-primary tracking-tight shrink-0 whitespace-nowrap ml-1">
                {formatCurrency(result.totalBill)}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] sm:text-xs text-muted-foreground/80 leading-relaxed px-1">
          {t('bill.summary.note')}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1 w-full min-w-0">
          <Button
            variant="default"
            className="h-10 sm:h-11 w-full flex-1 justify-center gap-2 text-xs sm:text-sm font-medium shadow-xs min-w-0"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="size-4 shrink-0 text-primary-foreground" />
                <span className="truncate">{t('bill.summary.copied')}</span>
              </>
            ) : (
              <>
                <Copy className="size-4 shrink-0" />
                <span className="truncate">{t('bill.summary.copy')}</span>
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="h-10 sm:h-11 w-full flex-1 justify-center gap-2 text-xs sm:text-sm font-medium hover:bg-muted min-w-0"
            onClick={onRestart}
          >
            <RotateCcw className="size-4 shrink-0" />
            <span className="truncate">{t('bill.summary.restart')}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
