let down = false;
const origin = document.querySelector('.starfield-origin');

origin.addEventListener('mousedown', function() {
  down = true;
});

window.addEventListener('mouseup', function() {
  down = false;
});

window.addEventListener('mousemove', function(event) {
  if (down) {
    origin.style.top = event.clientY + 'px';
    origin.style.left = event.clientX + 'px';
  }
});
