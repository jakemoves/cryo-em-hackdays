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
<!-- <a on:click={handleSaveImage} href={renderedImageURL} download=true>Save image</a>
{/if}  -->

<script lang="ts">
  import { onMount } from 'svelte';

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
  }

  export const render = () => {
    canvas.toBlob((blob) => {
      if(blob){
        renderedImageURL = URL.createObjectURL(blob)
        isRendered = true
      }
    }, "image/jpeg", 0.75)
  }

  // function handleSaveImage(event: Event){
  //   if(!isRendered){
  //     event.preventDefault()
  //     canvas.toBlob((blob) => {
  //       if(blob){
  //         renderedImageURL = URL.createObjectURL(blob)
  //         isRendered = true
  //         console.log(downloadLink)
  //         downloadLink.dispatchEvent(new Event('click'))
  //       }
  //     }, "image/jpeg", 0.75)
  //   }
  // }

  // function revokeImageURL(event: Event){
  //   URL.revokeObjectURL(renderedImageURL)
  // }
  
</script>

<style>
  canvas, img.render {
    width: 50px;
    height: 50px;
  }
</style>
    