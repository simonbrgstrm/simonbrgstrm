const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
const toggle = document.querySelector<HTMLButtonElement>(
  '.navigation .menu-toggle',
);
const closeButton = menu?.querySelector<HTMLButtonElement>('.dialog-close');

if (menu && toggle && closeButton) {
  const closeMenu = () => {
    menu.close();
  };

  toggle.hidden = false;
  document.documentElement.dataset.menuReady = '';

  toggle.addEventListener('click', () => {
    menu.showModal();
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    document.body.classList.add('menu-open');
    requestAnimationFrame(() => {
      if (menu.open) menu.dataset.entered = '';
    });
  });

  closeButton.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
  menu.addEventListener('close', () => {
    delete menu.dataset.entered;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
  });
  window
    .matchMedia('(max-width: 440px)')
    .addEventListener('change', (event) => {
      if (!event.matches && menu.open) closeMenu();
    });
}

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]');
const words = [...document.querySelectorAll<HTMLElement>('.tagline-word')];
const tagline = document.querySelector<HTMLElement>('.tagline');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = '';
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );
  revealElements.forEach((element) => revealObserver.observe(element));

  let framePending = false;
  let wordsFinished = false;
  const updateWords = () => {
    framePending = false;
    if (!tagline || wordsFinished || motionPreference.matches) return;
    const top = tagline.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.75;
    words.forEach((word, index) => {
      if (top + index * 24 <= trigger) word.dataset.active = '';
    });
    wordsFinished = words.every((word) => word.hasAttribute('data-active'));
    if (wordsFinished) window.removeEventListener('scroll', scheduleWords);
  };
  const scheduleWords = () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateWords);
  };

  if (tagline) {
    window.addEventListener('scroll', scheduleWords, { passive: true });
    window.addEventListener('resize', scheduleWords);
  }

  const updateMotion = () => {
    document.documentElement.dataset.motion = motionPreference.matches
      ? 'reduced'
      : 'full';
    if (motionPreference.matches) {
      words.forEach((word) => (word.dataset.active = ''));
      revealElements.forEach((element) => (element.dataset.visible = ''));
      wordsFinished = true;
      window.removeEventListener('scroll', scheduleWords);
    } else {
      scheduleWords();
    }
  };
  motionPreference.addEventListener('change', updateMotion);
  updateMotion();

  const sectionLinks = document.querySelectorAll<HTMLAnchorElement>(
    '[data-section-link]',
  );
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    },
    { rootMargin: '-15% 0px -65% 0px' },
  );
  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
  });
}
export {};
