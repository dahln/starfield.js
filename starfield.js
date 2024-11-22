/*
 * starfield.js
 *
 * Version: 1.1.0
 * Description: Interactive starfield background
 *
 * Usage:
 *  Starfield.setup({
 *    // options
 *  });
 */
(function (Starfield) {
  const config = {
    numStars: 250,
    baseSpeed: 1,
    maxAcceleration: 10,
    accelerationRate: 0.2,
    decelerationRate: 0.2,
    minSpawnRadius: 80,
    maxSpawnRadius: 500,
    auto: true,
    originX: null,
    originY: null,
  };

  let stars = [];
  let accelerate = false;
  let accelerationFactor = 0;
  let originX = 0;
  let originY = 0;

  let canvas, ctx;
  let width, height;
  let lastTimestamp = 0;

  let origin;

  function getOriginY(origin, container) {
    const originRect = origin.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return originRect.top - containerRect.top + originRect.height / 2;
  }

  function getOriginX(origin, container) {
    const originRect = origin.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return originRect.left - containerRect.left + originRect.width / 2;
  }

  /**
   * Set up and start the starfield animation.
   * @param {Object} userConfig Configuration options.
   */
  function setup(userConfig = {}) {
    Object.assign(config, userConfig);

    const container = document.querySelector(".starfield");
    container.style.position = "relative";

    width = container.clientWidth;
    height = container.clientHeight;

    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";

    container.appendChild(canvas);

    ctx = canvas.getContext("2d");

    if (config.auto) {
      origin = document.querySelector(".starfield-origin");
      originX = getOriginX(origin, container);
      originY = getOriginY(origin, container);

      origin.addEventListener("mouseenter", () => (accelerate = true));
      origin.addEventListener("mouseleave", () => (accelerate = false));

      window.addEventListener("resize", () => windowResized(container, origin));
    } else {
      originX = config.originX !== null ? config.originX : width / 2;
      originY = config.originY !== null ? config.originY : height / 2;
    }

    for (let i = 0; i < config.numStars; i++) {
      const star = createRandomStar();
      stars.push(star);
    }

    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === "visible") {
        lastTimestamp = performance.now();
      }
    });

    requestAnimationFrame(draw);
  }

  function windowResized(container, origin) {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    originX = getOriginX(origin, container);
    originY = getOriginY(origin, container);

    stars.forEach(star => star.reset());
  }

  function createRandomStar() {
    const angle = random(0, Math.PI * 2);
    const radius = random(config.minSpawnRadius, config.maxSpawnRadius);

    const x = originX + Math.cos(angle) * radius;
    const y = originY + Math.sin(angle) * radius;

    return new Star(x, y);
  }

  class Star {
    constructor(x, y) {
      this.pos = { x: x, y: y };
      this.prevpos = { x: x, y: y };
      this.vel = { x: 0, y: 0 };
      this.angle = Math.atan2(y - originY, x - originX);
      this.baseSpeed = random(config.baseSpeed * 0.5, config.baseSpeed * 1.5);
      this.isVisible = true;
    }

    reset() {
      const newStar = createRandomStar();
      this.pos.x = newStar.pos.x;
      this.pos.y = newStar.pos.y;
      this.prevpos.x = this.pos.x;
      this.prevpos.y = this.pos.y;
      this.vel.x = 0;
      this.vel.y = 0;
      this.angle = Math.atan2(this.pos.y - originY, this.pos.x - originX);
    }

    update(acc, deltaTime) {
      const adjustedAcc = acc * this.baseSpeed;

      this.vel.x += Math.cos(this.angle) * adjustedAcc * deltaTime;
      this.vel.y += Math.sin(this.angle) * adjustedAcc * deltaTime;

      this.prevpos.x = this.pos.x;
      this.prevpos.y = this.pos.y;
      this.pos.x += this.vel.x * deltaTime;
      this.pos.y += this.vel.y * deltaTime;
    }

    draw() {
      const velMag = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
      const alpha = map(velMag, 0, 10, 0, 1);
      const weight = map(velMag, 0, 10, 1, 3);

      ctx.lineWidth = weight;
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(this.prevpos.x, this.prevpos.y);
      ctx.lineTo(this.pos.x, this.pos.y);
      ctx.stroke();
    }

    isActive() {
      return onScreen(this.pos.x, this.pos.y);
    }
  }

  function draw(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = (timestamp - lastTimestamp) / 16.67;
    lastTimestamp = timestamp;

    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, width, height);

    if (accelerate) {
      accelerationFactor = Math.min(accelerationFactor + config.accelerationRate * deltaTime, config.maxAcceleration);
    } else {
      accelerationFactor = Math.max(accelerationFactor - config.decelerationRate * deltaTime, 0);
    }

    const baseAcc = 0.01;
    const currentAcc = baseAcc * (1 + accelerationFactor * 10);

    for (let star of stars) {
      star.update(currentAcc, deltaTime);
      star.draw();
      if (!star.isActive()) {
        star.reset();
      }
    }

    requestAnimationFrame(draw);
  }

  function onScreen(x, y) {
    return x >= 0 && x <= width && y >= 0 && y <= height;
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function map(value, start1, stop1, start2, stop2) {
    return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  }

  /**
   * Set the acceleration state of the starfield.
   * @param {boolean} state The acceleration state.
   */
  function setAccelerate(state) {
    accelerate = state;
  }

  /**
   * Set the x-coordinate of the origin of the starfield.
   * @param {number} x The x-coordinate of the origin.
   */
  function setOriginX(x) {
    originX = x;
    stars.forEach(star => {
      star.angle = Math.atan2(star.pos.y - originY, star.pos.x - originX);
    });
  }

  /**
   * Set the y-coordinate of the origin of the starfield.
   * @param {number} y The y-coordinate of the origin.
   */
  function setOriginY(y) {
    originY = y;
    stars.forEach(star => {
      star.angle = Math.atan2(star.pos.y - originY, star.pos.x - originX);
    });
  }

  /**
   * Set the origin of the starfield to a specific point.
   * @param {number} x The x-coordinate of the origin.
   * @param {number} y The y-coordinate of the origin.
   */
  function setOrigin(x, y) {
    originX = x;
    originY = y;
    stars.forEach(star => {
      star.angle = Math.atan2(star.pos.y - originY, star.pos.x - originX);
    });
  }

  /**
    * Resize the starfield to a new width and height.
    * @param {number} newWidth The new width of the starfield.
    * @param {number} newHeight The new height of the starfield.
   */
  function resize(newWidth, newHeight) {
    width = newWidth;
    height = newHeight;
    canvas.width = width;
    canvas.height = height;

    if (config.originY !== null) {
      originY = config.originY;
    } else {
      originY = height / 2;
    }

    stars.forEach(star => star.reset());
  }

  Starfield.setup = setup;
  Starfield.setAccelerate = setAccelerate;
  Starfield.setOrigin = setOrigin;
  Starfield.setOriginX = setOriginX;
  Starfield.setOriginY = setOriginY;
  Starfield.resize = resize;
})(window.Starfield = window.Starfield || {});
