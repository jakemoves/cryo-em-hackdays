### About this repo

I was excited to get back to Svelte and to explore some ideas that came up after looking at the tech challenge sample app.

My methodology as a coder usually goes proof of concept > prototype > production. All this _very much_ belongs to the proof of concept stage!

#### Session 1
- how might a keyboard-friendly and accessible grid-select interface work?

#### Session 2
- let's make some fake cryo-em images!
- generated circles:
  - random (circle radius) 
  - gaussian random (x position, y position, transparency)
  - inverse gaussian random (colour, to push it to very light or very dark values)
  - noise (but it's lazy code and soooo slow)
- render canvas to image and download it
- super basic vanilla JS plot

#### Session 3
- mostly playing with Observable plots
- swap canvas for rendered images in-place
- note we can see on the graphs which circle parameters were drawn from a gaussian distribution and which weren't
