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
