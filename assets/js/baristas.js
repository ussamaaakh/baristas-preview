const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#navigation');
function closeNav() { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); toggle.setAttribute('aria-label', 'Ouvrir le menu'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); nav.classList.toggle('is-open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeNav(); toggle.focus(); } });
document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeNav(); });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  document.querySelectorAll('[data-city]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.city !== button.dataset.filter; if(!card.hidden) count++; });
  document.querySelector('#address-count').textContent = `${count} adresse${count > 1 ? 's' : ''} affichée${count > 1 ? 's' : ''}`;
}));

const slides = [...document.querySelectorAll('.hero-slide')];
if (slides.length > 1) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  function schedule() {
    clearInterval(timer);
    if (reducedMotion.matches || document.hidden) return;
    timer = setInterval(() => {
      slides[index].classList.remove('is-active');
      slides[index].setAttribute('aria-hidden', 'true');
      index = (index + 1) % slides.length;
      slides[index].classList.add('is-active');
      slides[index].removeAttribute('aria-hidden');
    }, 4500);
  }
  reducedMotion.addEventListener('change', schedule);
  document.addEventListener('visibilitychange', schedule);
  schedule();
}
