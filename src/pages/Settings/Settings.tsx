import { useTheme } from '@/context/theme-context'
import { useTranslation } from '@/context/language-context'
import { useSettings } from '@/context/settings-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const themeOptions = [
  { value: 'light' as const, key: 'settings.light' },
  { value: 'dark' as const, key: 'settings.dark' },
  { value: 'system' as const, key: 'settings.system' },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { t, lang, setLang } = useTranslation()
  const { autoNext, setAutoNext } = useSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('settings.subtitle')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('settings.appearance')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {themeOptions.map(({ value, key }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  theme === value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('settings.language')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                lang === 'en'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {t('settings.langEn')}
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                lang === 'bn'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {t('settings.langBn')}
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('settings.autoNext')}</CardTitle>
        </CardHeader>
        <CardContent>
          <button
            type="button"
            role="switch"
            aria-checked={autoNext}
            onClick={() => setAutoNext(!autoNext)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
              autoNext ? 'bg-primary' : 'bg-input'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                autoNext ? 'translate-x-[1.375rem]' : 'translate-x-0.5'
              }`}
            />
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
