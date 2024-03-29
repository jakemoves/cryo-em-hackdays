<!-- <svelte:window on:keydown|preventDefault={onKeyDown} /> -->
<svelte:window on:keydown={onKeyDown} />

<h2>Session 1</h2>
<p><em>Selection & inspector pattern (2.5hrs)</em></p> 

<fieldset>
  <legend>Global controls</legend>
  <button on:click={handleRefresh}>Refresh</button>
</fieldset>

<h3>Grid</h3>
<div class="frame-wrapper">
  <fieldset class="frame" style="--frame-cols: {FRAME_COLS}">
    {#each particles as particle (particle.id)}
      <input type="radio" 
        name="particle-frame" 
        id="{particle.id}" 
        value="{particle.id}" 
        class="particle" 
        checked="{particle.id == inspectedParticleId}"
        style="background-color: {particle.colour}" on:click={handleInspectParticle} />
    {/each}
  </fieldset>

  <section class="inspector">
    {#if inspectedParticle}
      <div class="particle" style="background-color: {inspectedParticle.colour}"></div>
    {/if}
  </section>
</div>

<p>
  Click a square cell to inspect it.<br/>
  Use arrow keys to navigate the grid.
</p>

<!-- <div class="dom-canvas-wrapper">
  <fieldset class="dom-canvas">
    <legend>DOM-canvas hybrid</legend>
    {#each particles as particle (particle.id)}
      <input type="radio"
        name="particle-dom-canvas" 
        id="{particle.id}" 
        value="{particle.id}"  class="particle" on:click={handleInspectParticle} style="background-color: {particle.colour}; top: {particle.y}px; left: {particle.x}px"/>
    {/each}
  </fieldset>

  <section class="inspector">
    {#if inspectedParticle}
      <div class="particle" style="background-color: {inspectedParticle.colour}"></div>
    {/if}
  </section>
</div> -->

<script lang="ts">
  const FRAME_COLS = 10

  class Particle {
    id: string
    x: number
    y: number
    colour: string

    constructor(id: string){
        this.id = id
        this.x = Math.random() * 100
        this.y = Math.random() * 100
        this.colour = randomElement(colours)
    }
  }

  const colours = ["fuchsia", "deeppink", "darkviolet", "hotpink", "lightgray", "magenta"]

  let particles = initParticles()
  let inspectedParticleId: string

  let inspectedParticle: Particle | undefined
  $: inspectedParticle = particles.find(particle => particle.id == inspectedParticleId)
  
  function initParticles(): Particle[]{
    return [...new Array(100)].map((element, index) => new Particle(index.toString()))
    console.log(particles)
  }

  function handleInspectParticle(event: Event){
    console.log("handleInspectParticle")
    const target = event.target as HTMLInputElement
    
    if(target && target.value){
      inspectedParticleId = target.value
    }
  }

  function handleInput(event: Event){
    console.log("input")
  }

  function handleRefresh(event: Event){
    console.log("refresh")
    particles = initParticles()
    inspectedParticle = undefined
  }

  // generics would let me type the input and return
  function randomElement(array: Array<any>): any {
    return array[Math.floor(Math.random() * array.length)]
  }

  function onKeyDown(event: KeyboardEvent) {
    switch(event.key){
      case "ArrowDown":
        event.preventDefault()
        console.log("blocked arrow down")
        inspectedParticleId = (parseInt(inspectedParticleId) + FRAME_COLS).toString()
        
        // hacky
        document.getElementById(inspectedParticleId)?.focus()
        break
      case "ArrowUp":
        event.preventDefault()
        console.log("blocked arrow up")
        inspectedParticleId = (parseInt(inspectedParticleId) - FRAME_COLS).toString()
        
        // hacky
        document.getElementById(inspectedParticleId)?.focus()
        break
      default:
        break
    }
    
    return
  }
</script>

<style>
  h2 {
    margin-bottom: 0.25em;
  }

  p {
    margin-top: 0.25em;
  }
  
  fieldset {
    margin-left: 0;
    margin-bottom: 20px;
    width: max-content;
  }

  input[type="radio"].particle {
    appearance: none;
    width: 10px;
    height: 10px;
    margin: 0;
    padding: 0;
    border: 0 none;
  }

  input[type="radio"].particle:checked{
    border: 1px solid white;
  }

  .frame-wrapper /*.dom-canvas-wrapper*/ {
    display: flex;
  }

  .frame:not(:first-child), /*.dom-canvas:not(:first-child),*/ .inspector {
    margin-left: 10px;
    overflow: hidden;
  }

  fieldset.frame {
    padding: 0;

    border: 1px solid lightslategray;
    width: max-content;
    height: max-content;

    display: grid;
    grid-template-columns: repeat(var(--frame-cols), 10px);
    gap: 0px;
  }

  .frame > .particle:focus, .frame > .particle:active {
    border: 1px solid white;
  }

  /* .dom-canvas {
    width: 100px;
    height: 100px;
    border: 1px solid lightslategray;
    position: relative;
  }

  .dom-canvas > .particle {
    position: absolute;
    border-radius: 50%;
  }

  .dom-canvas > input[type="radio"].particle:checked{
    border: 1px solid black;
  } */

  .inspector {
    width: 100px;
    height: 100px;
    border: 1px solid lightslategray;
  }

  .inspector > .particle {
    width: 100%;
    height: 100%;
  }

  .particle {
    width: 10px;
    height: 10px;
    padding: 0;
    border: 0 none;
  }
</style>


