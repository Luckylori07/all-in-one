(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');
  var mq = window.matchMedia('(max-width: 899px)');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    var onMq = function () { if (!mq.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
  }

  /* ---------- Lightbox ---------- */
  var box = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-caption');
  var items = Array.prototype.slice.call(document.querySelectorAll('#gallery .g-item'));
  var current = 0;
  var opener = null;
  var BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

  if (box && img && items.length) {
    var btnClose = box.querySelector('.lb-close');
    var btnPrev = box.querySelector('.lb-prev');
    var btnNext = box.querySelector('.lb-next');

    var show = function (i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      img.src = it.getAttribute('data-full');
      img.width = Number(it.getAttribute('data-w')) || 0;
      img.height = Number(it.getAttribute('data-h')) || 0;
      img.alt = it.querySelector('img').alt;
      cap.textContent = it.getAttribute('data-caption') + ' (' + (current + 1) + ' di ' + items.length + ')';
    };
    var open = function (i, trigger) {
      opener = trigger;
      show(i);
      box.hidden = false;
      document.body.classList.add('lb-open');
      btnClose.focus();
    };
    var close = function () {
      box.hidden = true;
      document.body.classList.remove('lb-open');
      img.src = BLANK;
      if (opener) opener.focus();
    };

    items.forEach(function (it, i) {
      it.addEventListener('click', function () { open(i, it); });
    });
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lb-inner')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft') { show(current - 1); }
      else if (e.key === 'ArrowRight') { show(current + 1); }
      else if (e.key === 'Tab') {
        var f = [btnClose, btnPrev, btnNext];
        var idx = f.indexOf(document.activeElement);
        if (e.shiftKey && idx <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && idx === f.length - 1) { e.preventDefault(); f[0].focus(); }
        else if (idx === -1) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ---------- Comparsa sobria (solo se il movimento è consentito) ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var els = document.querySelectorAll('.card, .steps li, .why-grid li, .gallery li');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
})();
