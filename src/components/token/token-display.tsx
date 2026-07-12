interface TokenDisplayProps {
  formatted: string
}

export function TokenDisplay({ formatted }: TokenDisplayProps) {
  return (
    <div className="select-all rounded-xl  md:rounded-2xl bg-primary-surface border border-primary-border p-2 md:p-4 text-center shadow-sm">
      <div className="font-mono text-xl sm:text-lg md:text-2xl lg:text-4xl tracking-normal sm:tracking-normal font-bold text-foreground whitespace-nowrap select-all">
        {formatted}
      </div>
    </div>
  )
}
