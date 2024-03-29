import {randomGaussian, randomInverseGaussian} from '$lib/utils'

class Particle {
  id: string
  x: number
  y: number
  radius: number
  colour: string

  constructor(id: string){
      this.id = id
      this.x = randomGaussian() * 100
      this.y = randomGaussian() * 100
      this.radius = Math.random() * 20 + 4

      const grey = randomInverseGaussian() * 255
      this.colour = `rgba(${grey}, ${grey}, ${grey}, ${randomGaussian()})`
  }
}

export default Particle