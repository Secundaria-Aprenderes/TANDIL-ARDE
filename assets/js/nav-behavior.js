// Comportamiento global para ocultar/mostrar el nav según dirección del scroll.
// Se aplica al <nav id="topNav"> si existe o al primer <nav> del documento.
// Opcional: configurar mediante atributos data-threshold y data-hide-offset en el <nav>.
(function () {
  const nav = document.querySelector('nav#topNav') || document.querySelector('nav');
  if (!nav) return;
  if (!nav.id) nav.id = 'topNav';

  let lastScroll = window.scrollY;
  let ticking = false;
  const threshold = Number(nav.dataset.threshold) || 10;   // px mínimos hacia arriba para mostrar
  const hideOffset = Number(nav.dataset.hideOffset) || 80; // px desde el top para empezar a ocultar al bajar

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Si bajamos y pasamos hideOffset -> ocultar
        if (current > lastScroll && current > hideOffset) {
          if (!nav.classList.contains('nav-hidden')) {
            nav.classList.add('nav-hidden');
            nav.setAttribute('aria-hidden', 'true');
          }
        } else if (current < lastScroll - threshold) {
          // Si subimos al menos threshold -> mostrar
          if (nav.classList.contains('nav-hidden')) {
            nav.classList.remove('nav-hidden');
            nav.setAttribute('aria-hidden', 'false');
          }
        }
        // Si estamos muy cerca del top, dejar visible siempre
        if (current <= 10 && nav.classList.contains('nav-hidden')) {
          nav.classList.remove('nav-hidden');
          nav.setAttribute('aria-hidden', 'false');
        }

        lastScroll = current;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
