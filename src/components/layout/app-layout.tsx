import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './header'
import { useTranslation } from '@/context/language-context'

export function AppLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <div
          className={
            isHome
              ? 'mx-auto w-full max-w-6xl px-4 py-8 md:px-6'
              : 'mx-auto max-w-3xl px-4 py-8'
          }
        >
          <Outlet />
        </div>
      </main>
      <footer className="border-t py-6 text-center" role="contentinfo">
        <div className="mx-auto max-w-6xl space-y-1 px-4">
          <p className="text-xs text-muted-foreground">{t('footer.privacy')}</p>
          <p className="text-xs text-muted-foreground/60">
            {t('footer.tagline')} &middot; {t('footer.version')}
          </p>
        </div>
      </footer>
    </div>
  )
}
