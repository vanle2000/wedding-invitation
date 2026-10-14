import { useEffect, useRef, useState } from 'react'
import GatefoldCover from './components/GatefoldCover'
import InvitationCanvas from './components/InvitationCanvas'

export default function App() {
  const [opened, setOpened] = useState(false)
  const canvasRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.body.classList.toggle('is-locked', !opened)
    if (!opened) window.scrollTo(0, 0)
    if (opened) requestAnimationFrame(() => canvasRef.current?.focus({ preventScroll: true }))
    return () => document.body.classList.remove('is-locked')
  }, [opened])

  return (
    <>
      {!opened && <GatefoldCover onComplete={() => setOpened(true)} />}
      <InvitationCanvas ref={canvasRef} hidden={!opened} />
    </>
  )
}
