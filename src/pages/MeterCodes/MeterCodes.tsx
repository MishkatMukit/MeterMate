import { useState, useMemo } from 'react'
import { Search, Copy, Check, ChevronDown, Smartphone, Info, BadgeCheck, Cpu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from '@/context/language-context'
import { METER_BOOK } from '@/constants/meter-codes.constants'

export default function MeterCodesPage() {
  const { lang, t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const isBn = lang === 'bn'

  const filteredBook = useMemo(() => {
    if (!searchQuery.trim()) return METER_BOOK
    const q = searchQuery.toLowerCase()
    return METER_BOOK.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.models?.some((m) => m.toLowerCase().includes(q)) ?? false) ||
        b.codes.some(
          (c) =>
            c.code.includes(q) ||
            c.purpose.toLowerCase().includes(q) ||
            c.purposeBn.includes(q),
        ),
    ).map((brand) => ({
      ...brand,
      codes: brand.codes.filter(
        (c) =>
          c.code.includes(q) ||
          c.purpose.toLowerCase().includes(q) ||
          c.purposeBn.includes(q),
      ),
    }))
  }, [searchQuery])

  const toggleBrand = (name: string) => {
    setExpandedBrand((prev) => (prev === name ? null : name))
  }

  const copyCode = async (code: string, purpose: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      toast.success(t('meterCodes.copied', purpose))
      setTimeout(() => setCopiedCode(null), 2000)
    } catch {
      toast.error(t('token.copyFailed'))
    }
  }

  return (
    <div className="space-y-6">
      <section className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{t('meterCodes.title')}</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {t('meterCodes.subtitle')}
        </p>
      </section>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder={t('meterCodes.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredBook.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <p className="text-sm text-muted-foreground">{t('meterCodes.noResults')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredBook.map((brand) => {
            const isOpen = expandedBrand === brand.name
            return (
              <Card key={brand.name} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleBrand(brand.name)}
                  className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Smartphone className="h-5 w-5 text-primary shrink-0" />
                    <div className="min-w-0">
                      <span className="font-semibold text-sm">{brand.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {brand.codes.length} {t('meterCodes.codes')}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {brand.providers.map((p) => (
                          <span
                            key={p}
                            className="inline-block rounded-md bg-primary/5 border border-primary/15 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {p}
                          </span>
                        ))}
                        {brand.models?.map((m) => (
                          <span
                            key={m}
                            className="inline-flex items-center gap-1 rounded-md bg-accent/50 border border-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground"
                          >
                            <Cpu className="h-3 w-3" />
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="border-t px-5 py-3 space-y-1.5">
                        {brand.codes.map((entry) => {
                          const isCopied = copiedCode === entry.code
                          return (
                            <div
                              key={entry.code}
                              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-muted/50 transition-colors group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <code className="shrink-0 rounded-lg bg-primary/5 border border-primary/15 px-2.5 py-1 font-mono text-sm font-semibold text-primary">
                                  {entry.code}
                                </code>
                                <span className="flex items-center gap-1.5 text-sm text-foreground truncate">
                                  {entry.verified && (
                                    <span title={t('meterCodes.verified')}>
                                      <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
                                    </span>
                                  )}
                                  {isBn ? entry.purposeBn : entry.purpose}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                                onClick={() => copyCode(entry.code, isBn ? entry.purposeBn : entry.purpose)}
                                aria-label={t('meterCodes.copyCode')}
                              >
                                {isCopied ? (
                                  <Check className="h-4 w-4 text-primary" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            )
          })}
        </div>
      )}

      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-5 flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('meterCodes.disclaimer')}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
