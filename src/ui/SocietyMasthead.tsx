interface SocietyMastheadProps {
  dateline: string
  issue?: string
  className?: string
}

/**
 * Lady Whistledown's Society Papers masthead: Cinzel Decorative title between
 * double rules, with a dateline row in small caps.
 */
export default function SocietyMasthead({ dateline, issue = 'Wedding Edition', className = '' }: SocietyMastheadProps) {
  return (
    <header className={`w-full text-center ${className}`}>
      <div className="border-t border-b border-royal/60 py-[3px]">
        <div className="border-t border-b border-royal/40 py-4">
          <p className="font-heading text-wedgwood text-[0.78rem] tracking-[0.22em] leading-snug">
            Lady Whistledown&rsquo;s
          </p>
          <p className="font-heading font-bold text-wedgwood text-[1.35rem] tracking-[0.14em] leading-tight mt-1">
            Society Papers
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between font-sans text-[9px] uppercase tracking-[0.22em] text-charcoal/70">
        <span>{issue}</span>
        <span className="text-royal">❦</span>
        <span>{dateline}</span>
      </div>
      <div className="mt-2 border-t border-royal/30" />
    </header>
  )
}
