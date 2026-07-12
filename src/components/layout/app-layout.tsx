import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { useTranslation } from '@/context/language-context'

export function AppLayout() {
  const { t } = useTranslation()

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Outlet />
        </div>
      </main>
      <footer className="border-t py-6 text-center">
        <div className="mx-auto max-w-3xl space-y-1 px-4">
          <p className="text-xs text-muted-foreground">{t('footer.privacy')}</p>
          <p className="text-xs text-muted-foreground/60">
            {t('footer.tagline')} &middot; {t('footer.version')}
          </p>
        </div>
      </footer>
    </div>
  )
}
