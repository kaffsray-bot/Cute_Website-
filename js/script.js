// ─── STATE MANAGEMENT ───
let selections = { date: '', location: '', activity: '' };

function go(screenNum) {
  const current = document.querySelector('.screen.active');
  if (current) {
    current.classList.add('exit');
    current.classList.remove('active');
  }

  // Convert logic strings if navigating back and forth
  let targetId = 's' + screenNum;
  if(screenNum === '2b') targetId = 's2b';

  setTimeout(() => {
    if (current) current.classList.remove('exit');
    const nextScreen = document.getElementById(targetId);
    if (nextScreen) nextScreen.classList.add('active');
  }, 400);
}

function handleYes() {
  startConfetti();
  go('2b');
}

function selectOption(type, value, element) {
  // Clear previous selection in the same grid container
  const parent = element.parentElement;
  parent.querySelectorAll('.choice-card').forEach(card => card.classList.remove('selected'));

  // Add selected class
  element.classList.add('selected');
  selections[type] = value;
}

function saveDate() {
  const val = document.getElementById('dateInput').value;
  if(!val) {
    alert("Please select a magical date, Swornima! ✨");
    return;
  }
  const dateObj = new Date(val);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  selections.date = dateObj.toLocaleDateString('en-US', options);
  go(4);
}

function validateLocation() {
  if(!selections.location) {
    alert("Pick a sanctuary first, Swornima! 🌆");
    return;
  }
  go(5);
}

function buildSummary() {
  if(!selections.activity) {
    alert("Choose an activity for us! 🎧");
    return;
  }
  document.getElementById('finalDate').innerText = selections.date;
  document.getElementById('finalLocation').innerText = selections.location;
  document.getElementById('finalActivity').innerText = selections.activity;

  startConfetti();
  go(6);
}

// ─── RUNAWAY NO BUTTON LOGIC ───
let runCount = 0;
function moveNoButton() {
  const btn = document.getElementById('noBtn');
  if (runCount < 5) {
    const x = Math.random() * (window.innerWidth - btn.offsetWidth - 40) + 20;
    const y = Math.random() * (window.innerHeight - btn.offsetHeight - 40) + 20;
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    runCount++;
  } else {
    btn.innerText = "Okay, my options are locked, choose YES! 😉";
    btn.style.position = 'static';
    btn.style.marginTop = '15px';
  }
}

function noClickFail() {
  alert("Nice try, Swornima! But 'No' isn't an option in this code universe. Please click YES! 😊💖");
}

// ─── BACKGROUND & PARTICLE ARTWORK ───
const canvas = document.getElementById('sparkleCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.15;
    this.speedY = (Math.random() - 0.5) * 0.15;
    this.alpha = Math.random();
    this.glowSpeed = Math.random() * 0.02 + 0.005;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    this.alpha += this.glowSpeed;
    if(this.alpha > 1 || this.alpha < 0.2) this.glowSpeed *= -1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for(let i=0; i<80; i++) stars.push(new Star());

function animateStars() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// FLOATING AMBIENT HEARTS
setInterval(() => {
  if(document.hidden) return;
  const heart = document.createElement('div');
  heart.className = 'heart-particle';
  heart.innerHTML = ['❤️','💖','✨','🌸'][Math.floor(Math.random()*4)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = Math.random() * 15 + 12 + 'px';
  heart.style.animationDuration = Math.random() * 4 + 4 + 's';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}, 700);

// CURSOR TRAIL INTENSITY
window.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.12) return; // limit frequency
  const el = document.createElement('div');
  el.className = 'cursor-heart';
  el.innerHTML = '❤️';
  el.style.left = e.clientX + 'px';
  el.style.top = e.clientY + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 8000);
});

// CONFETTI GENERATOR
function startConfetti() {
  const colors = ['#ff6ba8', '#ffb3d1', '#c9a7eb', '#ffcba4', '#fff'];
  for(let i=0; i<100; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.width = Math.random() * 8 + 6 + 'px';
      p.style.height = Math.random() * 12 + 6 + 'px';
      p.style.background = colors[Math.floor(Math.random()*colors.length)];
      p.style.animationDuration = Math.random() * 2 + 2 + 's';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }, i * 15);
  }
}
