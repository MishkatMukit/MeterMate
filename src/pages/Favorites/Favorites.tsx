import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'

export default function FavoritesPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('favorites.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('favorites.comingSoon')}</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <Star className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-sm text-muted-foreground">
            {t('favorites.empty')}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
