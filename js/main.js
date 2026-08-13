/* ============================================
   HERO stagger animation
   （スクリプトは body 末尾で実行されるため初回ペイント前に開始できる。
   旧実装の window.load 待ちは、描画済みのヒーローを一度隠してから
   再表示するため、LCP が load イベントまで遅延していた）
   ============================================ */
/* 動きを減らす設定（prefers-reduced-motion）では、
   HERO も各セクションも最初から表示する */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(() => {
  if (reduceMotion) return;
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
})();

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

function setNav(open) {
  hdrNav.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  // メニュー表示中は背景をスクロールさせない
  document.body.classList.toggle('nav-open', open);
}

burger.addEventListener('click', () => {
  setNav(!hdrNav.classList.contains('open'));
});

hdrNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => setNav(false));
});

// Esc でメニューを閉じる
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && hdrNav.classList.contains('open')) {
    setNav(false);
    burger.focus();
  }
});

/* ============================================
   REVEAL on scroll (IntersectionObserver)
   ============================================ */
const revealEls = document.querySelectorAll('.reveal');

if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('in'));
}

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
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
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
   ACCORDION（Service / Flow）
   各項目は独立して開閉（複数同時に開いてOK）
   ============================================ */
document.querySelectorAll('.acc__head').forEach(head => {
  head.addEventListener('click', () => {
    const expanded = head.getAttribute('aria-expanded') === 'true';
    const item = head.closest('.acc__item');
    const body = head.nextElementSibling;
    head.setAttribute('aria-expanded', String(!expanded));
    item.classList.toggle('open', !expanded);
    if (body) body.classList.toggle('open', !expanded);
  });
});

/* ============================================
   相談フェーズ別タブ
   ============================================ */
document.querySelectorAll('.tabs').forEach(tabs => {
  const btns   = tabs.querySelectorAll('.tabs__btn');
  const panels = tabs.querySelectorAll('.tabs__panel');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tab;
      btns.forEach(b => b.classList.toggle('is-active', b === btn));
      panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === id));
    });
  });
});

/* ============================================
   FLOATING CTA
   （Contactセクションが見えている間だけ非表示＝フォーム入力の邪魔をしない。
   Contactの後ろにコラムが続く構成のため、通り過ぎたら再表示する）
   ============================================ */
const floatCta = document.getElementById('floatCta');
const contactSec = document.getElementById('contact');

if (floatCta) {
  window.addEventListener('scroll', () => {
    const scrolledEnough = window.scrollY > window.innerHeight * 0.6;
    let contactVisible = false;
    if (contactSec) {
      const r = contactSec.getBoundingClientRect();
      contactVisible = r.top < window.innerHeight * 0.9 && r.bottom > 0;
    }
    floatCta.classList.toggle('show', scrolledEnough && !contactVisible);
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
    const agree   = form.querySelector('#privacyAgree');

    if (!name || !company || !email || !message) {
      alert('お名前・会社名・メールアドレス・いま困っていることは必須項目です。');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('正しいメールアドレスをご入力ください。');
      return;
    }
    if (agree && !agree.checked) {
      alert('プライバシーポリシーへの同意が必要です。');
      agree.focus();
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

/* ============================================
   サービス別CTA → 「相談したい支援」をプリセット
   （data-preset の値と一致するチェックボックスをONにする）
   ============================================ */
document.querySelectorAll('.plan__cta-btn[data-preset]').forEach(btn => {
  btn.addEventListener('click', () => {
    const want = btn.dataset.preset;
    document.querySelectorAll('input[name="support_type"]').forEach(cb => {
      if (cb.value === want) cb.checked = true;
    });
  });
});
