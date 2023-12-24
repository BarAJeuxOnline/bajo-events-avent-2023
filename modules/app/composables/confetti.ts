class Confetti {
  gravity = 10
  particle_count = 75
  particle_size = 1
  explosion_power = 25
  destroy_target = true
  fade = false

  bursts = []
  time
  delta_time
  element
  static CONFIG
  static CTX

  constructor(private elementId: string) {
    if (!elementId)
      throw new Error('Missing id')

    if (!Confetti.CONFIG)
      Confetti.CONFIG = new Config()

    this.time = new Date().getTime()
    this.delta_time = 0

    this.setupCanvasContext()
    this.setupElement(elementId)

    window.requestAnimationFrame(this.update)
  }

  setCount(count: number) {
    if (typeof count !== 'number')
      throw new Error('Input must be of type \'number\'')

    Confetti.CONFIG.particle_count = count
  }

  setPower(power: number) {
    if (typeof power !== 'number')
      throw new Error('Input must be of type \'number\'')

    Confetti.CONFIG.explosion_power = power
  }

  setSize(size: number) {
    if (typeof size !== 'number')
      throw new Error('Input must be of type \'number\'')

    Confetti.CONFIG.particle_size = size
  }

  setFade(fade: boolean) {
    if (typeof fade !== 'boolean')
      throw new Error('Input must be of type \'boolean\'')

    Confetti.CONFIG.fade = fade
  }

  destroyTarget(destroy: boolean) {
    if (typeof destroy !== 'boolean')
      throw new Error('Input must be of type \'boolean\'')

    Confetti.CONFIG.destroy_target = destroy
  }

  setupCanvasContext() {
    if (!Confetti.CTX) {
      const canvas = document.createElement('canvas')
      Confetti.CTX = canvas.getContext('2d')
      canvas.width = 2 * window.innerWidth
      canvas.height = 2 * window.innerHeight
      canvas.style.position = 'fixed'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.width = 'calc(100%)'
      canvas.style.height = 'calc(100%)'
      canvas.style.margin = '0'
      canvas.style.padding = '0'
      canvas.style.zIndex = '999999999'
      canvas.style.pointerEvents = 'none'
      document.body.appendChild(canvas)

      window.addEventListener('resize', () => {
        canvas.width = 2 * window.innerWidth
        canvas.height = 2 * window.innerHeight
      })
    }
  }

  setupElement(elementId: string) {
    this.element = document.getElementById(elementId)
    if (this.element) {
      this.element.addEventListener('click', (event) => {
        const position = new Point(2 * event.clientX, 2 * event.clientY)
        this.bursts.push(new Burst(position))
        if (Confetti.CONFIG.destroy_target)
          this.element.style.visibility = 'hidden'
      })
    }
  }

  update = (timestamp: number) => {
    this.delta_time = (timestamp - this.time) / 1000
    this.time = timestamp

    for (let i = this.bursts.length - 1; i >= 0; i--) {
      this.bursts[i].update(this.delta_time)
      if (this.bursts[i].particles.length === 0)
        this.bursts.splice(i, 1)
    }

    this.draw()
    window.requestAnimationFrame(this.update)
  }

  draw() {
    clearScreen()
    for (const burst of this.bursts)
      burst.draw()
  }
}

class Burst {
  particles = []

  constructor(private position: Point) {
    for (let i = 0; i < Confetti.CONFIG.particle_count; i++)
      this.particles.push(new Particle(position))
  }

  update(deltaTime: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(deltaTime)
      if (this.particles[i].checkBounds())
        this.particles.splice(i, 1)
    }
  }

  draw() {
    for (const particle of this.particles)
      particle.draw()
  }
}

class Particle {
  size: Point
  position: Point
  velocity: Point
  rotation: number
  rotation_speed: number
  hue: number
  opacity: number
  lifetime: number

  constructor(position: Point) {
    this.size = new Point(
      (16 * Math.random() + 4) * Confetti.CONFIG.particle_size,
      (4 * Math.random() + 4) * Confetti.CONFIG.particle_size,
    )
    this.position = new Point(
      position.x - this.size.x / 2,
      position.y - this.size.y / 2,
    )
    this.velocity = generateVelocity()
    this.rotation = 360 * Math.random()
    this.rotation_speed = 10 * (Math.random() - 0.5)
    this.hue = 360 * Math.random()
    this.opacity = 100
    this.lifetime = Math.random() + 0.25
  }

  update(deltaTime: number) {
    this.velocity.y
      += (Confetti.CONFIG.gravity * (this.size.y / (10 * Confetti.CONFIG.particle_size)))
      * deltaTime
    this.velocity.x += 25 * (Math.random() - 0.5) * deltaTime
    this.velocity.y *= 0.98
    this.velocity.x *= 0.98
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.rotation += this.rotation_speed

    if (Confetti.CONFIG.fade)
      this.opacity -= this.lifetime
  }

  checkBounds() {
    return this.position.y - 2 * this.size.x > 2 * window.innerHeight
  }

  draw() {
    drawRectangle(
      this.position,
      this.size,
      this.rotation,
      this.hue,
      this.opacity,
    )
  }
}

class Point {
  constructor(public x: number = 0, public y: number = 0) {}
}

class Config {
  gravity = 10
  particle_count = 75
  particle_size = 1
  explosion_power = 25
  destroy_target = true
  fade = false
}

function generateVelocity() {
  const x = Math.random() - 0.5
  const y = Math.random() - 0.7
  const magnitude = Math.sqrt(x * x + y * y)
  const normalizedY = y / magnitude

  return new Point(
    (x / magnitude) * (Math.random() * Confetti.CONFIG.explosion_power),
    normalizedY * (Math.random() * Confetti.CONFIG.explosion_power),
  )
}

function clearScreen() {
  if (Confetti.CTX)
    Confetti.CTX.clearRect(0, 0, 2 * window.innerWidth, 2 * window.innerHeight)
}

function drawRectangle(
  position: Point,
  size: Point,
  rotation: number,
  hue: number,
  opacity: number,
) {
  if (Confetti.CTX) {
    Confetti.CTX.save()
    Confetti.CTX.beginPath()
    Confetti.CTX.translate(position.x + size.x / 2, position.y + size.y / 2)
    Confetti.CTX.rotate(rotation * Math.PI / 180)
    Confetti.CTX.rect(-size.x / 2, -size.y / 2, size.x, size.y)
    Confetti.CTX.fillStyle = `hsla(${hue}deg, 90%, 65%, ${opacity}%)`
    Confetti.CTX.fill()
    Confetti.CTX.restore()
  }
}

export default Confetti
