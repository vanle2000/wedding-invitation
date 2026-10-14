import type { ReactNode } from 'react'

export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 18" className={`mx-auto h-[18px] w-[180px] text-gold ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M0 9 H70 M110 9 H180" />
      <path d="M90 2 C85 7 83 9 76 9 C83 9 85 11 90 16 C95 11 97 9 104 9 C97 9 95 7 90 2Z" />
      <circle cx="70" cy="9" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="110" cy="9" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function GoldFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative border border-gold/60 ${className}`}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-[5px] border border-gold/25" />
      {[
        'left-[-3px] top-[-3px] border-l border-t',
        'right-[-3px] top-[-3px] border-r border-t',
        'bottom-[-3px] left-[-3px] border-b border-l',
        'bottom-[-3px] right-[-3px] border-b border-r',
      ].map((position) => (
        <span key={position} aria-hidden="true" className={`pointer-events-none absolute h-8 w-8 border-gold ${position}`} />
      ))}
      <div className="relative">{children}</div>
    </div>
  )
}
