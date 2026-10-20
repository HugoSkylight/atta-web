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
  const dd = document.querySelector('details.lang-dd');
  if (dd) {
    document.addEventListener('click', e => { if (dd.open && !dd.contains(e.target)) dd.open = false; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') dd.open = false; });
  }
})();
