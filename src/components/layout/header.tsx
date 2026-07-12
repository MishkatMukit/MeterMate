import { Link, useLocation } from 'react-router-dom'
import { Zap, Menu, X } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { useTranslation } from '@/context/language-context'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const navLinks = [
  { to: '/formatter', key: 'nav.formatter' },
  { to: '/meter-codes', key: 'nav.meterCodes' },
  { to: '/history', key: 'nav.history' },
  { to: '/settings', key: 'nav.settings' },
  { to: '/about', key: 'nav.about' },
]

export function Header() {
  const location = useLocation()
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-12 max-w-3xl items-center justify-between px-4 md:px-4">
        <Link to="/" className="flex items-center gap-2.5 font-semibold shrink-0">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-brand text-[15px]">MeterMate</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, key }) => {
            const isActive = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`relative rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(key)}</span>
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex size-10 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="fixed top-12 left-0 right-0 z-50 border-b bg-background shadow-lg md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mx-auto max-w-3xl px-4 py-4">
                {navLinks.map(({ to, key }) => {
                  const isActive = location.pathname === to
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`flex min-h-[44px] items-center rounded-xl px-4 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      {t(key)}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
