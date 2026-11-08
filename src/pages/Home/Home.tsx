import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock3,
  KeyRound,
  Languages,
  ListOrdered,
  Lock,
  ScanLine,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/context/language-context'
import { Seo } from '@/components/common/seo'
import { WebAppStructuredData } from '@/components/common/structured-data'

const trustItems = [
  { icon: Lock, key: 'home.trust1' },
  { icon: ShieldCheck, key: 'home.trust2' },
  { icon: CheckCircle2, key: 'home.trust3' },
] as const

const providers = ['BPDB', 'BREB', 'DESCO', 'DPDC', 'NESCO', 'WZPDCL'] as const

const features = [
  { icon: ScanLine, titleKey: 'home.feature.detect', descKey: 'home.feature.detectDesc' },
  { icon: ListOrdered, titleKey: 'home.feature.format', descKey: 'home.feature.formatDesc' },
  { icon: ShieldCheck, titleKey: 'home.feature.privacy', descKey: 'home.feature.privacyDesc' },
] as const

const moreFeatures = [
  { icon: Calculator, to: '/bill-calculator', titleKey: 'home.billCalculator', descKey: 'home.billCalculatorDesc' },
  { icon: KeyRound, to: '/meter-codes', titleKey: 'home.meterCodes', descKey: 'home.meterCodesDesc' },
  { icon: Clock3, to: '/history', titleKey: 'home.tokenHistory', descKey: 'home.tokenHistoryDesc' },
  { icon: Languages, to: '/settings', titleKey: 'home.languageSupport', descKey: 'home.languageSupportDesc' },
] as const

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <Seo
        title="Prepaid Meter Tokens, Made Simple"
        description="Paste your prepaid meter SMS — MeterMate automatically detects your provider (BPDB, BREB, DESCO, DPDC, NESCO, WZPDCL), extracts 20-digit tokens, and formats them into readable 4-digit groups. 100% client-side, no data uploaded."
        keywords="prepaid meter token formatter, Bangladesh electricity token, BPDB token, DESCO token, NESCO token, BREB token, DPDC token, WZPDCL token, meter recharge code"
        canonical="/"
      />
      <WebAppStructuredData
        path="/"
        breadcrumbs={[{ name: 'Home', path: '/' }]}
      />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative pb-8 pt-6 md:pb-14 md:pt-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -bottom-40 left-1/2 h-[680px] w-[150%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_100%,var(--color-primary-surface)_0%,#F0FDF400_65%)] dark:bg-[radial-gradient(ellipse_at_50%_100%,#052E16_0%,#052E1600_65%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[460px] bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-[size:26px_26px] opacity-70 [mask-image:radial-gradient(ellipse_65%_70%_at_50%_100%,#000_45%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-surface px-3.5 py-1.5 text-xs font-semibold text-accent-foreground">
              <span className="relative flex size-2 items-center justify-center">
                <span className="absolute size-2 rounded-full bg-primary/40" />
                <span className="relative size-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-primary">{t('home.badge')}</span>
            </div>

            <h1 className="font-heading text-[2rem] font-extrabold leading-[1.14] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
              {t('home.heroTitleTop')}
              <span className="block">
                <span className="relative inline-block text-primary">
                  {t('home.heroTitleAccent')}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1.5 left-0 h-2.5 w-full text-primary/25"
                  >
                    <path
                      d="M2 8C50 3 150 3 198 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-foreground/70 text-pretty lg:mx-0 lg:mt-7 lg:text-lg">
              {t('home.subtitle')}
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="group gap-2 rounded-xl px-7 text-base font-semibold shadow-lg shadow-primary/25"
              >
                <Link to="/formatter">
                  {t('home.getStarted')}
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
              {trustItems.map(({ icon: Icon, key }) => (
                <li key={key} className="flex items-center gap-1.5 text-xs font-medium text-foreground/60">
                  <Icon className="size-3.5 text-primary" aria-hidden="true" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 flex items-center justify-center"
            >
              <div className="size-[76%] rounded-full bg-primary/15 blur-3xl dark:bg-primary/10" />
            </div>
            <img
              src="/metermate-hero.webp"
              srcSet="/metermate-hero-480.webp 480w, /metermate-hero.webp 912w"
              sizes="(min-width: 1024px) 46vw, 92vw"
              width={912}
              height={969}
              alt="Two MeterMate phone screens: a pasted prepaid meter SMS with a long token string, and the same tokens split into readable 4-digit groups"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-auto w-full drop-shadow-[0_30px_55px_rgba(2,6,23,0.22)]"
            />
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------- Providers */}
      <section className="border-t py-16 md:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 flex size-11 items-center justify-center rounded-2xl bg-primary-surface text-primary ring-1 ring-primary-border">
            <Zap className="size-5" aria-hidden="true" />
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
            {t('home.providersTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-foreground/70 md:text-base">
            {t('home.providersDesc')}
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {providers.map((provider) => (
              <li
                key={provider}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-semibold shadow-sm"
              >
                <CheckCircle2 className="size-3.5 text-primary" aria-hidden="true" />
                {provider}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* -------------------------------------------------------- Features */}
      <section className="border-t py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
              {t('home.featuresTitle')}
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {features.map(({ icon: Icon, titleKey, descKey }, index) => (
              <Reveal key={titleKey} delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary-surface text-primary ring-1 ring-primary-border">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold">{t(titleKey)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                    {t(descKey)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-5">
            {moreFeatures.map(({ icon: Icon, to, titleKey, descKey }) => (
              <Link
                key={titleKey}
                to={to}
                className="group flex items-start gap-3 rounded-2xl border bg-card px-4 py-3.5 transition-colors duration-200 hover:border-primary-border hover:bg-primary-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground/60 transition-colors duration-200 group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-sm font-semibold">
                    {t(titleKey)}
                    <ArrowRight className="size-3.5 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-foreground/60">
                    {t(descKey)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Privacy */}
      <section className="pb-16 md:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary-border bg-primary-surface p-7 md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-primary/10 blur-2xl"
            />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                  {t('home.privacyTitle')}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
                  {t('home.privacyText')}
                </p>
              </div>

              <ul className="grid shrink-0 gap-2.5 md:min-w-[220px]">
                {trustItems.map(({ icon: Icon, key }) => (
                  <li
                    key={key}
                    className="flex items-center gap-2.5 rounded-xl border border-primary-border/70 bg-card/70 px-3.5 py-2.5 text-sm font-medium"
                  >
                    <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
