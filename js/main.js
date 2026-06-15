/* ============================================
   HERO stagger animation (after load)
   ============================================ */
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('.hero-anim');
  const delays = [0, 100, 200, 320, 460, 620];
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .75s ease, transform .75s ease';
    el.style.transitionDelay = (delays[i] || 0) + 'ms';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }));
  });
});

/* ============================================
   HEADER scroll effect
   ============================================ */
const hdr = document.getElementById('hdr');

window.addEventListener('scroll', () => {
  hdr.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ============================================
   HAMBURGER MENU
   ============================================ */
const burger = document.getElementById('burger');
const hdrNav = document.getElementById('hdrNav');

burger.addEventListener('click', () => {
  const open = hdrNav.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});

hdrNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hdrNav.classList.remove('open');
    burger.classList.remove('open');
  });
});

/* ============================================
   REVEAL on scroll (IntersectionObserver)
   ============================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

revealEls.forEach(el => revealObs.observe(el));

/* ============================================
   SMOOTH SCROLL
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - hdr.offsetHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================
   FAQ ACCORDION
   ============================================ */
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // close all
    document.querySelectorAll('.faq__q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

/* ============================================
   FLOATING CTA
   （Contactセクションが見えている間は非表示＝フォーム入力の邪魔をしない）
   ============================================ */
const floatCta = document.getElementById('floatCta');
const contactSec = document.getElementById('contact');

if (floatCta) {
  window.addEventListener('scroll', () => {
    const scrolledEnough = window.scrollY > window.innerHeight * 0.6;
    const nearContact = contactSec
      ? contactSec.getBoundingClientRect().top < window.innerHeight * 0.9
      : false;
    floatCta.classList.toggle('show', scrolledEnough && !nearContact);
  }, { passive: true });
}

/* ============================================
   ACTIVE NAV on scroll
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.hdr__nav-link');

function syncNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - hdr.offsetHeight - 40) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    const matches = link.getAttribute('href') === '#' + current;
    link.classList.toggle('active', matches);
  });
}

window.addEventListener('scroll', syncNav, { passive: true });

/* ============================================
   CONTACT FORM — Formspree submission
   ============================================ */
const form      = document.getElementById('contactForm');
const thanks    = document.getElementById('contactThanks');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const company = form.querySelector('#company').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !company || !email || !message) {
      alert('お名前・会社名・ブランド名・メールアドレス・ご相談内容の詳細は必須項目です。');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('正しいメールアドレスをご入力ください。');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    formError.style.display = 'none';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        thanks.style.display = 'block';
        thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('server error');
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = '相談内容を送信する';
      formError.style.display = 'block';
      formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}
