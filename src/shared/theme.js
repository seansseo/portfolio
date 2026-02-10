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

/**
 * Apply initial theme from localStorage or system preference.
 */
export function applyInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored)
  }
  // If no stored preference, CSS handles system preference via @media
}

/**
 * Toggle between dark and light themes.
 */
export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  const isDark = !current || current === 'dark'
  const next = isDark ? 'light' : 'dark'

  // Add transition class for smooth switch
  document.documentElement.classList.add('theme-transitioning')

  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)

  // Update toggle icon
  updateToggleIcon(next)

  // Remove transition class after animation
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning')
  }, 400)
}

/**
 * Update the theme toggle button icon.
 */
function updateToggleIcon(theme) {
  const btn = document.getElementById('theme-toggle')
  if (!btn) return

  const isDark = !theme || theme === 'dark'

  // Sun icon for dark mode (click to go light), Moon icon for light mode (click to go dark)
  if (isDark) {
    btn.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
  } else {
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
  }
}

/**
 * Initialize the theme toggle button.
 */
export function initThemeToggle() {
  const btn = document.getElementById('theme-toggle')
  if (!btn) return

  // Set initial icon
  const current = document.documentElement.getAttribute('data-theme')
  // Check if system prefers light and no explicit theme is set
  let effectiveTheme = current
  if (!effectiveTheme) {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }
  updateToggleIcon(effectiveTheme)

  // Bind click
  btn.addEventListener('click', toggleTheme)
}
