import Lenis from "./lenis.js";

const root = document.documentElement;
const media = matchMedia("(prefers-reduced-motion: reduce)");
const hero = document.querySelector(".hero");
const scene = document.querySelector(".portrait-scene");
const canvas = document.querySelector(".hero-mesh");
const context = canvas.getContext("2d");
const control = document.querySelector(".motion-control");
const progress = document.querySelector(".scroll-progress");
const header = document.querySelector(".site-header");
const previews = [...document.querySelectorAll(".project-preview")];
let lenis, revealObserver, heroObserver, sectionObserver;
let animationFrame = 0,
  scrollFrame = 0,
  heroVisible = true;
let width = 0,
  height = 0,
  clock = 0,
  lastTime = 0;
let pointer = { x: 0, y: 0 },
  smoothPointer = { x: 0, y: 0 };
let override = null;
try {
  override = localStorage.getItem("portfolio-motion");
} catch {}
const animations = new Set();
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const isFull = () => root.dataset.motion === "full";

function animate(element, keyframes, options = {}) {
  if (!element?.animate) return;
  const animation = element.animate(keyframes, {
    duration: 1000,
    easing: "cubic-bezier(.16,1,.3,1)",
    ...options,
  });
  animations.add(animation);
  animation.finished.then(() => animations.delete(animation)).catch(() => {});
}

function entrance() {
  document.querySelectorAll(".headline-line > span").forEach((line, index) => {
    animate(
      line,
      [
        { transform: "translateY(115%) rotate(3deg)", opacity: 0 },
        { transform: "translateY(0) rotate(0)", opacity: 1 },
      ],
      { duration: 1350, delay: 110 + index * 150, fill: "backwards" },
    );
  });
  [".hero-name", ".hero-copy > p", ".hero-actions", ".hero-bottom"].forEach(
    (selector, index) => {
      animate(
        document.querySelector(selector),
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { delay: 220 + index * 130, fill: "backwards" },
      );
    },
  );
  animate(
    scene,
    [
      { opacity: 0, transform: "translateY(45px) scale(.94) rotate(4deg)" },
      { opacity: 1, transform: "translateY(0) scale(1) rotate(0)" },
    ],
    { duration: 1600, delay: 150, fill: "backwards" },
  );
}

function setupReveals() {
  revealObserver?.disconnect();
  if (!isFull() || !("IntersectionObserver" in window)) return;
  const targets = new Set();
  document.querySelectorAll(".reveal").forEach((element) => {
    if (element.matches(".project")) {
      element
        .querySelectorAll(
          ".project-heading, .project-preview, .project-copy > div",
        )
        .forEach((child) => targets.add(child));
    } else targets.add(element);
  });
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        animate(
          element,
          [
            { opacity: 0.2, transform: "translateY(55px) scale(.98)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          { duration: 1150 },
        );
        if (element.matches(".section-heading")) {
          animate(
            element.querySelector("h2"),
            [
              { clipPath: "inset(0 0 100% 0)" },
              { clipPath: "inset(0 0 0% 0)" },
            ],
            { duration: 1300 },
          );
        }
        revealObserver.unobserve(element);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
  );
  targets.forEach((element) => {
    if (element.getBoundingClientRect().top > innerHeight * 0.8)
      revealObserver.observe(element);
  });
}

function updateScroll() {
  scrollFrame = 0;
  const max = root.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  header.classList.toggle("is-scrolled", scrollY > 35);
  if (isFull()) {
    scene.style.setProperty("--shift", `${clamp(scrollY * 0.12, 0, 70)}px`);
    hero.style.setProperty(
      "--hero-drift",
      `${clamp(scrollY * -0.08, -70, 0)}px`,
    );
    previews.forEach((preview) => {
      const rect = preview.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const amount = clamp(
        (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight,
        -0.7,
        0.7,
      );
      preview.style.setProperty("--preview-y", `${amount * 24}px`);
    });
    const process = document.querySelector(".process");
    const rect = process.getBoundingClientRect();
    process.style.setProperty(
      "--process-progress",
      clamp((innerHeight * 0.85 - rect.top) / (innerHeight * 0.6), 0, 1),
    );
  }
}

function resizeCanvas() {
  const rect = hero.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  const ratio = Math.min(devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context?.setTransform(ratio, 0, 0, ratio, 0, 0);
  if (!isFull()) drawMesh(0);
}

function drawMesh(time) {
  if (!context || !width || !height) return;
  context.clearRect(0, 0, width, height);
  const small = width < 700;
  const cols = small ? 13 : 23,
    rows = small ? 9 : 14;
  const points = [];
  for (let row = 0; row < rows; row++) {
    points[row] = [];
    for (let col = 0; col < cols; col++) {
      const x = (col / (cols - 1)) * width;
      const y = (row / (rows - 1)) * height;
      const wave =
        Math.sin(col * 0.46 + row * 0.36 + time * 0.5) * 22 +
        Math.cos(row * 0.7 - time * 0.38) * 12;
      points[row][col] = {
        x: x + Math.sin(row * 0.4 + time * 0.3) * 20 + smoothPointer.x * 13,
        y: y + wave + smoothPointer.y * 10,
      };
    }
  }
  const fade = context.createLinearGradient(0, 0, width, height);
  fade.addColorStop(0, "rgba(188,246,145,0)");
  fade.addColorStop(0.55, "rgba(188,246,145,.13)");
  fade.addColorStop(1, "rgba(119,185,172,.04)");
  context.strokeStyle = fade;
  context.lineWidth = 0.65;
  for (let row = 0; row < rows; row++) {
    context.beginPath();
    points[row].forEach((point, i) =>
      i ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y),
    );
    context.stroke();
  }
  for (let col = 0; col < cols; col++) {
    context.beginPath();
    points.forEach((row, i) =>
      i
        ? context.lineTo(row[col].x, row[col].y)
        : context.moveTo(row[col].x, row[col].y),
    );
    context.stroke();
  }
  for (let i = 0; i < 7; i++) {
    const path = points[(i * 2 + 3) % rows];
    const position = (time * 0.42 + i * 3.2) % (cols - 1);
    const a = path[Math.floor(position)],
      b = path[Math.ceil(position)];
    const fraction = position % 1;
    const x = a.x + (b.x - a.x) * fraction,
      y = a.y + (b.y - a.y) * fraction;
    context.shadowColor = "#d4fa75";
    context.shadowBlur = 12;
    context.fillStyle = "rgba(212,250,117,.7)";
    context.beginPath();
    context.arc(x, y, 1.7, 0, Math.PI * 2);
    context.fill();
    context.shadowBlur = 0;
  }
}

function render(time) {
  animationFrame = 0;
  if (!isFull() || !heroVisible || document.hidden) {
    lastTime = 0;
    return;
  }
  const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
  lastTime = time;
  clock += delta;
  smoothPointer.x += (pointer.x - smoothPointer.x) * 0.055;
  smoothPointer.y += (pointer.y - smoothPointer.y) * 0.055;
  scene.style.setProperty("--rx", `${-smoothPointer.y * 4}deg`);
  scene.style.setProperty("--ry", `${smoothPointer.x * 6}deg`);
  drawMesh(clock);
  animationFrame = requestAnimationFrame(render);
}
function startRender() {
  if (!animationFrame && isFull() && heroVisible && !document.hidden)
    animationFrame = requestAnimationFrame(render);
}

function applyMotion(playEntrance = false) {
  const full =
    override === "full" || (override !== "reduced" && !media.matches);
  root.dataset.motion = full ? "full" : "reduced";
  control.hidden = false;
  control.setAttribute("aria-pressed", String(full));
  control.setAttribute(
    "aria-label",
    full
      ? "Pause animations and use native scrolling"
      : "Enable full animations and smooth scrolling",
  );
  control.querySelector(".motion-label").textContent = full
    ? "Motion on"
    : "Motion off";
  animations.forEach((animation) => animation.cancel());
  animations.clear();
  lenis?.destroy();
  lenis = null;
  cancelAnimationFrame(animationFrame);
  animationFrame = 0;
  lastTime = 0;
  if (full) {
    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -header.offsetHeight - 18, duration: 1.15 },
    });
    if (playEntrance && scrollY < 100) entrance();
    startRender();
  } else {
    scene.style.setProperty("--rx", "0deg");
    scene.style.setProperty("--ry", "0deg");
    scene.style.setProperty("--shift", "0px");
    hero.style.setProperty("--hero-drift", "0px");
    previews.forEach((preview) =>
      preview.style.setProperty("--preview-y", "0px"),
    );
    drawMesh(0);
  }
  setupReveals();
  updateScroll();
}

control.addEventListener("click", () => {
  override = isFull() ? "reduced" : "full";
  try {
    localStorage.setItem("portfolio-motion", override);
  } catch {}
  applyMotion(true);
});
media.addEventListener("change", () => {
  override = null;
  try {
    localStorage.removeItem("portfolio-motion");
  } catch {}
  applyMotion();
});
hero.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "mouse") return;
  const rect = hero.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
});
hero.addEventListener("pointerleave", () => {
  pointer = { x: 0, y: 0 };
});
addEventListener(
  "scroll",
  () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  },
  { passive: true },
);
addEventListener("resize", () => {
  resizeCanvas();
  updateScroll();
});
document.addEventListener("visibilitychange", startRender);
if ("IntersectionObserver" in window) {
  heroObserver = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    startRender();
  });
  heroObserver.observe(hero);
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        header.querySelectorAll("nav a").forEach((link) => {
          const active = link.hash === `#${entry.target.id}`;
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-20% 0px -55% 0px" },
  );
  document
    .querySelectorAll("main > section[id]")
    .forEach((section) => sectionObserver.observe(section));
}
const track = document.querySelector(".capability-track");
const duplicate = document.createElement("div");
duplicate.className = "capability-copy";
duplicate.setAttribute("aria-hidden", "true");
duplicate.innerHTML = track.innerHTML;
const original = document.createElement("div");
original.className = "capability-copy";
while (track.firstChild) original.append(track.firstChild);
track.append(original, duplicate);
document.querySelector("#year").textContent = new Date().getFullYear();
resizeCanvas();
applyMotion(true);
