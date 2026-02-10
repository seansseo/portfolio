import './styles/global.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/landing.css'

import { initNav } from './shared/nav.js'
import { initFooter } from './shared/footer.js'
import { initSmoothScroll } from './shared/smooth-scroll.js'
import { initTheme, initThemeToggle } from './shared/theme.js'

initNav(true)
initFooter()
initTheme()
initThemeToggle()
initSmoothScroll()
