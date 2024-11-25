import { initDrag } from './modules/drag.js';
import { initDocs } from './modules/docs.js';
import { initPanel } from './modules/panel.js';
import { initMobile } from './modules/mobile.js';
import Starfield from './starfield.js';

document.addEventListener('DOMContentLoaded', () => {
  Starfield.setup({
    baseSpeed: 3,
    maxAcceleration: 2,
    accelerationRate: 0.05,
    decelerationRate: 0.05,
  });
  initDrag();
  initDocs();
  initPanel(Starfield);
  initMobile();
});
