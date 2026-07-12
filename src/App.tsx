import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/context/theme-context'
import { LanguageProvider } from '@/context/language-context'
import { SettingsProvider } from '@/context/settings-context'
import { TokenProvider } from '@/context/token-context'
import { AppLayout } from '@/components/layout/app-layout'
import HomePage from '@/pages/Home/Home'
import FormatterPage from '@/pages/Formatter/Formatter'
import HistoryPage from '@/pages/History/History'
import MeterCodesPage from '@/pages/MeterCodes/MeterCodes'
import FavoritesPage from '@/pages/Favorites/Favorites'
import SettingsPage from '@/pages/Settings/Settings'
import AboutPage from '@/pages/About/About'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SettingsProvider>
        <TokenProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/formatter" element={<FormatterPage />} />
                <Route path="/meter-codes" element={<MeterCodesPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2000,
            }}
          />
        </TokenProvider>
        </SettingsProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
