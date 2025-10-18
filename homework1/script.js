// Smooth scroll when clicking menu items
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('data-target');
    const el = document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'start'});
    document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});

// Highlight menu item based on scroll position using IntersectionObserver
const sections = document.querySelectorAll('main section, main header.hero');
const options = {root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.id || 'home';
      document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
      const active = document.querySelector('.menu a[data-target="'+id+'"]');
      if(active) active.classList.add('active');
    }
  });
}, options);
sections.forEach(s => observer.observe(s));

// Keyboard navigation for accessibility
const menuLinks = Array.from(document.querySelectorAll('.menu a'));
menuLinks.forEach((ln, idx) => {
  ln.setAttribute('tabindex', '0');
  ln.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowDown'){
      e.preventDefault();
      const next = menuLinks[(idx+1) % menuLinks.length];
      next.focus();
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      const prev = menuLinks[(idx-1+menuLinks.length) % menuLinks.length];
      prev.focus();
    } else if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      ln.click();
    }
  });
});