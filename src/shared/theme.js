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
  if (reveals.length > 0) {
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

  // Stagger cards inside grids: swap .reveal for .reveal-child with delays
  document.querySelectorAll('.grid').forEach((grid) => {
    const cards = grid.querySelectorAll(':scope > .reveal')
    cards.forEach((card, i) => {
      card.classList.remove('reveal')
      card.classList.add('reveal-child')
      card.style.setProperty('--reveal-delay', `${i * 0.12}s`)
    })
  })

  // Observer for staggered reveal-child elements
  const revealChildren = document.querySelectorAll('.reveal-child')
  if (revealChildren.length > 0) {
    const childObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-child--visible')
            childObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    revealChildren.forEach((el) => childObserver.observe(el))
  }
}

/**
 * Hero parallax fade-out on scroll.
 * Each hero element drifts up at a different speed and fades out.
 */
export function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const hero = document.getElementById('hero')
  if (!hero) return

  const content = hero.querySelector('.hero__content')
  if (!content) return

  function onScroll() {
    const rect = hero.getBoundingClientRect()

    // Only run while hero is in viewport
    if (rect.bottom < 0) return

    const scrolled = Math.max(0, -rect.top)
    const heroHeight = rect.height
    const progress = Math.min(scrolled / heroHeight, 1)

    const drift = scrolled * 0.3
    const fade = Math.max(0, 1 - progress * 1.3)
    content.style.transform = `translateY(-${drift}px)`
    content.style.opacity = fade
  }

  // Delay attachment so boot sequence completes first
  setTimeout(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  }, 2000)
}
