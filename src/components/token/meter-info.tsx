import type { MeterInfo } from '@/types/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'

interface MeterInfoPanelProps {
  info: MeterInfo
}

const fields: { key: keyof MeterInfo; tKey: string }[] = [
  { key: 'meterNumber', tKey: 'meterInfo.meterNumber' },
  { key: 'rechargeAmount', tKey: 'meterInfo.rechargeAmount' },
  { key: 'energyCost', tKey: 'meterInfo.energyCost' },
  { key: 'totalCharge', tKey: 'meterInfo.totalCharge' },
  { key: 'meterRent', tKey: 'meterInfo.meterRent' },
  { key: 'demandCharge', tKey: 'meterInfo.demandCharge' },
  { key: 'vat', tKey: 'meterInfo.vat' },
  { key: 'rebate', tKey: 'meterInfo.rebate' },
  { key: 'transactionId', tKey: 'meterInfo.transactionId' },
  { key: 'sequenceNumber', tKey: 'meterInfo.sequenceNumber' },
]

export function MeterInfoPanel({ info }: MeterInfoPanelProps) {
  const { t } = useTranslation()

  const visibleFields = fields.filter((f) => info[f.key])

  if (visibleFields.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{t('meterInfo.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {visibleFields.map(({ key, tKey }) => (
            <div key={key} className="contents">
              <dt className="text-muted-foreground">{t(tKey)}</dt>
              <dd className="font-medium text-right">{info[key]}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
