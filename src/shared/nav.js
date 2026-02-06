/**
 * Sticky glassmorphism navigation.
 * @param {boolean} isLanding - true on landing page (uses #hash), false on sub-pages (uses /#hash)
 */
export function initNav(isLanding = true) {
  const base = import.meta.env.BASE_URL
  const prefix = isLanding ? '' : base

  const nav = document.createElement('nav')
  nav.className = 'nav'
  nav.id = 'nav'
  nav.innerHTML = `
    <div class="nav__inner">
      <a href="${base}" class="nav__logo">Sean Seo</a>
      <div class="nav__links" id="nav-links">
        <a href="${prefix}#projects" class="nav__link" data-section="projects">Projects</a>
        <a href="${prefix}#blog" class="nav__link" data-section="blog">Blog</a>
        <a href="${prefix}#about" class="nav__link" data-section="about">About</a>
        <a href="${prefix}#contact" class="nav__link" data-section="contact">Contact</a>
      </div>
      <button class="nav__toggle" id="nav-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `

  document.body.prepend(nav)

  // Mobile toggle
  const toggle = document.getElementById('nav-toggle')
  const links = document.getElementById('nav-links')

  toggle.addEventListener('click', () => {
    links.classList.toggle('nav__links--open')
  })

  // Close mobile menu on link click
  links.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('nav__links--open')
    })
  })

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      links.classList.remove('nav__links--open')
    }
  })
}
