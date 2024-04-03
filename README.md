### About this repo

I was excited to get back to Svelte and to explore some ideas that came up after looking at the tech challenge sample app.

My methodology as a coder usually goes proof of concept > prototype > production. All this _very much_ belongs to the proof of concept stage!

#### Session 1
- how might a keyboard-friendly and accessible grid-select interface work?
- radio groups give us left and right arrow keys for free, let's capture up and down and hop rows to see how it feels (there are unhandled edge cases here)

#### Session 2
- let's make some fake cryo-em images!
- generated circles with parameters from diffent distributions:
  - random (circle radius) 
  - gaussian random (x position, y position, transparency)
  - inverse gaussian random (colour, to push it to very light or very dark values for punchy alpha composites)
  - noise (it's lazy code and soooo slow, but I like to get pixels on the screen; I refactored this in the private repo I shared)
- render canvas to image and download it (I am being profligate with canvases here, it's a proof of concept)
- super basic vanilla JS plot

#### Session 3
- mostly playing with Observable plots
- swap canvas for rendered images in-place
- note we can see on the graphs which circle parameters were drawn from a gaussian distribution and which weren't, in line with expectations

### Screenshots

#### Session 1
<img width="415" alt="Screenshot 2024-04-02 at 2 49 40 PM" src="https://github.com/jakemoves/cryo-em-hackdays/assets/4842862/a3c02ff5-849b-482c-a05b-6ac82be71952">

#### Session 2
<img width="609" alt="Screenshot 2024-04-02 at 2 49 48 PM" src="https://github.com/jakemoves/cryo-em-hackdays/assets/4842862/2806155d-cac0-4de2-b74a-37aa9d980b93">

#### Session 3
<img width="602" alt="Screenshot 2024-04-02 at 2 50 02 PM" src="https://github.com/jakemoves/cryo-em-hackdays/assets/4842862/98299fd7-f718-4d48-a9bc-d865ea5f437e">


