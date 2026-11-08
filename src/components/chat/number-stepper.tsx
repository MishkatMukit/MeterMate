import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/utils/utils.cn'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/context/language-context'

interface NumberStepperProps {
  min?: number
  max?: number
  presets: number[]
  onConfirm: (value: number) => void
  label?: string
}

export function NumberStepper({
  min = 1,
  max = 50,
  presets,
  onConfirm,
  label,
}: NumberStepperProps) {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const [value, setValue] = useState(min)

  const decrement = () => setValue((v) => Math.max(min, v - 1))
  const increment = () => setValue((v) => Math.min(max, v + 1))
  const selectPreset = (preset: number) =>
    setValue(Math.min(max, Math.max(min, preset)))

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }

  return (
    <motion.div
      {...motionProps}
      className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-3 sm:p-4 shadow-sm w-full max-w-sm min-w-0 sm:ml-10.5 sm:max-w-[calc(100%-2.625rem)]"
    >
      {/* Label */}
      {label && (
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      )}

      {/* Stepper row */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={value <= min}
          aria-label="Decrease"
        >
          <Minus className="size-4" />
        </Button>

        <span className="min-w-[3rem] text-center text-2xl font-bold tabular-nums text-foreground">
          {value}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={value >= max}
          aria-label="Increase"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {presets.map((preset) => (
          <Button
            key={preset}
            variant={value === preset ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => selectPreset(preset)}
            className={cn(
              'h-8 min-w-[2.25rem] rounded-lg px-2.5 text-xs font-medium',
              value === preset && 'ring-1 ring-primary/30',
            )}
          >
            {preset}
          </Button>
        ))}
      </div>

      {/* Confirm */}
      <Button onClick={() => onConfirm(value)} className="mt-1 w-full">
        {t('bill.confirm')}
      </Button>
    </motion.div>
  )
}
