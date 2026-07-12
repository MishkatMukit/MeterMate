import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Smartphone, CheckCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'
import { PROVIDER_NAMES } from '@/constants/constants'

const features = [
  { icon: Zap, titleKey: 'home.feature.detect', descKey: 'home.feature.detectDesc' },
  { icon: Smartphone, titleKey: 'home.feature.format', descKey: 'home.feature.formatDesc' },
  { icon: Shield, titleKey: 'home.feature.privacy', descKey: 'home.feature.privacyDesc' },
]

const providers = ['BPDB', 'BREB', 'DESCO', 'DPDC', 'NESCO', 'WZPDCL'] as const

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

          <div className="flex flex-wrap items-center justify-center gap-4">
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

      <section className="border-t py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3">
            {features.map(({ icon: Icon, titleKey, descKey }) => (
              <Card key={titleKey} className="border bg-card p-6 shadow-none transition-shadow duration-200 hover:shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-surface">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1.5 font-heading text-sm font-semibold">{t(titleKey)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(descKey)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="mb-2 font-heading text-2xl font-bold">{t('home.howItWorks')}</h2>
            <p className="text-muted-foreground">{t('home.subtitle')}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border p-6 shadow-none">
              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">1</span>
                {t('home.before')}
              </div>
              <p className="break-all font-mono text-sm text-foreground">
                {t('home.beforeExample')}
              </p>
            </Card>

            <Card className="border border-primary-border bg-primary-surface p-6 shadow-none">
              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px] font-bold">2</span>
                {t('home.after')}
              </div>
              {t('home.afterExample')
                .split('\n')
                .map((line, i) => (
                  <p key={i} className="font-mono text-sm text-foreground tracking-widest">
                    {line}
                  </p>
                ))}
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t py-16 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-8 font-heading text-2xl font-bold">{t('home.providers')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {providers.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-2 rounded-xl border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <CheckCircle className="h-4 w-4 text-primary" />
                {p === 'BREB' ? PROVIDER_NAMES[p] : p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-surface">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 font-heading text-lg font-semibold">{t('home.privacyTitle')}</h3>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
            {t('home.privacyText')}
          </p>
        </div>
      </section>
    </div>
  )
}
