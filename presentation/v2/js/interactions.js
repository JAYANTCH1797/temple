/**
 * Interactions — Tab switching, mobile card expand, etc.
 */

export function initInteractions() {
  initPmTabs();
  initMobileCards();
}

// ---- PM Work Tabs (Slide 3 Desktop) ----
function initPmTabs() {
  const tabs = document.querySelectorAll('.pm-tab');
  const details = document.querySelectorAll('.pm-detail');
  const metricPanels = document.querySelectorAll('.pm-metrics');

  if (!tabs.length) return;

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      details.forEach(d => d.classList.remove('active'));
      metricPanels.forEach(m => m.classList.remove('active'));

      tab.classList.add('active');
      if (details[i]) details[i].classList.add('active');
      if (metricPanels[i]) metricPanels[i].classList.add('active');
    });
  });
}

// ---- Mobile Expandable Cards ----
function initMobileCards() {
  const cards = document.querySelectorAll('.pm-card');

  cards.forEach(card => {
    const toggle = card.querySelector('.pm-card__toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      card.classList.toggle('open');
    });
  });
}
