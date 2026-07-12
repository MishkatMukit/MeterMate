interface TokenDisplayProps {
  formatted: string
}

export function TokenDisplay({ formatted }: TokenDisplayProps) {
  return (
    <div className="select-all rounded-2xl bg-primary-surface border border-primary-border p-6 md:p-8 text-center shadow-sm">
      <div className="font-mono text-xl sm:text-2xl md:text-4xl tracking-widest font-bold text-foreground break-all">
        {formatted}
      </div>
    </div>
  )
}
