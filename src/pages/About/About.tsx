import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'
import { Seo } from '@/components/common/seo'

export default function AboutPage() {
  const { t } = useTranslation()

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
