import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(true)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  const updateTheme = () => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      if (isDark.value) {
        html.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        html.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      // Default to dark if no preference or if saved as dark
      isDark.value = savedTheme === 'dark' || !savedTheme
      updateTheme()
    }
  })

  return {
    isDark,
    toggleTheme
  }
}
