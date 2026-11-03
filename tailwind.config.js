/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // You can customize your color palette here
      },
      fontFamily: {
        sans: ['Nunito Variable', 'Nunito', 'sans-serif'],
      },
      // Shared motion tokens (defined as CSS variables in assets/css/tailwind.css)
      transitionDuration: {
        DEFAULT: 'var(--dur-base)',
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--ease-out)',
        out: 'var(--ease-out)',
      },
    },
  },
  plugins: [],
}
