# starfield.js
A starfield background with an element hover acceleration effect.\
No external libs, just html canvas.

https://github.com/user-attachments/assets/1d9ab61d-5b7b-4fa0-ade3-78ddf4cd4c81

[Live demo](https://annikav9.github.io/starfield.js)

## Usage
Define a container element and an origin element with the `starfield` and `starfield-origin` classes.
```html
<div class="starfield">
  <button class="starfield-origin">Hover me!</button>
</div>
```
Source the script:
```html
<script src="starfield.js"></script>
```
Call the initializer function:
```html
<script>
  Starfield.setup();
</script>
```
Tweak the effect with configuration options:
```html
<script>
  Starfield.setup({
    // Default values
    numStars: 250,
    baseSpeed: 1,
    maxAcceleration: 10,
    accelerationRate: 0.2,
    decelerationRate: 0.2,
    minSpawnRadius: 80,
    maxSpawnRadius: 500,
  });
</script>
```

## Credits
Original idea from [Barney Codes](https://www.youtube.com/watch?v=p0I5bNVcYP8), modified heavily for optimization, p5.js dependency removal, configurability and acceleration effect.

## License
[MIT License](/LICENSE)
