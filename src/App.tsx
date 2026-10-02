import { useEffect, useState } from 'react'
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

  // Lock scrolling while the envelope is on screen.
  useEffect(() => {
    document.body.classList.toggle('no-scroll', !opened)
    if (!opened) window.scrollTo(0, 0)
    return () => document.body.classList.remove('no-scroll')
  }, [opened])

  return (
    <>
      {!opened && <Envelope onComplete={() => setOpened(true)} />}

      {/* The invitation is a single mobile-width sheet; on desktop it sits centred on a neutral surround. */}
      <main
        className="relative mx-auto w-full max-w-invite min-h-dvh bg-paper md:shadow-[0_0_0_1px_rgba(139,46,65,0.10),0_30px_60px_-30px_rgba(74,51,56,0.28)]"
        aria-hidden={!opened}
      >
        <MonogramReveal active={opened} />
        <Invitation />
        <Details />
        <Venue />
        <Timeline />
        <Rsvp />
        <Closing />
      </main>

      {/* Global film grain over everything, including the desktop surround */}
      <div className="pointer-events-none fixed inset-0 z-40">
        <PaperTexture opacity={0.045} />
      </div>
    </>
  )
}
