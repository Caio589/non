const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticles() {
  particles = [];
  for (let i = 0; i < 300; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 100
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    ctx.fillStyle = "rgba(160,100,255,0.8)";
    ctx.fillRect(p.x, p.y, 3, 3);
  });
  particles = particles.filter(p => p.life > 0);
  requestAnimationFrame(animate);
}

function explode() {
  createParticles();
  animate();
}

function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
