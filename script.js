/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── MOBILE NAV ─── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

const revealTargets = [
  '.benefit-card', '.team-card', '.area-tag', '.partner-logo',
  '.section-header', '.program-intro', '.focus-cta',
  '.mentor-cta-text', '.faq-item', '.contact-split'
];
document.querySelectorAll(revealTargets.join(',')).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = i % 5;
  revealObserver.observe(el);
});

/* ─── MENTOR CTA LINES ─── */
const mentorSection = document.querySelector('.mentor-cta');
if (mentorSection) {
  const mo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); mo.unobserve(entry.target); }
    });
  }, { threshold: 0.3 });
  mo.observe(mentorSection);
}

/* ─── FAQ ACCORDION ─── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ─── CONTACT FORM ─── */
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type=submit]');
  const orig = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    contactForm.reset();
    btn.textContent = orig;
    btn.disabled = false;
    let msg = contactForm.querySelector('.form-success');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'form-success';
      msg.textContent = "Message received. We'll be in touch soon.";
      contactForm.appendChild(msg);
    }
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 5000);
  }, 1200);
});

/* ─── STAT NUMBER TICKER ─── */
function tickNumber(el) {
  const raw = el.textContent.trim();
  const num = parseFloat(raw.replace(/[^\d.]/g, ''));
  if (isNaN(num) || num === 0) return;
  const suffix = raw.replace(/[\d.]/g, '');
  const dur = 1400;
  const start = performance.now();
  (function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(ease * num) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  })(start);
}
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const so = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-val').forEach(tickNumber);
        so.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  so.observe(heroStats);
}

/* ─── ACTIVE NAV ─── */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => a.style.color = '');
      const a = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (a) a.style.color = 'var(--amber)';
    }
  });
}, { threshold: 0.4 }).forEach ? (() => {})() : null;
// Simple scroll-based active
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  navAs.forEach(a => {
    const match = a.getAttribute('href') === `#${current}`;
    a.style.color = match ? 'var(--amber)' : '';
  });
}, { passive: true });
