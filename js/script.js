// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

// Reveal sections as they enter the screen
const revealTargets = document.querySelectorAll(".section-label, .about-grid, .skill-card, .project-card, .timeline-item, .contact-panel");
revealTargets.forEach(el => el.classList.add("reveal"));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));

// Back-to-top button
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => backTop.classList.toggle("show", window.scrollY > 500));
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Subtle Matrix-style background animation
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
let columns = [];
const fontSize = 14;
function resizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Array(Math.ceil(canvas.width / fontSize)).fill(1);
}
function drawMatrix() {
  ctx.fillStyle = "rgba(7, 11, 16, 0.09)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00f5a0";
  ctx.font = `${fontSize}px monospace`;
  columns.forEach((y, index) => {
    const character = String.fromCharCode(0x30A0 + Math.random() * 96);
    ctx.fillText(character, index * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) columns[index] = 0;
    columns[index]++;
  });
  requestAnimationFrame(drawMatrix);
}
resizeMatrix();
window.addEventListener("resize", resizeMatrix);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) drawMatrix();
