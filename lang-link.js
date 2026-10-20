(() => {
  const link = document.querySelector('a.lang[data-alt]');
  if (!link) return;
  const keepValidHash = () => {
    const hash = location.hash;
    let valid = false;
    if (hash.length > 1) { try { valid = !!document.querySelector(hash); } catch {} }
    link.href = link.dataset.alt + (valid ? hash : '');
  };
  addEventListener('hashchange', keepValidHash);
  keepValidHash();
})();
