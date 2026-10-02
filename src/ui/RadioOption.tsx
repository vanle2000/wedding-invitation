interface RadioOptionProps {
  name: string
  value: string
  label: string
  checked: boolean
  onChange: (value: string) => void
}

/**
 * Custom radio: a thin burgundy ring with a filled dot when selected.
 * The native input stays in the DOM (visually hidden) for accessibility.
 */
export default function RadioOption({ name, value, label, checked, onChange }: RadioOptionProps) {
  return (
    <label className="group flex items-center gap-4 min-h-[48px] cursor-pointer select-none">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only peer"
      />
      <span
        aria-hidden="true"
        className="relative grid place-items-center w-5 h-5 rounded-full border border-burgundy/50 transition-colors duration-500
          peer-focus-visible:ring-2 peer-focus-visible:ring-burgundy/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper
          group-hover:border-burgundy"
      >
        <span
          className={`block w-2.5 h-2.5 rounded-full bg-burgundy transition-all duration-500 ease-paper ${
            checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        />
      </span>
      <span className={`font-serif text-xl transition-colors duration-500 ${checked ? 'text-charcoal' : 'text-charcoal/70'}`}>
        {label}
      </span>
    </label>
  )
}
