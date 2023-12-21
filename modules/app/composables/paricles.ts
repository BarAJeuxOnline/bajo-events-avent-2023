import { tsParticles } from '@tsparticles/engine'
import { loadConfettiPreset } from '@tsparticles/preset-confetti'

// TODO use it

export function useParticles() {
  let particles: any

  const loading = ref(true)

  onMounted(async () => {
    await loadConfettiPreset(tsParticles)

    await tsParticles.load({
      id: 'tsparticles',
      options: [
        {
          /* options here */
        },
        {
          /* other options here */
        },
      ],
      index: 1,
    })

    tsParticles.setOnClickHandler((event, particles) => {
      /* custom on click handler */
    })

    particles = tsParticles.domItem(0)

    loading.value = false
  })

  return {
    particles,
    loading,
  }
}
