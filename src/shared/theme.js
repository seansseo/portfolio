/**
 * Nav scroll effect + reveal animations via IntersectionObserver.
 */
export function initTheme() {
  // Nav background on scroll
  const nav = document.getElementById('nav')
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add('nav--scrolled')
      } else {
        nav.classList.remove('nav--scrolled')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  // Reveal animations
  const reveals = document.querySelectorAll('.reveal')
  if (reveals.length === 0) return

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  )

  reveals.forEach((el) => revealObserver.observe(el))
}
