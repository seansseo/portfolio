import './styles/global.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/landing.css'

import { initNav } from './shared/nav.js'
import { initFooter } from './shared/footer.js'
import { initSmoothScroll } from './shared/smooth-scroll.js'
import { initTheme, initHeroParallax } from './shared/theme.js'

initNav(true)
initFooter()
initTheme()
initSmoothScroll()
initHeroParallax()

// Scroll-row arrow buttons
document.querySelectorAll('.scroll-row').forEach((row) => {
  const track = row.querySelector('.scroll-row__track')
  const prev = row.querySelector('.scroll-row__btn--prev')
  const next = row.querySelector('.scroll-row__btn--next')
  if (!track || !prev || !next) return

  function updateButtons() {
    prev.disabled = track.scrollLeft <= 0
    next.disabled = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 1
  }

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -track.offsetWidth * 0.8, behavior: 'smooth' })
  })

  next.addEventListener('click', () => {
    track.scrollBy({ left: track.offsetWidth * 0.8, behavior: 'smooth' })
  })

  track.addEventListener('scroll', updateButtons, { passive: true })
  updateButtons()
})
