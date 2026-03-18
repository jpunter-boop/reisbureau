// =============================================
// BELLAVIAGGI — Luxury redesign JS
// =============================================

// ── Theme switcher ─────────────────────────────────────────────
(function () {
  const themeBtns = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('bellaviaggi-theme') || 'dark';
  document.documentElement.dataset.theme = savedTheme;
  themeBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === savedTheme);
    btn.addEventListener('click', () => {
      const t = btn.dataset.theme;
      document.documentElement.dataset.theme = t;
      localStorage.setItem('bellaviaggi-theme', t);
      themeBtns.forEach(b => b.classList.toggle('active', b === btn));
    });
  });
})();

// ── Neo Milano: strip marquee duplicator ───────────────────────
(function () {
  const strip = document.querySelector('.strip');
  if (!strip) return;
  const track = document.createElement('div');
  track.className = 'neo-strip-track';
  // Verplaats alle strip-items naar track
  Array.from(strip.children).forEach(child => track.appendChild(child));
  strip.appendChild(track);
  // Dupliceer inhoud voor naadloze loop
  strip.appendChild(track.cloneNode(true));
})();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =============================================
// HERO PARALLAX
// =============================================
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.3}px)`;
    }
  }, { passive: true });
}

// =============================================
// SCROLL REVEAL — data-reveal elements
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

// =============================================
// RATING BAR ANIMATION
// =============================================
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.rating-bar div[data-width]').forEach(bar => {
        const w = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.rating-block').forEach(el => barObserver.observe(el));

// =============================================
// NUMBER COUNTER ANIMATION
// =============================================
function animateCounter(el, target, duration) {
  const start = performance.now();
  const isFloat = String(target).includes('.');
  const decimals = isFloat ? 1 : 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = value.toFixed(decimals);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toFixed(decimals);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseFloat(entry.target.getAttribute('data-count'));
      animateCounter(entry.target, target, 1400);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// =============================================
// FORM SUBMISSION
// ── Twinkle particles — booking knop ──────────
const submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
  let particleInterval = null;
  function spawnParticle() {
    const p = document.createElement('span');
    p.className = 'particle';
    const rect = submitBtn.getBoundingClientRect();
    const x = rect.left + Math.random() * (rect.width  + 20) - 10;
    const y = rect.top  + Math.random() * (rect.height + 20) - 10;
    p.style.cssText = `left:${x}px;top:${y}px;position:fixed;` +
      `--twinkle-amount:${(0.3 + Math.random() * 0.5).toFixed(2)};` +
      `--twinkle-duration:${(0.25 + Math.random() * 0.45).toFixed(2)}s;` +
      `--fade-duration:${680 + Math.floor(Math.random() * 420)}ms`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1100);
  }
  submitBtn.addEventListener('mouseenter', () => {
    spawnParticle();
    particleInterval = setInterval(() => { spawnParticle(); spawnParticle(); }, 160);
  });
  submitBtn.addEventListener('mouseleave', () => clearInterval(particleInterval));
}

// =============================================
const form = document.getElementById('booking-form-el');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn     = document.getElementById('submit-btn');
    const success = document.getElementById('form-success');
    btn.textContent = 'Bezig met versturen…';
    btn.disabled = true;
    setTimeout(() => {
      btn.style.display = 'none';
      success.style.display = 'block';
      form.reset();
      setTimeout(() => {
        btn.style.display = '';
        btn.textContent = 'Verstuur aanvraag';
        btn.disabled = false;
        success.style.display = 'none';
      }, 5000);
    }, 800);
  });
}
