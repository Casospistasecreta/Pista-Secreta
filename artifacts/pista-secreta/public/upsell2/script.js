/* ==================================================================
   PISTA SECRETA — KIT INVESTIGADOR PREMIUM
   Scripts: sem dependências externas.
   ================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initUpsellAnalytics();
  initEvidenceThread();
  initScrollReveal();
  initTypewriter();
  initFaqAccordion();
  initSkipLink();
});

/* ------------------------------------------------------------------
   Analytics: CTA clicks and provider-confirmed upsell purchases.
   Only route/variant/action/status are sent; no customer or order data.
   ------------------------------------------------------------------ */
function initUpsellAnalytics() {
  const route = window.location.pathname.replace(/\/$/, '') || '/';
  const variant = route.endsWith('/upsell2') ? 'upsell2' : 'upsell';
  let conversionTracked = false;

  function track(name, data) {
    try {
      window.umami?.track(name, data);
    } catch {
      // Analytics failures must never interrupt the offer or checkout.
    }
  }

  function trackConfirmedStatus(status) {
    if (conversionTracked || (status !== 'paid' && status !== 'authorized')) return;
    conversionTracked = true;
    track('upsell_conversion', {
      route,
      variant,
      payment_status: status,
    });
  }

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element
      ? event.target
      : event.target?.parentElement;
    if (!target) return;

    let action;
    if (target.closest('[id^="kiwify-upsell-trigger-"]')) action = 'accept';
    else if (target.closest('[id^="kiwify-upsell-cancel-trigger-"]')) action = 'decline';
    else if (target.closest('#skipOffer')) action = 'continue_digital';

    if (action) track('upsell_cta_click', { route, variant, action });
  });

  const originalFetch = window.fetch;
  if (typeof originalFetch !== 'function') return;

  window.fetch = function (...args) {
    const requestUrl = typeof args[0] === 'string'
      ? args[0]
      : args[0]?.url ?? args[0]?.href ?? '';
    const isUpsellConfirmation = /\/(?:v2\/charge\/upsell|generate-pix\/upsell|v2\/orders\/[^/]+\/status)(?:[/?#]|$)/.test(requestUrl);
    const responsePromise = originalFetch.apply(this, args);

    if (!isUpsellConfirmation) return responsePromise;

    return responsePromise.then((response) => {
      if (response.ok) {
        response.clone().json().then((payload) => {
          if (payload && typeof payload.status === 'string') {
            trackConfirmedStatus(payload.status);
          }
        }).catch(() => {
          // Ignore non-JSON responses from the payment provider.
        });
      }
      return response;
    });
  };
}

/* ------------------------------------------------------------------
   1) FIO DE EVIDÊNCIAS
   Desenha a linha vertical proporcionalmente ao progresso de leitura
   da página, e atualiza o contador "ARQUIVO X / 12" no topo.
   ------------------------------------------------------------------ */
function initEvidenceThread() {
  const line = document.getElementById('threadLine');
  const statusEl = document.getElementById('progressStatus');
  const sections = Array.from(document.querySelectorAll('.section'));
  const totalSections = sections.length;

  if (!line) return;

  let ticking = false;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    // stroke-dashoffset vai de 100 (nada desenhado) a 0 (linha completa)
    line.style.strokeDashoffset = String(100 - progress * 100);

    if (statusEl) {
      const currentIndex = Math.max(1, Math.ceil(progress * totalSections));
      statusEl.textContent = window.upsellI18n
        ? window.upsellI18n.formatProgress(currentIndex, totalSections)
        : `ARQUIVO ${String(currentIndex).padStart(2, '0')} / ${totalSections}`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('upsell-language-change', update);

  update();
}

/* ------------------------------------------------------------------
   2) REVELAÇÃO SUAVE DAS SEÇÕES AO ENTRAR NA TELA
   ------------------------------------------------------------------ */
function initScrollReveal() {
  const sections = document.querySelectorAll('.section');

  if (!('IntersectionObserver' in window)) {
    sections.forEach((s) => s.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ------------------------------------------------------------------
   3) EFEITO DE DATILOGRAFIA NA SEÇÃO DE INTERRUPÇÃO
   Dispara apenas quando a seção entra em tela, uma única vez.
   ------------------------------------------------------------------ */
function initTypewriter() {
  const target = document.getElementById('typewriterText');
  const cursor = document.getElementById('typewriterCursor');
  const section = document.getElementById('s2');
  if (!target || !section) return;

  let fullText = window.upsellI18n
    ? window.upsellI18n.text("interruptText")
    : 'Existe uma parte deste caso que o arquivo digital não consegue entregar.';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let hasTyped = false;

  window.addEventListener('upsell-language-change', () => {
    fullText = window.upsellI18n ? window.upsellI18n.text("interruptText") : fullText;
    if (hasTyped || prefersReducedMotion) target.textContent = fullText;
  });

  if (prefersReducedMotion) {
    target.textContent = fullText;
    if (cursor) cursor.style.display = 'none';
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTyped) {
          hasTyped = true;
          typeText(target, fullText, 32, cursor);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(section);
}

function typeText(el, text, speedMs, cursor) {
  let i = 0;
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i += 1;
    if (i >= text.length) {
      clearInterval(interval);
      if (cursor) cursor.style.marginLeft = '0.2rem';
    }
  }, speedMs);
}

/* ------------------------------------------------------------------
   4) ACORDEÃO DE PERGUNTAS FREQUENTES
   ------------------------------------------------------------------ */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // fecha os demais itens para manter a leitura limpa
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.faq-item__question')?.setAttribute('aria-expanded', 'false');
          const otherAnswer = other.querySelector('.faq-item__answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0px';
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0px';
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

/* ------------------------------------------------------------------
   5) LINK DISCRETO PARA CONTINUAR SEM O KIT
   Ajuste a URL de destino para a área de membros / conteúdo digital.
   ------------------------------------------------------------------ */
function initSkipLink() {
  const skip = document.getElementById('skipOffer');
  if (!skip) return;

  skip.addEventListener('click', () => {
    // TODO: substituir pela URL real da área de investigação digital do cliente
    window.location.href = 'https://pista-secreta.replit.app/';
  });
}
