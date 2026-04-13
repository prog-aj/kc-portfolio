// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Stagger children of these containers
const staggerContainers = [
  '.skills-grid',
  '.projects-grid',
  '.about-traits',
  '.contact-links'
];

staggerContainers.forEach(selector => {
  const container = document.querySelector(selector);
  if (!container) return;
  Array.from(container.children).forEach((child, i) => {
    child.classList.add('reveal');
    child.style.transitionDelay = `${i * 0.07}s`;
    revealObserver.observe(child);
  });
});

// Standalone reveals
document.querySelectorAll('.about-inner, .contact-inner, .section-heading, .section-tag').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Skill bar animation — trigger when tile is in view
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-tile').forEach(tile => skillObserver.observe(tile));

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--blue-700)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
