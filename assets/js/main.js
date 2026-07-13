/* ═══════════════════════════════════════════
   ARYAN SAINI PORTFOLIO — main.js
   ═══════════════════════════════════════════ */

/* ── Wait for DOM ── */
document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════
     1. TYPED.JS
  ══════════════════════════ */
  new Typed('#typed', {
    strings: [
      'AI/ML Engineer',
      'Python Developer',
      'Frontend Developer',
      'Problem Solver',
      'B.Tech CSE Student'
    ],
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 1800,
    loop: true,
    cursorChar: '|'
  });

  /* ══════════════════════════
     2. EMAILJS INIT
  ══════════════════════════ */
  emailjs.init({
    publicKey: "TlNLkC5OCa01zwSxZ"
  });

  /* ══════════════════════════
     3. CUSTOM CURSOR
  ══════════════════════════ */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.3;
    ringY += (mouseY - ringY) * 0.3;

    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';

    requestAnimationFrame(animateRing);
  })();

  // (function animateRing() {
  //   ringX += (mouseX - ringX) * 0.12;
  //   ringY += (mouseY - ringY) * 0.12;
  //   cursorRing.style.left = ringX + 'px';
  //   cursorRing.style.top  = ringY + 'px';
  //   requestAnimationFrame(animateRing);
  // })();

  const hoverTargets = 'a, button, .skill-pill, .project-card, .exp-card, .stat-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      cursorRing.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      cursorRing.classList.remove('hovered');
    });
  });
 
  /* ══════════════════════════
     4. NAVBAR — scroll shadow
  ══════════════════════════ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ══════════════════════════
     5. SMOOTH NAV SCROLL
         (navbar links + logo)
  ══════════════════════════ */
  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const navH = navbar.offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // All navbar anchor links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      smoothScrollTo(id);
      // Close mobile menu if open
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Logo click → scroll to top / home
  document.querySelector('.nav-logo').addEventListener('click', () => {
    smoothScrollTo('home');
  });

  /* ══════════════════════════
     6. HAMBURGER (mobile)
  ══════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  /* ══════════════════════════
     7. ACTIVE NAV HIGHLIGHT
        (on scroll)
  ══════════════════════════ */
  const sections   = Array.from(document.querySelectorAll('section[id]'));
  const navAnchors = document.querySelectorAll('.nav-link');
  const scrollDots = document.querySelectorAll('.scroll-dot');

  function updateActiveNav() {
    const scrollY = window.scrollY + navbar.offsetHeight + 60;
    let current   = 0;

    sections.forEach((sec, i) => {
      if (sec.offsetTop <= scrollY) current = i;
    });

    const currentId = sections[current]?.id;

    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
    scrollDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav(); // run once on load

  /* ══════════════════════════
     8. SCROLL INDICATOR DOTS
        click → scroll to section
  ══════════════════════════ */
  scrollDots.forEach(dot => {
    dot.addEventListener('click', () => {
      smoothScrollTo(dot.dataset.target);
    });
  });

  /* ══════════════════════════
     9. REVEAL ON SCROLL
  ══════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target); // once is enough
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => revealObs.observe(el));

  /* ══════════════════════════
     10. PROJECT CARD GLOW
  ══════════════════════════ */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });

  /* ══════════════════════════
     11. CONTACT FORM — EmailJS
  ══════════════════════════ */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  // Field refs
  const nameField  = document.getElementById('user_name');
  const emailField = document.getElementById('user_email');
  const msgField   = document.getElementById('user_message');

  // Error spans
  const errName  = document.getElementById('err_name');
  const errEmail = document.getElementById('err_email');
  const errMsg   = document.getElementById('err_msg');

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function clearErrors() {
    errName.textContent  = '';
    errEmail.textContent = '';
    errMsg.textContent   = '';
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }

  function validate() {
    let ok = true;
    if (!nameField.value.trim()) {
      errName.textContent = 'Name is required.'; ok = false;
    }
    if (!emailField.value.trim()) {
      errEmail.textContent = 'Email is required.'; ok = false;
    } else if (!validateEmail(emailField.value.trim())) {
      errEmail.textContent = 'Enter a valid email.'; ok = false;
    }
    if (!msgField.value.trim()) {
      errMsg.textContent = 'Message cannot be empty.'; ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();

    if (!validate()) return;

    // Loading state
    submitBtn.disabled     = true;
    submitBtn.textContent  = 'Sending…';

    const params = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      message: msgField.value.trim(),
      subject: "New Portfolio Message"
    };

    try {
      await emailjs.send('service_9ylx4r6', 'template_woau5lh', params);

      // Success
      formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
      formStatus.className   = 'form-status success';
      submitBtn.textContent  = '✓ Sent!';
      submitBtn.style.background = '#10b981';
      form.reset();

      setTimeout(() => {
        submitBtn.textContent        = 'Send Message →';
        submitBtn.style.background   = '';
        submitBtn.disabled           = false;
        formStatus.textContent       = '';
        formStatus.className         = 'form-status';
      }, 4000);

    } catch (err) {
      console.log("FULL ERROR:", err);
      alert(JSON.stringify(err));
      console.error('EmailJS error:', err);

      // Friendly error message
      const code = err?.status || '';
      let msg = '✗ Failed to send. Please try emailing directly.';
      if (code === 401 || code === 403) msg = '✗ Auth error — check EmailJS keys.';
      if (code === 422)                 msg = '✗ Template variables mismatch.';
      if (code === 429)                 msg = '✗ Too many requests — try later.';

      formStatus.textContent = msg;
      formStatus.className   = 'form-status error';
      submitBtn.textContent  = '✗ Try Again';
      submitBtn.style.background = '#ef4444';

      setTimeout(() => {
        submitBtn.textContent        = 'Send Message →';
        submitBtn.style.background   = '';
        submitBtn.disabled           = false;
      }, 4000);
    }
  });
});