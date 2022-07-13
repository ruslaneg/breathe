const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const dpr = Math.ceil(window.devicePixelRatio);
canvas.width = 200 * dpr;
canvas.height = 200 * dpr;
ctx.scale(dpr, dpr);

ctx.font = '20px system-ui, sans-serif';
ctx.lineWidth = 5;

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.querySelector('meta[name="theme-color"]').content = 'black';
  document.querySelector('link[rel="manifest"]').href = 'manifest-dark.json';

  ctx.strokeStyle = '#162930';
} else {
  ctx.strokeStyle = '#dbf5ff';
}

const textWidths = {
  inhale: ctx.measureText('inhale').width / 2,
  exhale: ctx.measureText('exhale').width / 2,
  hold: ctx.measureText('hold').width / 2,
};

function text(section, opacity) {
  ctx.fillStyle = `rgba(129, 183, 204, ${opacity})`;

  switch (section) {
    case 0:
      ctx.fillText('inhale', 100 - textWidths.inhale, 105);
      break;
    case 1:
      ctx.fillText('hold', 100 - textWidths.hold, 105);
      break;
    case 2:
      ctx.fillText('exhale', 100 - textWidths.exhale, 105);
      break;
    case 3:
      ctx.fillText('hold', 100 - textWidths.hold, 105);
      break;
  }
}

function line(section, location, length) {
  ctx.fillStyle = '#81b7cc';
  ctx.beginPath();

  switch (section) {
    case 0:
      ctx.rect(location, 0, length, 10);
      break;
    case 1:
      ctx.rect(190, location, 10, length);
      break;
    case 2:
      ctx.rect(200 - location, 190, -length, 10);
      break;
    case 3:
      ctx.rect(0, 200 - location, 10, -length);
      break;
  }

  ctx.fill();
}

function tick(start) {
  const t = Date.now() - start;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(5, 5, 190, 190);

  const section = Math.floor((t / 4000) % 4);
  const nextSection = (section + 1) % 4;
  const completion = (t % 4000) / 4000;

  line(section, completion * 190, 50);

  if (completion > 0.8) {
    line(nextSection, 10, completion * 200 - 160);
  }

  if (completion > 0.85) {
    const opacity = (completion - 0.85) / 0.15;
    text(nextSection, opacity);
    text(section, 1 - opacity);
  } else {
    text(section, 1);
  }

  window.requestAnimationFrame(() => tick(start));
}

tick(Date.now());

navigator.serviceWorker.register('sw.js', { scope: './' });
