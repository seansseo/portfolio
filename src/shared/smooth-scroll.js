/**
 * Smooth scroll for hash links + scroll spy for active nav highlighting.
 */
export function initSmoothScroll() {
  // Smooth scroll for hash links on the page
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return

    const targetId = link.getAttribute('href').slice(1)
    const target = document.getElementById(targetId)
    if (!target) return

    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })

    // Update URL without scroll jump
    history.pushState(null, '', `#${targetId}`)
  })

  // Scroll spy — highlight active nav link
  const sections = document.querySelectorAll('.section[id]')
  const navLinks = document.querySelectorAll('.nav__link[data-section]')

  if (sections.length === 0 || navLinks.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('nav__link--active'))
          const activeLink = document.querySelector(
            `.nav__link[data-section="${entry.target.id}"]`
          )
          if (activeLink) activeLink.classList.add('nav__link--active')
        }
      })
    },
    {
      rootMargin: '-20% 0px -60% 0px',
    }
  )

  sections.forEach((section) => observer.observe(section))
}
