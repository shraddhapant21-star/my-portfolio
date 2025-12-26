// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();


// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuBtn.querySelector('i').classList.toggle('fa-x');
});

// Contact form -> Formspree existing endpoint
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/mldzgvaa", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      alert("Message sent!");
      form.reset();
    } else {
      alert("Error sending message. Please try again later.");
    }
  } catch (err) {
    alert("Network error. Please try again later.");
    console.error(err);
  }
});

// THEME: toggle, icon swap, and persistence
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Load saved theme or prefer
const savedTheme = localStorage.getItem('theme'); // 'dark' or 'light' or null
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add('dark-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
} else {
  document.documentElement.classList.remove('dark-mode');
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark-mode');

  if (isDark) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const el = document.querySelector(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav if open
      if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
    }
  });
});
