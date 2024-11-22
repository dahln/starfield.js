/*
 * starfield.js
 *
 * Version: 1.0.0
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
  };

  let stars = [];
  let accelerate = false;
  let accelerationFactor = 0;
  let originY = 0;

  let canvas, ctx;
  let width, height;
  let lastTimestamp = 0;

  function getOriginY(origin, container) {
    const originRect = origin.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return originRect.top - containerRect.top + originRect.height / 2;
  }

  function setup(userConfig = {}) {
    Object.assign(config, userConfig);

    const container = document.querySelector(".starfield");
    const origin = document.querySelector(".starfield-origin");
    container.position = "relative";

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

    originY = getOriginY(origin, container);
    containerBottomY = height;

    for (let i = 0; i < config.numStars; i++) {
      const star = createRandomStar();
      stars.push(star);
    }

    origin.addEventListener("mouseenter", () => (accelerate = true));
    origin.addEventListener("mouseleave", () => (accelerate = false));

    window.addEventListener("resize", () => windowResized(container, origin));

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

    originY = getOriginY(origin, container);
    containerBottomY = height;

    stars.forEach(star => star.reset());
  }

  function createRandomStar() {
    const angle = random(0, Math.PI * 2);
    const radius = random(config.minSpawnRadius, config.maxSpawnRadius);

    const x = width / 2 + Math.cos(angle) * radius;
    const y = originY + Math.sin(angle) * radius;

    return new Star(x, y);
  }

  class Star {
    constructor(x, y) {
      this.pos = { x: x, y: y };
      this.prevpos = { x: x, y: y };
      this.vel = { x: 0, y: 0 };
      this.angle = Math.atan2(y - originY, x - width / 2);
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
      this.angle = Math.atan2(this.pos.y - originY, this.pos.x - width / 2);
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

    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
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

  Starfield.setup = setup;
})(window.Starfield = window.Starfield || {});
