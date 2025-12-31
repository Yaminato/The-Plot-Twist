/* ---------- PERSONALIZATION ---------- */
const HER_NAME = "ARABELA ALTHEA ESGUERRA";

const LETTER_TEXT = `Forevara,

Happy New Year Sungit i hope this is your year. The year where the work you've put in starts to pay
off, and the dreams you've been holding onto don't feel so out of reach anymore.
Please, hold onto the hope that this is the year you've been waiting for not perfect,
no, but filled with the kind of moments that make you smile those little things that remind you
why you keep going. There are hands yet to hold, mornings with
warm coffee waiting for you, and songs you'll play on repeat just
because they make you happy/sad obv. This year holds so much
promise conversations so honest they'll make my cheeks ache in
the best way, hugs that linger longer than usual, and the kind of
laughter that makes you forget time altogether. This is a year for
second chances, for trying again even when it's scary, and for those
little wins that remind you how strong you are. It's a year to let
yourself make mistakes, to stumble, and to be kind to yourself when
things don't go as planned. You're going to fall in love again with
new books, new hobbies, maybe even new faces. Or maybe just with
yourself, in the mirror, catching glimpses of who you're becoming.
There will be mornings where the world feels heavy, yes, but there
will also be mornings where the sunlight filters through your window
just right and you'll think, "I'm so glad I stayed to get to know you." This year, I hope you keep showing up for
yourself, for your dreams, for the people who can't imagine a world
without you. There's still so much waiting for you. Birthday candles to
blow out, wishes to whisper into the night sky, road trips that lead to
nowhere but feel like everywhere. And when it feels too much, when
the year asks more than you feel you have, please remember this na
you've made it through every storm before, and you'll make it through
this one, too. The light is still there, shining just for you. The world still
has more love, more wonder, and more magic to offer you. You are
not done yet. So here's to you, to this year, and to all the small,
magical moments waiting for you. You've got this. I believe in you.
Please believe in yourself, too. Take care always Ara and sorry last night abt your name,
I need to do it, i planned all of this. I'm really sorry and Thank you so much . I hope you like it. 
i love you<3`; // CHANGE THIS

document.getElementById("herNameDisplay").innerText = HER_NAME;

/* ---------- COUNTDOWN ---------- */
const TARGET = new Date(2025, 0, 1, 0, 0, 0).getTime(); // January 1, 2026 00:00:00
const countdown = document.getElementById("countdown");
const openBtn = document.getElementById("openBtn");
const content = document.getElementById("content");
const lock = document.getElementById("lockScreen");
const music = document.getElementById("bgMusic");

let unlocked = false;

setInterval(() => {
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
  document.getElementById("spotifyEmbed").src = "https://open.spotify.com/embed/track/34sOdxWu9FljH84UXdRwu1?autoplay=1";
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
        const progresses = entry.target.querySelectorAll('.progress');
        progresses.forEach((progress, index) => {
          setTimeout(() => {
            progress.classList.add('animate');
          }, index * 500);
        });
        // Animate photos
        const splitImage = entry.target.querySelector('.split-image');
        if (splitImage) {
          const img = splitImage.querySelector('img');
          if (img) {
            setTimeout(() => {
              img.style.opacity = '1';
              img.style.transform = 'scale(1)';
            }, 300);
          }
        }
        
        const bentoAlbum = entry.target.querySelector('.bento-album');
        if (bentoAlbum) {
          const bentoItems = bentoAlbum.querySelectorAll('.bento-item img');
          bentoItems.forEach((img, index) => {
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
  }, 5000);
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
  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\n/g, "<br>")
              .replace(/  /g, "&nbsp; ");
  }
  let html = "";
  const interval = setInterval(() => {
    if (LETTER_TEXT[i] === "\n") {
      html += "<br>";
    } else if (LETTER_TEXT[i] === " ") {
      // preserve double spaces
      if (LETTER_TEXT[i-1] === " ") {
        html += "&nbsp;";
      } else {
        html += " ";
      }
    } else {
      html += escapeHTML(LETTER_TEXT[i]);
    }
    el.innerHTML = html;
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