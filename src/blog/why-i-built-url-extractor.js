import '../styles/global.css'
import '../styles/layout.css'
import '../styles/components.css'
import '../styles/blog-post.css'

import { initNav } from '../shared/nav.js'
import { initFooter } from '../shared/footer.js'
import { initTheme } from '../shared/theme.js'

initNav(false)
initFooter()
initTheme()
