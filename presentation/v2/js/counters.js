/**
 * Counters — Animated number counting on scroll-in
 * Elements with data-count-to="15.8" animate from 0 to target
 */

export function initCounters() {
  const container = document.querySelector('.scroll-container');
  const counters = document.querySelectorAll('[data-count-to]');

  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: container,
    threshold: 0.3
  });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.countTo);
  const suffix = el.dataset.countSuffix || '';
  const prefix = el.dataset.countPrefix || '';
  const decimals = (target.toString().split('.')[1] || '').length;
  const duration = 1200; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = eased * target;

    el.textContent = prefix + current.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
