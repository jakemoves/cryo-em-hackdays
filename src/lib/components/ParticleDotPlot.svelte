<div id="plot" bind:this={div}></div>

<script lang="ts">
  import * as Plot from '@observablehq/plot'
  import * as d3 from 'd3'

  export let plotData: any[]

  let div: HTMLDivElement

  $: {
    div?.append(Plot.dot(plotData, {x: "X", y: "Y"}).plot({grid: true})); // add the new chart
  }

</script>