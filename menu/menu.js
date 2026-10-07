const cityButtons = [...document.querySelectorAll('[data-city]')];
const gallery = document.getElementById('menu-gallery');
const queryCity = new URLSearchParams(location.search).get('city');
const cityConfig = {
  casablanca: { label: 'CARTE DE CASABLANCA', pages: 21, pdf: 'pdf/baristas-carte-casablanca.pdf' },
  mohammedia: { label: 'CARTE DE MOHAMMEDIA', pages: 22, pdf: 'pdf/baristas-carte-mohammedia.pdf' }
};

function setCity(city) {
  const selected = cityConfig[city] ? city : 'casablanca';
  const config = cityConfig[selected];
  history.replaceState(null, '', `?city=${selected}`);
  cityButtons.forEach(button => {
    const active = button.dataset.city === selected;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  gallery.replaceChildren();
  for (let page = 1; page <= config.pages; page += 1) {
    const number = String(page).padStart(2, '0');
    const link = document.createElement('a');
    link.className = 'menu-page';
    link.href = `images/${selected}/page-${number}.jpg`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', `Ouvrir la page ${page} de la carte ${selected} en grand`);
    const image = document.createElement('img');
    image.src = link.href;
    image.alt = `Carte Baristas ${selected === 'mohammedia' ? 'Mohammedia' : 'Casablanca'} — page ${page}`;
    image.width = 1131;
    image.height = 1600;
    if (page > 2) image.loading = 'lazy';
    image.decoding = 'async';
    link.append(image);
    gallery.append(link);
  }
}

cityButtons.forEach(button => button.addEventListener('click', () => setCity(button.dataset.city)));
setCity(queryCity === 'mohammedia' ? 'mohammedia' : 'casablanca');
