# What jsAnimator is

JsAniator is a javascript library to make animation, it can handle both html element, like divs, and canvases.
JsAnimator is lightweight and does not use timers, it only use requestAnimationFrame call for handle animation.
I admit that use JsAnimator could be a nightmare.

# Features

  - jsAnimator use calls to requestAnimationFrame function to handle animation instead of using timers.
  - can handle both html tags animation (via css) and canvases.
  - it is lightweight, fewer than two hundred lines of code
  - it is fast. It try to render at maximum frequency as possible, only limited by the amount of element to animate, the browser capability and especially by the hardware in use.
  - with some precautions it is possible reduce the canvas overhead animation using caching. The cache is not directly managed by the library, users have to write correct code to avoid slowdowns (see examples).

# Installation

Simply include it into your html page like below
```
<script src="../src/jsAnimator.js"></script>
```

## Suggestion

I suggest you to watch examples included inside project to understand how to use library, and have clarifications.
