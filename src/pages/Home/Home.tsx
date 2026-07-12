import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowDown,
  CheckCircle, Sparkles, Cpu, Shield, List, Clock, Languages,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'

const trustItems = [
  { icon: Cpu, key: 'home.trust1' },
  { icon: Shield, key: 'home.trust2' },
  { icon: CheckCircle, key: 'home.trust3' },
] as const

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      <section className="pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-primary-surface px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t('home.badge')}</span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {t('home.title')}
          </h1>

          <p className="mx-auto mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {t('home.subtitle')}
          </p>

          <div>
            <Link to="/formatter">
              <Button
                size="lg"
                className="gap-2 rounded-xl px-8 text-base font-semibold shadow-lg shadow-primary/20"
              >
                {t('home.getStarted')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold">
            {t('home.demoTitle')}
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <Card className="w-full md:flex-1 border p-5 shadow-none">
              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/20 text-[11px] font-bold">
                  1
                </span>
                {t('home.demoInput')}
              </div>
              <p className="break-all font-mono text-sm text-muted-foreground leading-relaxed">
                BPDB: Meter 1234567890 Tk 500.00 Token: 3217407773201949846325910358843419948233
              </p>
            </Card>

            <div className="hidden md:block shrink-0">
              <ArrowRight className="h-6 w-6 text-primary" />
            </div>
            <div className="block md:hidden">
              <ArrowDown className="h-6 w-6 text-primary" />
            </div>

            <Card className="w-full md:flex-1 border border-primary-border bg-primary-surface p-5 shadow-sm">
              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px] font-bold">
                  2
                </span>
                {t('home.after')}
              </div>
              <p className="font-mono text-sm tracking-widest text-foreground">
                3217-4077-7320-1949-8463
              </p>
              <p className="mt-1 font-mono text-sm tracking-widest text-foreground">
                2591-0358-8434-1994-8233
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <CheckCircle className="h-3 w-3" />
                {t('home.demoReady')}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-heading text-lg font-semibold text-muted-foreground">
            {t('home.trustTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {trustItems.map(({ icon: Icon, key }) => (
              <div key={key} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-surface">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">
                  {t(key)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-heading text-lg font-semibold text-muted-foreground">
            {t('home.moreFeatures')}
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { icon: List, titleKey: 'home.meterCodes', descKey: 'home.meterCodesDesc' },
              { icon: Clock, titleKey: 'home.tokenHistory', descKey: 'home.tokenHistoryDesc' },
              { icon: Languages, titleKey: 'home.languageSupport', descKey: 'home.languageSupportDesc' },
            ].map(({ icon: Icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4 text-center"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-surface">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-foreground">
                    {t(titleKey)}
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {t(descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
