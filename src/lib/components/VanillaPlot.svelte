<div class="plot">
  <p class="legend">
    <span style='color: purple'>particle radius</span><br />
    <span style='color: magenta'>particle x position</span>
  </p>

  <canvas
    {width} 
    {height}
    bind:this={canvas}
    >
  </canvas>
</div>

<script lang="ts">
  import {onMount} from 'svelte'

  const width = 900
  const height = 80

  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D

  let radii: number[] = []
  let xValues: number[] = []

  export let exposureData

  onMount(() => {
    context = canvas.getContext('2d')!

    context.fillStyle = "white"
    context.strokeStyle = "purple"
    context.lineWidth = 0.5
    
    context.fillRect(0, 0, width, height)

    context.beginPath()
    context.moveTo(0, height)
    for(let i=0; i < radii.length; i++){
      context.lineTo(i, radii[i])
    }
    context.stroke()

    context.strokeStyle = "magenta"
    context.beginPath()
    context.moveTo(0, height)
    for(let i=0; i < xValues.length; i++){
      context.lineTo(i, xValues[i])
    }
    context.stroke()

  })

  exposureData.map( exposure => {
    exposure.map( particle  => {
      radii.push(particle.radius)
      xValues.push(particle.x)
    })
  })

  radii.sort((a, b) => {
    return a - b
  })

  xValues.sort((a, b) => {
    return a - b
  })
</script>

<style>
  .plot {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .legend {
    white-space: nowrap;
  }

  canvas {
    width: 400px;
  }
</style>
