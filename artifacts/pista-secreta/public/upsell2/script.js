/* ==================================================================
   PISTA SECRETA — KIT INVESTIGADOR PREMIUM
   Scripts: sem dependências externas.
   ================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEvidenceThread();
  initScrollReveal();
  initTypewriter();
  initFaqAccordion();
  initSkipLink();
});

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
      statusEl.textContent = `ARQUIVO ${String(currentIndex).padStart(2, '0')} / ${totalSections}`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

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

  const fullText = 'Existe uma parte deste caso que o arquivo digital não consegue entregar.';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    target.textContent = fullText;
    if (cursor) cursor.style.display = 'none';
    return;
  }

  let hasTyped = false;

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
