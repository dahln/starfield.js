# starfield.js
An interactive star field background effect with html canvas.

https://github.com/user-attachments/assets/1d9ab61d-5b7b-4fa0-ade3-78ddf4cd4c81

[Demo playground](https://annikav9.github.io/starfield.js)

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
```javascript
Starfield.setup({
  // Default values
  numStars: 250,                     // Number of stars
  baseSpeed: 1,                      // Base speed of stars (will affect acceleration)
  trailLength: 0.8,                  // Length of star trail (0-1)
  starColor: 'rgb(230, 230, 100)',   // Color of stars (only rgb)
  hueJitter: 0,                      // Maximum hue variation in degrees (0-360)
  maxAcceleration: 10,               // Maximum acceleration
  accelerationRate: 0.2,             // Rate of acceleration
  decelerationRate: 0.2,             // Rate of deceleration
  minSpawnRadius: 80,                // Minimum spawn distance from origin
  maxSpawnRadius: 500,               // Maximum spawn distance from origin
});
```
Use the [demo playground](https://annikav9.github.io/starfield.js) to experiment with the options.

If you need to change the options while the starfield is running, set them through `Starfield.config`:
```javascript
Starfield.config.starColor = 'rgb(255, 99, 71)';
```
> [!NOTE]
> The `numStars` option cannot be changed after the starfield is started.

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
