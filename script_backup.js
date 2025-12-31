/* ---------- PERSONALIZATION ---------- */
const HER_NAME = "HER NAME HERE";

const LETTER_TEXT = `My Dearest Love,

As the clock strikes midnight and a new year begins, my heart overflows with gratitude for having you in my life. You are the melody that fills my soul, the light that guides my way, and the love that makes every moment magical.

In your eyes, I see my forever. In your smile, I find my joy. In your arms, I discover my home.

This new year, I promise to cherish every laugh we share, every dream we build together, and every memory we create. You are my today, my tomorrow, and every beautiful moment in between.

With all my heart, forever yours.`; // CHANGE THIS

document.getElementById("herNameDisplay").innerText = HER_NAME;

// Test if script is running
console.log("Script is running!");
document.body.style.border = "5px solid red";

/* ---------- COUNTDOWN ---------- */
const TARGET = new Date(Date.UTC(2026, 0, 1, 0, 0, 0)).getTime(); // January 1, 2026 00:00:00 UTC
const countdown = document.getElementById("countdown");
const openBtn = document.getElementById("openBtn");
const content = document.getElementById("content");
const lock = document.getElementById("lockScreen");
const music = document.getElementById("bgMusic");

// Test if countdown element is found
console.log("Countdown element:", countdown);
if (!countdown) {
  console.error("Countdown element not found!");
} else {
  console.log("Countdown element found, setting initial text");
  countdown.innerHTML = "Script loaded!";
}

let unlocked = false;

setInterval(() => {
  if (!countdown) return;
  const now = Date.now();
  const diff = TARGET - now;
  if (diff <= 0) {
    countdown.innerHTML = "💜 Happy New Year 💜";
    unlocked = true;
    startHearts();
  } else {
    const h = Math.floor(diff / 36e5);
    const m = Math.floor(diff % 36e5 / 6e4);
    const s = Math.floor(diff % 6e4 / 1e3);
    countdown.innerHTML = `${h}h ${m}m ${s}s`;
  }
}, 1000);

openBtn.onclick = () => {
  if (!unlocked) return;
  lock.style.opacity = 0;
  music.play();
  setTimeout(() => {
    lock.style.display = "none";
    content.style.opacity = 1;
    content.style.transform = "translateY(0)";
    initScrollAnimations();
  }, 1000);
};

/* ---------- SCROLL ANIMATIONS ---------- */
function initScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Animate progress bars
        const progresses = entry.target.querySelectorAll('.stat-item .progress');
        progresses.forEach((progress, index) => {
          setTimeout(() => {
            progress.classList.add('animate');
          }, index * 500);
        });
        // Animate photos
        const albumGrid = entry.target.querySelector('.album-grid');
        if (albumGrid) {
          const albumItems = albumGrid.querySelectorAll('.album-item img');
          albumItems.forEach((img, index) => {
            setTimeout(() => {
              img.style.opacity = '1';
              img.style.transform = 'scale(1)';
            }, index * 200);
          });
        }
        // Animate letter
        const letter = entry.target.querySelector('.letter');
        if (letter) {
          setTimeout(() => {
            letter.classList.add('revealed');
            typeLetter();
          }, 1000);
        }
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
  // Reveal first section immediately
  if (sections[0]) sections[0].classList.add('revealed');
}

/* ---------- HEART PARTICLES ---------- */
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let hearts = [];
let namePoints = [];

function startHearts() {
  generateNamePoints();
  setInterval(() => {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 8 + 8,
      speed: Math.random() * 1 + 0.5,
      alpha: 1
    });
  }, 1500);
}

function generateNamePoints() {
  const off = document.createElement('canvas');
  off.width = canvas.width;
  off.height = canvas.height;
  const octx = off.getContext('2d');
  octx.fillStyle = 'white';
  octx.font = 'bold 120px Segoe UI';
  octx.textAlign = 'center';
  octx.fillText(HER_NAME, off.width / 2, off.height / 2);
  const data = octx.getImageData(0,0,off.width,off.height).data;
  namePoints = [];
  for (let y = 0; y < off.height; y += 6) {
    for (let x = 0; x < off.width; x += 6) {
      if (data[(y * off.width + x) * 4 + 3] > 150) {
        namePoints.push({x,y});
      }
    }
  }
}

function drawHeart(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - size * 2, y + size / 2, x, y + size * 2);
  ctx.bezierCurveTo(x + size * 2, y + size / 2, x + size, y - size, x, y);
  ctx.fill();
}

function typeLetter() {
  const el = document.getElementById('typedLetter');
  let i = 0;
  const speed = 40;
  const interval = setInterval(() => {
    el.innerText += LETTER_TEXT[i];
    i++;
    if (i >= LETTER_TEXT.length) clearInterval(interval);
  }, speed);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h, i) => {
    h.y -= h.speed;
    h.alpha -= 0.003;
    ctx.fillStyle = `rgba(180,124,255,${h.alpha})`;
    drawHeart(h.x, h.y, h.size);
    if (h.alpha <= 0) hearts.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};