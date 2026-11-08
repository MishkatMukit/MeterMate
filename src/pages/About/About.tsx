import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'
import { Seo } from '@/components/common/seo'
import { Github, Globe, ExternalLink, Code2 } from 'lucide-react'

export default function AboutPage() {
  const { t } = useTranslation()

  const developerLinks = [
    {
      label: t('about.githubRepo'),
      href: 'https://github.com/MishkatMukit/MeterMate',
      description: 'MishkatMukit/MeterMate',
      icon: Github,
    },
    {
      label: t('about.portfolio'),
      href: 'https://portfolio.mishkatmahabub.tech/',
      description: 'portfolio.mishkatmahabub.tech',
      icon: Globe,
    },
  ]

  return (
    <div className="space-y-6">
      <Seo
        title="About"
        description="MeterMate is a free, client-side prepaid meter token formatter for Bangladesh. Automatically detects BPDB, BREB, DESCO, DPDC, NESCO, and WZPDCL. Extracts and formats 20-digit tokens from SMS. 100% private — no data leaves your browser."
        keywords="about MeterMate, prepaid meter Bangladesh, electricity token app, BPDB BREB DESCO DPDC NESCO WZPDCL, meter token formatter"
        canonical="/about"
      />
      <div>
        <h1 className="text-2xl font-bold">{t('about.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Developer Profile Card */}
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Code2 className="size-5" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg">{t('about.developer')}</CardTitle>
              <p className="text-sm font-semibold text-primary mt-0.5">
                {t('about.developerName')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('about.developerBio')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {developerLinks.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border bg-card/70 p-3 text-sm transition-all hover:bg-accent/40 hover:border-primary/30 hover:shadow-xs active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex size-8.5 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <Icon className="size-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-xs sm:text-sm truncate">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="size-3.5 shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors ml-2" />
                </a>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('about.purpose')}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>{t('about.purpose1')}</p>
          <p>{t('about.purpose2')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('about.providers')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>BPDB — Bangladesh Power Development Board</li>
            <li>BREB / Palli Bidyut — Bangladesh Rural Electrification Board</li>
            <li>DESCO — Dhaka Electric Supply Company</li>
            <li>DPDC — Dhaka Power Distribution Company</li>
            <li>NESCO — Northern Electricity Supply Company</li>
            <li>WZPDCL — West Zone Power Distribution Company</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('about.privacy')}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {t('about.privacyText')}
        </CardContent>
      </Card>
    </div>
  )
}
