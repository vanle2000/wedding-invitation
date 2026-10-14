import { forwardRef } from 'react'
import PaperGrain from '../art/PaperGrain'
import Closing from './Closing'
import Details from './Details'
import Invitation from './Invitation'
import Rsvp from './Rsvp'
import Timeline from './Timeline'
import Venue from './Venue'

interface InvitationCanvasProps {
  hidden: boolean
}

/** One continuous ivory correspondence card; sections are semantic, never UI cards. */
const InvitationCanvas = forwardRef<HTMLElement, InvitationCanvasProps>(function InvitationCanvas({ hidden }, ref) {
  return (
    <main
      ref={ref}
      tabIndex={-1}
      inert={hidden}
      aria-hidden={hidden}
      className="relative mx-auto min-h-screen w-full max-w-canvas overflow-hidden bg-ivory outline-none md:my-7 md:shadow-[0_28px_70px_-32px_rgba(10,2,4,0.75)]"
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 z-30 w-px bg-gold/25" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 z-30 w-px bg-gold/25" />
      <Invitation />
      <Details />
      <Venue />
      <Timeline />
      <Rsvp />
      <Closing />
      <PaperGrain opacity={0.025} className="z-20" />
    </main>
  )
})

export default InvitationCanvas
