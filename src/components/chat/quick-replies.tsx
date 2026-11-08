import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Lightbulb,
  Fan,
  Snowflake,
  CookingPot,
  Tv,
  Zap,
  Heater,
  Flame,
  Monitor,
  Laptop,
  Wifi,
  Droplets,
  Smartphone,
  Thermometer,
  Refrigerator,
  Microwave,
  WashingMachine,
  Calculator,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { QuickReply } from '@/types/bill-calculator.types'

const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb,
  Fan,
  Snowflake,
  CookingPot,
  Tv,
  Zap,
  Heater,
  Flame,
  Monitor,
  Laptop,
  Wifi,
  Droplets,
  Smartphone,
  Thermometer,
  Refrigerator,
  Microwave,
  WashingMachine,
  Calculator,
}

export function DynamicIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = ICON_MAP[name] ?? Zap
  return <Icon className={className} />
}

interface QuickRepliesProps {
  replies: QuickReply[]
  onSelect: (value: string) => void
  disabled?: boolean
}

export function QuickReplies({
  replies,
  onSelect,
  disabled = false,
}: QuickRepliesProps) {
  const prefersReducedMotion = useReducedMotion()
  const [selected, setSelected] = useState(false)

  const handleSelect = (value: string) => {
    if (disabled || selected) return
    setSelected(true)
    onSelect(value)
  }

  const isDisabled = disabled || selected

  return (
    <AnimatePresence>
      {!selected && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-wrap gap-1.5 sm:gap-2 w-full min-w-0 sm:pl-10.5"
        >
          {replies.map((reply) => (
            <Button
              key={reply.value}
              variant="outline"
              size="sm"
              disabled={isDisabled}
              onClick={() => handleSelect(reply.value)}
              className="rounded-full"
            >
              {reply.icon && (
                <DynamicIcon name={reply.icon} className="size-3.5" />
              )}
              {reply.label}
            </Button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
