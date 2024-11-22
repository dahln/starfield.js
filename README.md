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
You might want to size and position them properly:
```css
.starfield {
  height: 100%;
  width: 100%;
}
.starfield-origin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
Source the script:
```html
<script src="starfield.js"></script>
```
Start the starfield:
```html
<script>
  Starfield.setup();
</script>
```
You can also tweak the effect with configuration options:
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

## Manual mode
If you don't want the origin to be bound to an element, you can use manual mode:
```html
<script>
  Starfield.setup({
    auto: false,
    originX: 100,  // container width / 2 if not set
    originY: 250,  // container height / 2 if not set
  });
</script>
```
In this mode, a couple of features are disabled:
- Acceleration on hover (not bound to an element)
- Automatic canvas resizing

However, a few functions are exposed for manual control:
```javascript
/**
 * Set the origin of the starfield to a specific point.
 * @param {number} x The x-coordinate of the origin.
 * @param {number} y The y-coordinate of the origin.
 */
function setOrigin(x, y)
``` 
```javascript
/**
 * Set the x-coordinate of the origin of the starfield.
 * @param {number} x The x-coordinate of the origin.
 */
function setOriginX(x)
```
```javascript
/**
 * Set the y-coordinate of the origin of the starfield.
 * @param {number} y The y-coordinate of the origin.
 */
function setOriginY(y)
```
```javascript
/**
  * Resize the starfield to a new width and height.
  * @param {number} newWidth The new width of the starfield.
  * @param {number} newHeight The new height of the starfield.
  */
function resize(newWidth, newHeight)
```
```javascript
/**
 * Set the acceleration state of the starfield.
 * @param {boolean} state The acceleration state.
 */
function setAccelerate(state)
```

## Credits
Inspired by Barney Code's [Star Field Hyperdrive Light Speed Effect](https://www.youtube.com/watch?v=p0I5bNVcYP8)

## License
[MIT License](/LICENSE)
