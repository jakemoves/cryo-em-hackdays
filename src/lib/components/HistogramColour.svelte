<div id="plot" bind:this={div}></div>

<script lang="ts">
  import * as Plot from '@observablehq/plot'
  import * as d3 from 'd3'

  export let plotData: any[]

  let div: HTMLDivElement

  $: brightest = Math.max(...plotData.map(datum => datum.brightness))

  $: darkest = Math.min(...plotData.map(datum => datum.brightness))

  $: {
    div?.append(
      Plot.plot({
        color: {
          range: [colourString(darkest), colourString(brightest)]
        },
        y: { grid: true},
        marks: [
          Plot.rectY(
            plotData, 
            Plot.binX(
              {y: "count"}, 
              {x: "brightness", fill: "brightness"}
            )
          ),
          Plot.ruleY([0])
        ]
      })
  ); // add the new chart
  }

  function colourString(value: number):string {
    let parsedValue = Math.floor(value).toString()
    return `rgb(${parsedValue}, ${parsedValue}, ${parsedValue})`
  }
</script>