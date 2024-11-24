document.getElementById('open-docs').addEventListener('click', function () {
  document.getElementById('documentation-overlay').style.display = 'block';
});

document.getElementById('close-docs').addEventListener('click', function () {
  document.getElementById('documentation-overlay').style.display = 'none';
});

document.getElementById('documentation-overlay').addEventListener('click', function (e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});
