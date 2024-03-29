<div class="container">
  {#if !isRendered}
    <canvas
      {width} 
      {height}
      bind:this={canvas}
    >
      <!-- add a11y fallback -->
    </canvas>
  {:else}
    <a download="exposure.jpg" href={renderedImageURL}>
      <img class="render" src={renderedImageURL} alt="generated fake cryo-em exposure"/>
    </a>
  {/if}

  <div class="average-colour" style="background-color: rgb({exposureColour}, {exposureColour}, {exposureColour})"></div>
</div>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { exposureAverages } from '$lib/stores/app'

  const width = 100
  const height = 100

  export let particles

  let canvas: HTMLCanvasElement 
  let context: CanvasRenderingContext2D

  let isRendered = false
  let renderedImageURL = "#"
  let downloadLink: HTMLAnchorElement

  onMount(() => {
    context = canvas.getContext('2d')!
    draw()
  })

  onDestroy(() => {
    URL.revokeObjectURL(renderedImageURL)
  })

  function draw(){
    context.fillStyle = "rgb(128, 128, 128)"
    context.fillRect(0, 0, width, height)

    particles.forEach( p => {
      context.fillStyle = p.colour
      context.beginPath()
      context.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      context.fill()
    })

    // noise 
    // this is horRENdously inefficient but ¯\_(ツ)_/¯ 
    // could render this once, then apply as a mask 
    context.fillStyle = "rgba(255, 255, 255, 0.15)"
    for(let i = 0; i < width * height / 2; i++){
      context.fillRect(
        Math.random() * width,
        Math.random() * height,
        1,
        1
      )
    }

    // calculate av colour
    // images are grayscale so we can get away with  only sampling the red channel
    const imageData = context.getImageData(0, 0, width, height)
    
    exposureColour = imageData.data.reduce((bucket, currentValue, currentIndex, array) => {
      if(currentIndex % 4 == 0){
        bucket += currentValue 
      }
      if(currentIndex == array.length-1){
        return bucket * 4 / array.length 
      }

      return bucket
    }, 0)

    $exposureAverages = [...$exposureAverages, exposureColour]
    
    // console.log(exposureColour)

    // i would not swear to the correctness of this average so let's check
    // let colourValues = []
    // for(let i = 0; i < imageData.data.length; i++){
    //   if((i + 1) % 4 != 0){
    //     colourValues.push(imageData.data[i])
    //   }
    // }

    // const testValue = colourValues.reduce((bucket, currentValue) => {
    //   return bucket += currentValue
    // }, 0.0)
    // console.log(testValue / colourValues.length)
  }

  let exposureColour: number = 0

  export const render = () => {
    canvas.toBlob((blob) => {
      if(blob){
        renderedImageURL = URL.createObjectURL(blob)
        isRendered = true
      }
    }, "image/jpeg", 0.75)
  }
  
</script>

<style>
  .container {
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .average-colour {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
  }
</style>
    