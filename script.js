// Global enhancements for Notion/Apple UI
document.addEventListener('DOMContentLoaded', () => {
  // Parallax hero
  window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Magnetic buttons (hover attract cursor)
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === '/') {
      e.preventDefault();
      document.querySelector('.search-input')?.focus();
    }
    if (e.metaKey && e.key === 'k') {
      e.preventDefault();
      document.querySelector('.search-input')?.focus();
    }
  });
});
