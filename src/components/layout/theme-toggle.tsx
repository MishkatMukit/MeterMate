import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/context/theme-context'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/context/language-context'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  const cycle = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

  return (
    <Button variant="ghost" size="icon" onClick={cycle} title={t('theme.title', theme)}>
      <Icon className="h-[18px] w-[18px]" />
    </Button>
  )
}
