(() => {
  const link = document.querySelector('a.lang[data-alt]');
  if (link) {
    let lastY = scrollY;
    const keepValidHash = () => {
      const hash = location.hash;
      let valid = false;
      if (hash.length > 1 && hash !== '#enter' && hash !== '#top') { try { valid = !!document.querySelector(hash); } catch {} }
      link.href = link.dataset.alt + (valid ? hash : '');
    };
    addEventListener('hashchange', keepValidHash);
    addEventListener('scroll', () => {
      if (location.hash && scrollY < lastY && scrollY < 160) {
        history.replaceState(null, '', location.pathname + location.search);
        link.href = link.dataset.alt;
      }
      lastY = scrollY;
    }, { passive: true });
    keepValidHash();
  }
  const dd = document.querySelector('details.lang-dd');
  if (dd) {
    dd.addEventListener('toggle', () => {
      if (dd.open && link && (scrollY < 160 || location.hash === '#enter' || location.hash === '#top')) {
        if (location.hash) history.replaceState(null, '', location.pathname + location.search);
        link.href = link.dataset.alt;
      }
    });
    document.addEventListener('click', e => { if (dd.open && !dd.contains(e.target)) dd.open = false; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') dd.open = false; });
  }
})();
