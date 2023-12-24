import Confetti from './confetti'

export function useParticles() {
  const loading = ref(true)

  function show() {
    const confetti = new Confetti('test')
    confetti.setCount(75)
    confetti.setSize(1)
    confetti.setPower(25)
    confetti.setFade(false)
    confetti.destroyTarget(true)
  }

  return {
    show,
    loading,
  }
}
