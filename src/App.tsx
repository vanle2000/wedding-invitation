import { useEffect, useRef, useState } from 'react'
import Closing from './components/Closing'
import Details from './components/Details'
import Envelope from './components/Envelope'
import Invitation from './components/Invitation'
import MonogramReveal from './components/MonogramReveal'
import Rsvp from './components/Rsvp'
import Timeline from './components/Timeline'
import Venue from './components/Venue'
import PaperTexture from './decorations/PaperTexture'

export default function App() {
  const [opened, setOpened] = useState(false)
  const invitationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.body.classList.toggle('no-scroll', !opened)
    if (!opened) window.scrollTo(0, 0)
    if (opened) requestAnimationFrame(() => invitationRef.current?.focus({ preventScroll: true }))
    return () => document.body.classList.remove('no-scroll')
  }, [opened])

  return (
    <>
      {!opened && <Envelope onComplete={() => setOpened(true)} />}

      <main
        ref={invitationRef}
        tabIndex={-1}
        inert={!opened}
        aria-hidden={!opened}
        className="relative mx-auto min-h-screen w-full max-w-invite overflow-hidden bg-paper outline-none md:my-6 md:shadow-[0_18px_50px_-30px_rgba(61,53,55,0.38)]"
      >
        {/* Continuous gilded paper edge—the sections share one physical sheet. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 z-20 w-px bg-gold/20" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 z-20 w-px bg-gold/20" />

        <MonogramReveal active={opened} />
        <Invitation />
        <Details />
        <Venue />
        <Timeline />
        <Rsvp />
        <Closing />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
          <PaperTexture opacity={0.035} />
        </div>
      </main>
    </>
  )
}
