const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scene = document.querySelector('.portrait-scene');
const progress = document.querySelector('.scroll-progress');
let frame = 0;
let observer;
function updateScroll() {
  frame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  if (!reducedMotion.matches && scene) scene.style.setProperty('--shift', `${Math.min(window.scrollY * .035, 18)}px`);
}
window.addEventListener('scroll', () => {if (!frame) frame=requestAnimationFrame(updateScroll);}, {passive:true});
window.addEventListener('resize', updateScroll);
function setupMotion() {
  observer?.disconnect();
  document.querySelectorAll('.reveal').forEach(el=>el.classList.remove('pending'));
  scene?.style.setProperty('--rx','0deg'); scene?.style.setProperty('--ry','0deg'); scene?.style.setProperty('--shift','0px');
  if(reducedMotion.matches || !('IntersectionObserver' in window)) {document.body.classList.remove('motion-ready');return;}
  document.body.classList.add('motion-ready');
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}}),{threshold:.06});
  document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('pending');observer.observe(el);}});
}
scene?.addEventListener('pointermove', e=>{
  if(reducedMotion.matches || e.pointerType!=='mouse')return;
  const r=scene.getBoundingClientRect();
  scene.style.setProperty('--rx', `${-(e.clientY-r.top-r.height/2)/r.height*5}deg`);
  scene.style.setProperty('--ry', `${(e.clientX-r.left-r.width/2)/r.width*6}deg`);
});
scene?.addEventListener('pointerleave',()=>{scene.style.setProperty('--rx','0deg');scene.style.setProperty('--ry','0deg');});
reducedMotion.addEventListener('change',setupMotion);
document.querySelector('#year').textContent=new Date().getFullYear();
setupMotion();updateScroll();
