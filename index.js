import { initDrag } from './modules/drag.js';
import { initDocs } from './modules/docs.js';
import { initPanel } from './modules/panel.js';
import { initMobile } from './modules/mobile.js';

document.addEventListener('DOMContentLoaded', () => {
  initDrag();
  initDocs();
  initPanel();
  initMobile();
});
