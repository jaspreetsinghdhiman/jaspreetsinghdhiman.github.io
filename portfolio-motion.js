/* Shared page motion for the Jaspreet Singh portfolio.
   Progressive enhancement: if GSAP/CDN is unavailable, content stays visible. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Inner-page entrance: keep each page's own layout and visual identity.
  const hero = document.querySelector('.page-hero');
  if (hero) {
    const eyebrow = hero.querySelector('.eyebrow, .lbl');
    const heading = hero.querySelector('h1');
    const copy = hero.querySelector('p:not(.eyebrow), .intro-big');
    const breadcrumb = hero.querySelector('.breadcrumb');
    const intro = [eyebrow, heading, copy, breadcrumb].filter(Boolean);
    gsap.set(intro, { autoAlpha: 0, y: isMobile ? 18 : 30 });
    gsap.to(intro, {
      autoAlpha: 1, y: 0, duration: isMobile ? 0.65 : 0.9,
      stagger: isMobile ? 0.09 : 0.14, ease: 'power3.out',
      delay: 0.08, clearProps: 'transform'
    });
    if (heading) {
      gsap.fromTo(heading, { clipPath: 'inset(0 0 100% 0)' }, {
        clipPath: 'inset(0 0 0% 0)', duration: isMobile ? 0.75 : 1.05,
        ease: 'power3.out', delay: 0.12
      });
    }
  }

  // Reusable scroll reveals. Only elements that exist on the current page are selected.
  const revealGroups = [
    '.section-head', '.intro-grid > *', '.intro-copy > *',
    '.why-card', '.craft-card', '.project-card',
    '.post-list > a', '.story-feature', '.story-aside > a',
    '.region-card', '.gallery-grid > *', '.values-grid > article',
    '.r', '.stack .st', '.tm > div', '.sv > a',
    '.skill-group', '.tool-group', '.contact-card',
    '.fm .fd', '.fm > button', '.fm > .form-note',
    '.contribute-band .container > *', '.quote-section blockquote'
  ];

  revealGroups.forEach((selector) => {
    const elements = gsap.utils.toArray(selector).filter((el) =>
      !el.closest('[hidden], [aria-hidden="true"], .modal, .case-modal')
    );
    if (!elements.length) return;
    gsap.set(elements, { autoAlpha: 0, y: isMobile ? 20 : 34 });
    ScrollTrigger.batch(elements, {
      start: isMobile ? 'top 94%' : 'top 90%',
      once: true,
      onEnter: (batch) => gsap.to(batch, {
        autoAlpha: 1, y: 0, duration: isMobile ? 0.62 : 0.82,
        stagger: isMobile ? 0.035 : 0.075, ease: 'power3.out',
        overwrite: true, clearProps: 'transform'
      })
    });
  });

  // Image reveals add motion without changing image crops or dimensions.
  gsap.utils.toArray('.page-hero img, .ph img, .project-preview img, .post-thumb img, .story-feature img, .gallery-grid img, .editorial-story img').forEach((img) => {
    gsap.fromTo(img, { scale: 1.055, clipPath: 'inset(0 0 14% 0)' }, {
      scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.05,
      ease: 'power3.out', scrollTrigger: { trigger: img, start: 'top 92%', once: true }
    });
  });

  // Timeline and skill progression are animated as separate visual systems.
  const timeline = document.querySelector('.xp, .experience-timeline, .timeline');
  if (timeline) {
    const line = timeline.querySelector('.ln, .timeline-line');
    if (line) gsap.fromTo(line, { scaleY: 0, transformOrigin: 'top' }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: timeline, start: 'top 72%', end: 'bottom 72%', scrub: 0.5 }
    });
  }
  gsap.utils.toArray('.sk span, .skill-chip, .tool-chip').forEach((chip) => {
    gsap.from(chip, {
      y: 16, autoAlpha: 0, duration: 0.55, ease: 'power2.out',
      scrollTrigger: { trigger: chip, start: 'top 94%', once: true }
    });
  });

  // Keep the existing page progress indicator consistent across inner pages.
  const progress = document.querySelector('#bar');
  if (progress) gsap.to(progress, {
    scaleX: 1, ease: 'none',
    scrollTrigger: { scrub: 0.25, start: 0, end: 'max' }
  });

  // Subtle 3D response on desktop only; no hover-dependent motion on touch screens.
  if (canTilt && !isMobile) {
    gsap.utils.toArray('.project-card, .why-card, .craft-card, .story-feature').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 3.2, rotateX: y * -3.2,
          transformPerspective: 1000, duration: 0.35, overwrite: true
        });
      });
      card.addEventListener('pointerleave', () => gsap.to(card, {
        rotateY: 0, rotateX: 0, duration: 0.65, ease: 'power3.out'
      }));
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
