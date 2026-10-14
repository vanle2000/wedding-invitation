interface VellumWildflowersProps {
  className?: string
}

function Flower({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="0" cy="-6" rx="3" ry="6" transform={`rotate(${angle})`} />
      ))}
      <circle r="1.5" fill="currentColor" stroke="none" />
    </g>
  )
}

/** Fine white wildflowers printed directly onto the cloudy vellum sheet. */
export default function VellumWildflowers({ className = '' }: VellumWildflowersProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Left meadow */}
      <path d="M32 500 C38 425 54 350 90 278 C112 234 122 190 116 140" />
      <path d="M60 420 C81 389 97 360 104 326 M78 365 C59 343 51 320 53 292 M98 302 C122 281 136 255 140 225" />
      <path d="M50 438 C64 427 78 428 88 442 C72 448 58 447 50 438Z" />
      <path d="M75 382 C89 369 104 369 113 381 C98 389 84 390 75 382Z" />
      <path d="M52 314 C41 300 38 284 44 272 C57 283 61 296 52 314Z" />
      <path d="M116 266 C127 250 141 244 153 250 C145 264 132 271 116 266Z" />
      <Flower x={116} y={136} scale={1.2} />
      <Flower x={53} y={287} scale={0.8} />
      <Flower x={141} y={220} scale={0.9} />
      <Flower x={106} y={322} scale={0.65} />

      {/* Right ascending spray */}
      <path d="M360 500 C352 423 337 348 307 284 C284 235 277 189 286 120" />
      <path d="M343 420 C320 395 307 368 301 337 M329 366 C350 343 357 320 354 294 M304 301 C282 278 269 254 266 226" />
      <path d="M350 438 C336 427 322 428 312 442 C328 448 342 447 350 438Z" />
      <path d="M326 382 C312 369 297 369 288 381 C303 389 317 390 326 382Z" />
      <path d="M355 314 C366 299 369 284 363 271 C350 282 346 297 355 314Z" />
      <path d="M285 266 C273 249 260 244 248 250 C256 264 269 271 285 266Z" />
      <Flower x={286} y={116} scale={1.15} />
      <Flower x={355} y={289} scale={0.82} />
      <Flower x={265} y={221} scale={0.88} />
      <Flower x={299} y={333} scale={0.65} />

      {/* Sparse floating blossoms */}
      <Flower x={205} y={82} scale={0.55} />
      <Flower x={185} y={410} scale={0.48} />
      <Flower x={229} y={446} scale={0.62} />
      <path d="M205 88 C202 119 203 144 210 171" strokeDasharray="2 5" opacity="0.65" />
    </svg>
  )
}
