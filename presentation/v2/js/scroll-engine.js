/**
 * Scroll Engine — IntersectionObserver-based reveal system
 * Handles: element reveals, section tracking, scroll progress, nav dots
 */

export function initScrollEngine() {
  const container = document.querySelector('.scroll-container');
  const sections = document.querySelectorAll('.section');
  const progressBar = document.querySelector('.scroll-progress');
  const dots = document.querySelectorAll('.section-dot');

  if (!container) return;

  // ---- Scroll Progress ----
  container.addEventListener('scroll', () => {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // ---- Section Observer (for dots + in-view class) ----
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        const index = Array.from(sections).indexOf(entry.target);
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      }
    });
  }, {
    root: container,
    threshold: 0.4
  });

  sections.forEach(s => sectionObserver.observe(s));

  // ---- Element Reveal Observer ----
  const revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // only once
      }
    });
  }, {
    root: container,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Dot Navigation ----
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (sections[i]) {
        sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Keyboard Navigation ----
  document.addEventListener('keydown', (e) => {
    // Only if scroll container is the active context
    const currentIndex = getCurrentSectionIndex();

    if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'j') {
      e.preventDefault();
      const next = Math.min(currentIndex + 1, sections.length - 1);
      sections[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault();
      const prev = Math.max(currentIndex - 1, 0);
      sections[prev].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  function getCurrentSectionIndex() {
    let current = 0;
    const scrollTop = container.scrollTop;
    sections.forEach((s, i) => {
      if (s.offsetTop <= scrollTop + container.clientHeight / 2) {
        current = i;
      }
    });
    return current;
  }
}
