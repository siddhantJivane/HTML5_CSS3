// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
  // Add animate-on-scroll class to cards, timeline items, and other elements
  const elementsToAnimate = document.querySelectorAll('.card, .timeline-item, .stack-column, .badge-group, .education-grid .card');
  
  elementsToAnimate.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    // Add stagger delay
    if (index < 6) {
      el.classList.add(`delay-${(index % 6) + 1}`);
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Animate hero content on load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroElements = heroContent.querySelectorAll('h1, .hero-subtitle, .hero-actions, .hero-meta');
    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    });
  }
});

