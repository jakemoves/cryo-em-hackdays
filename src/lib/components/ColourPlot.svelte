<div id="plot" bind:this={div}></div>

<script lang="ts">
  import * as Plot from '@observablehq/plot'
  import * as d3 from 'd3'

  export let plotData: any[]
  export let plotAttr: string

  let div: HTMLDivElement

  $: {
    div?.append(
      Plot.plot({
        y: { grid: true},
        marks: [
          Plot.rectY(
            plotData, 
            Plot.binX(
              {y: "count"}, 
              {x: 
                plotAttr
              })
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