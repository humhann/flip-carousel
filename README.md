# Flip Carousel

Simple carousel, animated using [Web Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) and the [FLIP technique](https://css-tricks.com/animating-layouts-with-the-flip-technique).

FLIP stands for:
* **First** - save state (position, size, etc.) of object before manipulating it
* **Last** - manipulate the object instantaneously and save state again
* **Invert** - calculate differences (delta) between states, to make it appear as if object is (still) in its first state
* **Play** - transition from first to last state (transform from delta to none)

![Flip Carousel Demo](flip-carousel-demo.gif?raw=true)
