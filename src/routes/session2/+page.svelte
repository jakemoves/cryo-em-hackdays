<h2>Session 2</h2>
<p><em>Particles, Canvas, image rendering, vanilla graphs (3hrs)</em></p>

<h3>Exposures</h3>
<main>
  <fieldset>
    <legend>Global controls</legend>
    <button on:click={handleRenderAll} disabled={isRendered}>Render to images</button>
    {#if isRendered}
      <p>Click an exposure to download and save it</p>
    {/if}
  </fieldset>

  <section class="exposures">
    {#each exposureData as exposure, i}
      <ParticleCanvasDay2 particles={exposure} bind:this={canvases[i]}></ParticleCanvasDay2>
    {/each}
  </section>

  <section class="plots">
    <VanillaPlot {exposureData}></VanillaPlot>
  </section>
</main>

<script lang="ts">
  import ParticleCanvasDay2 from '$lib/components/ParticleCanvasDay2.svelte'
  import VanillaPlot from '$lib/components/VanillaPlot.svelte'

  import Particle from '$lib/models/Particle'
	import type { SvelteComponent } from 'svelte';

  let exposureData = [...new Array(100)].map(() => {
    return createParticles(Math.floor(Math.random() + 3 * 3))
  })

  let canvases: SvelteComponent[] = []
  let isRendered = false

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
    width: 555px;
  }

  fieldset {
    width: max-content;
    margin-bottom: 1em;
  }

  .exposures {
    display: grid;
    padding: 5px;
    width: max-content;
    grid-template: repeat(10, 50px) / repeat(10, 50px);
    gap: 5px;
    background-color: #808080;
  }

  section {
    margin-bottom: 20px;
  }
</style>