const updateConfig = {
  trailLength: (value) => {
    if (value === "") return;
    Starfield.config.trailLength = parseFloat(value);
  },
  starColor: (value) => {
    const numericValue = parseInt(value.replace("#", ""), 16);
    const r = (numericValue >> 16) & 0xFF;
    const g = (numericValue >> 8) & 0xFF;
    const b = numericValue & 0xFF;
    Starfield.config.starColor = `rgb(${r}, ${g}, ${b})`;
  },
  hueJitter: (value) => {
    if (value === "") return;
    Starfield.config.hueJitter = parseInt(value);
  },
  baseSpeed: (value) => {
    if (value === "") return;
    Starfield.config.baseSpeed = parseFloat(value);
  },
  maxAcceleration: (value) => {
    if (value === "") return;
    Starfield.config.maxAcceleration = parseFloat(value);
  },
  accelerationRate: (value) => {
    if (value === "") return;
    Starfield.config.accelerationRate = parseFloat(value);
  },
  decelerationRate: (value) => {
    if (value === "") return;
    Starfield.config.decelerationRate = parseFloat(value);
  },
  minSpawnRadius: (value) => {
    if (value === "") return;
    Starfield.config.minSpawnRadius = parseInt(value, 10);
  },
  maxSpawnRadius: (value) => {
    if (value === "") return;
    Starfield.config.maxSpawnRadius = parseInt(value, 10);
  },
};

function generateEmbedCode() {
  const config = {
    starColor: document.getElementById('starColor').value,
    hueJitter: parseInt(document.getElementById('hueJitter').value),
    trailLength: parseFloat(document.getElementById('trailLength').value),
    baseSpeed: parseFloat(document.getElementById('baseSpeed').value),
    maxAcceleration: parseFloat(document.getElementById('maxAcceleration').value),
    accelerationRate: parseFloat(document.getElementById('accelerationRate').value),
    decelerationRate: parseFloat(document.getElementById('decelerationRate').value),
    minSpawnRadius: parseInt(document.getElementById('minSpawnRadius').value, 10),
    maxSpawnRadius: parseInt(document.getElementById('maxSpawnRadius').value, 10),
  };

  const numericValue = parseInt(config.starColor.replace("#", ""), 16);
  const r = (numericValue >> 16) & 0xFF;
  const g = (numericValue >> 8) & 0xFF;
  const b = numericValue & 0xFF;
  const rgbColor = `rgb(${r}, ${g}, ${b})`;

  const embedCode =
    '&lt;script src="starfield.js"&gt;&lt;/script&gt;\n' +
    '&lt;script&gt;\n' +
    '  Starfield.setup({\n' +
    `    starColor: "${rgbColor}",\n` +
    `    hueJitter: ${config.hueJitter},\n` +
    `    trailLength: ${config.trailLength},\n` +
    `    baseSpeed: ${config.baseSpeed},\n` +
    `    maxAcceleration: ${config.maxAcceleration},\n` +
    `    accelerationRate: ${config.accelerationRate},\n` +
    `    decelerationRate: ${config.decelerationRate},\n` +
    `    minSpawnRadius: ${config.minSpawnRadius},\n` +
    `    maxSpawnRadius: ${config.maxSpawnRadius}\n` +
    '  });\n' +
    '&lt;/script&gt;';

  document.getElementById('embed-code').innerHTML = embedCode;
}

generateEmbedCode();

document.getElementById('copy-embed-code').addEventListener('click', function () {
  const codeContent = document.getElementById('embed-code').textContent;
  navigator.clipboard.writeText(codeContent).then(() => {
    document.getElementById('copy-embed-code').textContent = 'Copied!';
    setTimeout(() => {
      document.getElementById('copy-embed-code').textContent = 'Copy';
    }, 2000);
  });
});

const attachDynamicListeners = () => {
  document.getElementById('trailLength').addEventListener('input', (e) => {
    updateConfig.trailLength(e.target.value);
    generateEmbedCode();
  });
  document.getElementById('starColor').addEventListener('input', (e) => {
    updateConfig.starColor(e.target.value);
    generateEmbedCode();
  });
  document.getElementById('hueJitter').addEventListener('input', (e) => {
    updateConfig.hueJitter(e.target.value);
    generateEmbedCode();
  });
  document.getElementById('baseSpeed').addEventListener('input', (e) => {
    updateConfig.baseSpeed(e.target.value);
    generateEmbedCode();
  });
  document.getElementById('maxAcceleration').addEventListener('input', (e) => {
    updateConfig.maxAcceleration(e.target.value);
    generateEmbedCode();
  });
  document.getElementById('accelerationRate').addEventListener('input', (e) => {
    updateConfig.accelerationRate(e.target.value);
    generateEmbedCode();
  });
  document.getElementById('decelerationRate').addEventListener('input', (e) => {
    updateConfig.decelerationRate(e.target.value);
    generateEmbedCode();
  });
  document.getElementById('minSpawnRadius').addEventListener('input', (e) => {
    updateConfig.minSpawnRadius(e.target.value);
    generateEmbedCode();
  });
  document.getElementById('maxSpawnRadius').addEventListener('input', (e) => {
    updateConfig.maxSpawnRadius(e.target.value);
    generateEmbedCode();
  });
};

attachDynamicListeners();

document.getElementById('toggle-config-panel').addEventListener('click', function () {
  const configPanel = document.querySelector('.config-panel');
  const toggleButton = document.getElementById('toggle-config-panel');
  configPanel.classList.toggle('minimized');

  if (configPanel.classList.contains('minimized')) {
    toggleButton.textContent = '+';
    toggleButton.title = 'Maximize Panel';
  } else {
    toggleButton.textContent = '−';
    toggleButton.title = 'Minimize Panel';
  }
});

function adjustPanelHeight() {
  const configPanel = document.querySelector('.config-panel');
  if (!configPanel) return;

  const topGap = 20;
  const bottomGap = 20;
  const contentHeight = configPanel.scrollHeight;
  const availableHeight = window.innerHeight - topGap - bottomGap;

  configPanel.style.maxHeight = `${Math.min(contentHeight, availableHeight)}px`;

  if (contentHeight > availableHeight) {
    configPanel.style.overflowY = 'auto';
  } else {
    configPanel.style.overflowY = 'hidden';
  }
}

window.addEventListener('load', adjustPanelHeight);
window.addEventListener('resize', adjustPanelHeight);
