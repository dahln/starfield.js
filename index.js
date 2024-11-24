import { initDrag } from './js/drag.js';
import { initDocs } from './js/docs.js';
import { initPanel } from './js/panel.js';

document.addEventListener('DOMContentLoaded', () => {
  initDrag();
  initDocs();
  initPanel();
});
