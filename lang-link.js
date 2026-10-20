(() => {
  const link = document.querySelector('a.lang[data-alt]');
  if (link) {
    const keepValidHash = () => {
      const hash = location.hash;
      let valid = false;
      if (hash.length > 1) { try { valid = !!document.querySelector(hash); } catch {} }
      link.href = link.dataset.alt + (valid ? hash : '');
    };
    addEventListener('hashchange', keepValidHash);
    keepValidHash();
  }
  const dd = document.querySelector('.lang-dd'), btn = document.querySelector('.lang-btn');
  if (dd && btn) {
    const set = open => { dd.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); };
    btn.addEventListener('click', e => { e.stopPropagation(); set(!dd.classList.contains('open')); });
    document.addEventListener('click', e => { if (!dd.contains(e.target)) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  }
})();
