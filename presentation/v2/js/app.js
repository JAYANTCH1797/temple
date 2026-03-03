/**
 * App — Main orchestrator
 * Initializes all modules when DOM is ready
 */

import { initScrollEngine } from './scroll-engine.js';
import { initCounters } from './counters.js';
import { initInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollEngine();
  initCounters();
  initInteractions();
});
