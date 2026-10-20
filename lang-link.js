(() => {
  const link = document.querySelector('a.lang[data-alt]');
  if (link) {
    const keepValidHash = () => {
      const hash = location.hash;
      let valid = false;
      if (hash.length > 1 && scrollY > innerHeight * 0.5) {
        try { valid = !!document.querySelector(hash); } catch {}
      }
      link.href = link.dataset.alt + (valid ? hash : '');
    };
    addEventListener('hashchange', keepValidHash);
    addEventListener('scroll', () => {
      if (location.hash && scrollY < innerHeight * 0.35) {
        history.replaceState(null, '', location.pathname + location.search);
        link.href = link.dataset.alt;
      }
    }, { passive: true });
    keepValidHash();
  }
  const dd = document.querySelector('details.lang-dd');
  if (dd) {
    dd.addEventListener('toggle', () => {
      if (dd.open && link && scrollY < innerHeight * 0.5) link.href = link.dataset.alt;
    });
    document.addEventListener('click', e => { if (dd.open && !dd.contains(e.target)) dd.open = false; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') dd.open = false; });
  }
})();
