/**
 * CANDOR — DIGITAL GROWTH AGENCY
 * Brand Tagline: "Clear Strategy, Honest Growth."
 * Production-Ready Client Interactions & Form Management
 */

// ==========================================================================
// 1. CONFIGURATION (Customize endpoints for static or backend deployment)
// ==========================================================================
const CANDOR_CONFIG = {
  // If running with the optional Node.js server (connecting to MongoDB Atlas):
  apiEndpoint: '/api/inquiries',

  // If hosting purely statically on GitHub Pages with Formspree (e.g., 'mqazrkwd'):
  // Leave empty if you prefer mailto fallback or local storage capture
  formspreeId: '',

  // Agency contact email for direct communication
  contactEmail: 'hello@candorgrowth.com',

  // Enable transparent local storage logging of inquiries
  enableLocalInquiryLog: true
};

// ==========================================================================
// 2. DOM CONTENT LOADED INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initActiveNavSpy();
  initHeroGrowthSystem();
  initCapabilitiesTabs();
  initEcommerceDashboard();
  initPerformanceWorkflow();
  initFaqAccordion();
  initContactForm();
  initBackToTop();
});

// ==========================================================================
// 3. STICKY HEADER & SCROLL BEHAVIOR
// ==========================================================================
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ==========================================================================
// 4. MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileNavigation() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-footer a');

  if (!toggle || !drawer || !backdrop) return;

  const openDrawer = () => {
    toggle.classList.add('is-active');
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggle.classList.remove('is-active');
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

// ==========================================================================
// 5. ACTIVE NAVIGATION SPY (IntersectionObserver)
// ==========================================================================
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// ==========================================================================
// 6. HERO ABSTRACT "GROWTH SYSTEM" VISUAL CONTROLLER
// ==========================================================================
const HERO_SYSTEM_DATA = {
  strategy: {
    title: 'Strategy Engine — Channel Alignment',
    desc: 'Identifying true market demand, unit economics, and positioning before committing advertising or operational capital.',
    metrics: [
      { label: 'Demand Focus', value: 'High Intent' },
      { label: 'Unit Economics', value: 'Validated' },
      { label: 'Channel Fit', value: 'Synchronized' }
    ],
    status: 'ACTIVE: ARCHITECTURE'
  },
  execution: {
    title: 'Execution Layer — Systematic Implementation',
    desc: 'Disciplined creative testing, catalog taxonomy structuring, and campaign setup with complete measurement integrity.',
    metrics: [
      { label: 'Catalog Health', value: 'Standardized' },
      { label: 'Tracking Purity', value: '100% CAPI/GA4' },
      { label: 'Creative Sprint', value: 'Systematized' }
    ],
    status: 'ACTIVE: DEPLOYMENT'
  },
  optimization: {
    title: 'Optimization Feedback Loop — Friction Reduction',
    desc: 'Continuous analysis of funnel drop-offs, landing page response, and paid audience segmentation.',
    metrics: [
      { label: 'Friction Rate', value: 'Minimized' },
      { label: 'Test Cadence', value: 'Continuous' },
      { label: 'Ad Signal', value: 'Refining' }
    ],
    status: 'ACTIVE: ITERATION'
  },
  growth: {
    title: 'Growth Compounder — Scalable Commercial Momentum',
    desc: 'Doubling down on validated customer acquisition channels and expanding customer lifetime value.',
    metrics: [
      { label: 'Repeat Value', value: 'Compounding' },
      { label: 'Acquisition Pace', value: 'Sustainable' },
      { label: 'Net Efficiency', value: 'Disciplined' }
    ],
    status: 'ACTIVE: COMPOUNDING'
  }
};

function initHeroGrowthSystem() {
  const nodes = document.querySelectorAll('.pipeline-node');
  const titleEl = document.getElementById('systemPanelTitle');
  const descEl = document.getElementById('systemPanelDesc');
  const statusEl = document.getElementById('systemStatusText');
  const metricItems = document.querySelectorAll('.metric-pill-item');

  if (!nodes.length || !titleEl || !descEl) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const stage = node.getAttribute('data-stage');
      const data = HERO_SYSTEM_DATA[stage];
      if (!data) return;

      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      if (statusEl) statusEl.textContent = data.status;

      if (metricItems.length >= 3 && data.metrics.length >= 3) {
        data.metrics.forEach((m, idx) => {
          const item = metricItems[idx];
          const lbl = item.querySelector('.metric-pill-label');
          const val = item.querySelector('.metric-pill-value');
          if (lbl) lbl.textContent = m.label;
          if (val) val.innerHTML = `<span class="metric-indicator"></span>${m.value}`;
        });
      }
    });
  });
}

// ==========================================================================
// 7. DETAILED CAPABILITIES MATRIX TABS
// ==========================================================================
function initCapabilitiesTabs() {
  const tabs = document.querySelectorAll('.deep-dive-tab');
  const panes = document.querySelectorAll('.deep-dive-content-pane');

  if (!tabs.length || !panes.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-capability');

      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const activePane = document.getElementById(`capPane-${target}`);
      if (activePane) activePane.classList.add('active');
    });
  });
}

// ==========================================================================
// 8. E-COMMERCE MOCK DASHBOARD INTERACTIVE TABS
// ==========================================================================
function initEcommerceDashboard() {
  const tabBtns = document.querySelectorAll('.dashboard-tab-btn');
  const panes = document.querySelectorAll('.dashboard-pane');

  if (!tabBtns.length || !panes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPaneId = btn.getAttribute('data-dash-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`dashPane-${targetPaneId}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

// ==========================================================================
// 9. PERFORMANCE MARKETING WORKFLOW INSPECTOR
// ==========================================================================
const WORKFLOW_STEPS = {
  audience: {
    title: '01. Audience Architecture & Intent Mapping',
    desc: 'We construct segmentation models based on clear buying intent rather than generic broad targeting. We isolate high-intent prospects, past store visitors, and repeat purchasers into dedicated testing cohorts.',
    method: 'Methodology: First-party customer segmentation, clean exclude lists, and interest clustering to eliminate ad spend cannibalization.'
  },
  creative: {
    title: '02. Strategic Creative & Message Framing',
    desc: 'Creative is the new targeting. We develop distinct messaging angles that address real customer objections, clearly explain product value, and test hook variations systematically.',
    method: 'Methodology: Multi-angle creative matrices (Pain point → Solution → Social validation → Offer clarity) with disciplined asset variation.'
  },
  campaign: {
    title: '03. Campaign Structure & Budget Control',
    desc: 'We build transparent campaign hierarchies designed for algorithm learning stability. We avoid over-fragmenting budgets so every test ad set has sufficient statistical room to learn.',
    method: 'Methodology: Consolidated account architecture, dedicated testing sandboxes, and strict budget allocation rules based on margin thresholds.'
  },
  landing: {
    title: '04. Landing Page Alignment & Journey Continuity',
    desc: 'An ad cannot succeed if the destination creates confusion. We align product headline, benefits, shipping expectations, and checkout cues directly with the creative message.',
    method: 'Methodology: Friction-free customer journey audits, fast mobile load validation, and transparent pricing presentation.'
  },
  conversion: {
    title: '05. Conversion Measurement & Event Integrity',
    desc: 'Accurate tracking is the backbone of intelligent ad spend. We configure Conversions API (CAPI), Google Analytics 4, and server-side tracking to capture genuine transaction signals.',
    method: 'Methodology: Server-side tracking verification, deduplicated conversion events, and blended attribution cross-checks.'
  },
  optimization: {
    title: '06. Continuous Iteration & Disciplined Scaling',
    desc: 'We do not scale unvalidated ad sets. We examine real contribution margins, kill losing variations early, and scale winning angles systematically without destabilizing performance.',
    method: 'Methodology: Systematic weekly review cycles, creative fatigue refresh protocols, and net commercial efficiency tracking.'
  }
};

function initPerformanceWorkflow() {
  const nodes = document.querySelectorAll('.workflow-node');
  const titleEl = document.getElementById('workflowDetailTitle');
  const descEl = document.getElementById('workflowDetailDesc');
  const methodEl = document.getElementById('workflowMethodologyText');

  if (!nodes.length || !titleEl || !descEl || !methodEl) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const stepKey = node.getAttribute('data-wf-step');
      const stepData = WORKFLOW_STEPS[stepKey];
      if (!stepData) return;

      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      titleEl.textContent = stepData.title;
      descEl.textContent = stepData.desc;
      methodEl.textContent = stepData.method;
    });
  });
}

// ==========================================================================
// 10. ACCESSIBLE FAQ ACCORDION
// ==========================================================================
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close other accordion items for clean reading
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support for space and enter
    trigger.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}

// ==========================================================================
// 11. CONTACT FORM WITH HONEST & CONFIGURABLE SUBMISSION HANDLING
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('candorContactForm');
  const statusAlert = document.getElementById('formStatusAlert');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !statusAlert || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset alert state
    statusAlert.className = 'form-status-alert';
    statusAlert.style.display = 'none';

    // Extract form data
    const formData = {
      fullName: form.fullName.value.trim(),
      businessName: form.businessName.value.trim(),
      email: form.email.value.trim(),
      website: form.website.value.trim() || 'Not specified',
      serviceInterest: form.serviceInterest.value,
      message: form.message.value.trim(),
      timestamp: new Date().toISOString()
    };

    // Basic client-side validation
    if (!formData.fullName || !formData.businessName || !formData.email || !formData.message) {
      showFormAlert('Please complete all required fields (Name, Business Name, Email, and Message).', 'is-error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showFormAlert('Please enter a valid business email address.', 'is-error');
      return;
    }

    // Set UI to loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Sending Inquiry...
    `;

    try {
      // 1. Try custom backend API if available (e.g. Node server with MongoDB)
      if (CANDOR_CONFIG.apiEndpoint) {
        try {
          const res = await fetch(CANDOR_CONFIG.apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });

          if (res.ok) {
            const result = await res.json();
            showFormAlert(
              `Thank you, ${formData.fullName}. Your inquiry has been received directly by our team. We will review your business profile and respond within 24 business hours.`,
              'is-success'
            );
            form.reset();
            return;
          }
        } catch (backendErr) {
          // Backend not running (normal for pure static deployment such as GitHub Pages)
          console.info('Candor backend endpoint is not active; using static/local fallback.');
        }
      }

      // 2. Try Formspree if configured
      if (CANDOR_CONFIG.formspreeId) {
        try {
          const fsRes = await fetch(`https://formspree.io/f/${CANDOR_CONFIG.formspreeId}`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });

          if (fsRes.ok) {
            showFormAlert(
              `Thank you, ${formData.fullName}. Your inquiry has been sent to Candor. We will review your goals and reach out promptly.`,
              'is-success'
            );
            form.reset();
            return;
          }
        } catch (fsErr) {
          console.warn('Formspree dispatch error:', fsErr);
        }
      }

      // 3. Transparent Client-Side Capture & Mailto Fallback (for 100% static GitHub Pages)
      // Save locally so no user input is ever lost
      if (CANDOR_CONFIG.enableLocalInquiryLog) {
        try {
          const savedInquiries = JSON.parse(localStorage.getItem('candor_inquiries') || '[]');
          savedInquiries.push(formData);
          localStorage.setItem('candor_inquiries', JSON.stringify(savedInquiries));
        } catch (e) {
          console.warn('LocalStorage notice:', e);
        }
      }

      // Build pre-filled mailto link for direct transmission
      const emailSubject = encodeURIComponent(`Growth Inquiry: ${formData.businessName} (${formData.serviceInterest})`);
      const emailBody = encodeURIComponent(
        `Hello Candor Team,\n\n` +
        `Name: ${formData.fullName}\n` +
        `Business: ${formData.businessName}\n` +
        `Website: ${formData.website}\n` +
        `Service Focus: ${formData.serviceInterest}\n\n` +
        `Message:\n${formData.message}\n`
      );
      const mailtoUrl = `mailto:${CANDOR_CONFIG.contactEmail}?subject=${emailSubject}&body=${emailBody}`;

      // Show transparent status: explain honestly that the static site has saved the inquiry
      // and provide one-click button to dispatch via their email client
      showFormAlert(
        `<strong>Inquiry Prepared & Saved Locally.</strong><br>` +
        `Because this site is running as a static deployment, click below to send your details directly via email to <strong>${CANDOR_CONFIG.contactEmail}</strong>:<br><br>` +
        `<a href="${mailtoUrl}" class="btn btn-primary btn-sm" style="margin-top:6px; display:inline-flex;">Open in Email Client &rarr;</a>`,
        'is-success'
      );

    } catch (err) {
      console.error('Submission error:', err);
      showFormAlert(
        `We could not dispatch your inquiry automatically. Please email us directly at <strong>${CANDOR_CONFIG.contactEmail}</strong>.`,
        'is-error'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showFormAlert(messageHtml, alertClass) {
    statusAlert.innerHTML = messageHtml;
    statusAlert.className = `form-status-alert ${alertClass}`;
    statusAlert.style.display = 'block';
    statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ==========================================================================
// 12. BACK TO TOP BUTTON
// ==========================================================================
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
