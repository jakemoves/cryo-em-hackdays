<h2>Session 3</h2>
<p><em>Observable plots (3hrs)</em></p>

<h3>Exposures, in-place canvas-to-image replacement</h3>
<main>
  <!-- <fieldset>
    <legend>Global controls</legend>
    <button on:click={handleRenderAll} disabled={isRendered}>Render to images</button>
    {#if isRendered}
      <p>Click an exposure to download and save it</p>
    {/if}
  </fieldset> -->

  <section class="exposures">
    {#each exposureData as exposure, i}
      <div class="canvas-wrapper">
        <ParticleCanvas particles={exposure} bind:this={canvases[i]}></ParticleCanvas>
      </div>
    {/each}
  </section>

  <section class="plots">
    <ParticleDotPlot plotData={plotParticleData}></ParticleDotPlot>
  </section>
  <section class="plots">
    <ColourPlot plotData={plotParticleData} plotAttr="Radius"></ColourPlot>
  </section>
  <section class="plots">
    <HistogramColour plotData={averageColours}></HistogramColour>
  </section>
</main>

<script lang="ts">
  import {onMount} from 'svelte'
	import type { SvelteComponent } from 'svelte'

  import { exposureAverages } from '$lib/stores/app'

  import ParticleCanvas from '$lib/components/ParticleCanvas.svelte'
  import ParticleDotPlot from '$lib/components/ParticleDotPlot.svelte'
  import ColourPlot from '$lib/components/ColourPlot.svelte'
  import HistogramColour from '$lib/components/HistogramColour.svelte'

  import Particle from '$lib/models/Particle'

  let exposureData = [...new Array(100)].map(() => {
    return createParticles(Math.floor(Math.random() + 3 * 3))
  })

  let plotParticleData: any[] = []
  exposureData.map( exposure => {
    exposure.map( particle  => {
      plotParticleData.push({
        Radius: particle.radius,
        X: particle.x,
        Y: particle.y,
        Colour: particle.colour
      })
    })
  })

  let canvases: SvelteComponent[] = []
  let isRendered = false
  let averageColours: any[]

  $: {
    averageColours = $exposureAverages.map(average => {
      return {brightness: average}
    })
  }

  onMount(() => {
    handleRenderAll()
  })

  function createParticles(count: number): Particle[] {
    return [...new Array(count)]
      .map((element, index) => 
        new Particle(index.toString())
      )
  }

  function handleRenderAll(){
    for(const canvas of canvases){
      canvas.render()
    }
    isRendered = true
  }
</script>

<style>
  h2 {
    margin-bottom: 0.25em;
  }

  p {
    margin-top: 0.25em;
  }
  
  main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  /* fieldset {
    width: max-content;
    margin-bottom: 1em;
  } */

  .exposures {
    display: grid;
    padding: 5px;
    width: max-content;
    grid-template: repeat(10, 25px) / repeat(10, 25px);
    gap: 2px;
    background-color: #808080;
  }

  .canvas-wrapper {
    width: 25px;
    height: 25px;
  }

  .plots {
    width: 278px;
    /* background-color: #eee; */
  }
</style>