import { onMounted } from 'vue'

// The inline script in nuxt.config.ts sets the `dark` class before first paint,
// so this composable only mirrors that class and persists explicit choices.
export function useTheme() {
  // Shared across components (header toggle, page) so they all read the same state
  const isDark = useState('theme-is-dark', () => false)

  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
    try {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Cross-fade light <-> dark where View Transitions exist; switch instantly otherwise
    if (!prefersReducedMotion && typeof document.startViewTransition === 'function') {
      document.startViewTransition(applyTheme)
    } else {
      applyTheme()
    }
  }

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })

  return {
    isDark,
    toggleTheme
  }
}
