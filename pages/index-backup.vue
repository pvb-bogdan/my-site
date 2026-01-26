<template>
  <div :class="[
    'min-h-screen transition-colors duration-300',
    isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
  ]">
    <!-- Header Navigation -->
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isDarkMode
          ? (isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-gray-900/50')
          : (isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/50')
      ]"
    >
      <nav class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a href="#hero" class="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            Petre Bogdan
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-8 items-center">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              :class="[
                'transition-colors duration-200',
                isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'
              ]"
            >
              {{ link.label }}
            </a>

            <!-- Theme Toggle Button -->
            <button
              @click="toggleTheme"
              :class="[
                'p-2 rounded-lg transition-all duration-200',
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              ]"
              aria-label="Toggle theme"
            >
              <svg v-if="isDarkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
          </div>

          <!-- Mobile Menu & Theme Toggle -->
          <div class="md:hidden flex items-center gap-2">
            <!-- Theme Toggle Button (Mobile) -->
            <button
              @click="toggleTheme"
              :class="[
                'p-2 rounded-lg transition-all duration-200',
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              ]"
              aria-label="Toggle theme"
            >
              <svg v-if="isDarkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>

            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              :class="[
                'transition-colors',
                isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'
              ]"
              aria-label="Toggle menu"
            >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
          v-if="mobileMenuOpen"
          :class="[
            'md:hidden mt-4 pb-4 space-y-4 border-t pt-4',
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          ]"
        >
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="mobileMenuOpen = false"
            :class="[
              'block transition-colors duration-200',
              isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'
            ]"
          >
            {{ link.label }}
          </a>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section id="hero" class="min-h-screen flex items-center justify-center pt-20 px-6">
      <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <!-- Text Content -->
          <div class="flex-1 text-center lg:text-left">
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Hi, I'm <span class="text-indigo-400">Alex</span>
            </h1>
            <h2 :class="[
              'text-3xl md:text-4xl font-semibold mb-6',
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              Web Designer & Frontend Developer
            </h2>
            <p :class="[
              'text-xl mb-8 max-w-2xl mx-auto lg:mx-0',
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            ]">
              I craft beautiful, user-centric digital experiences with modern web technologies.
              Specializing in Vue, Nuxt, and design systems that scale.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#portfolio"
                class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                :class="[
                  'px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl border',
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white border-gray-700' : 'bg-white hover:bg-gray-100 text-gray-900 border-gray-300'
                ]"
              >
                Contact Me
              </a>
            </div>
          </div>

          <!-- Avatar Placeholder -->
          <div class="flex-shrink-0">
            <div class="w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl transform hover:scale-105 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" :class="[
      'py-20 px-6',
      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
    ]">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Services</h2>
          <p :class="[
            'text-xl max-w-2xl mx-auto',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">
            Comprehensive solutions for modern web development and design
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="service in services"
            :key="service.title"
            :class="[
              'p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border',
              isDarkMode ? 'bg-gray-900 border-gray-800 hover:border-indigo-500/50' : 'bg-white border-gray-200 hover:border-indigo-400'
            ]"
          >
            <div :class="[
              'w-16 h-16 rounded-lg flex items-center justify-center mb-6',
              isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-100'
            ]">
              <span class="text-3xl">{{ service.icon }}</span>
            </div>
            <h3 class="text-2xl font-semibold mb-4">{{ service.title }}</h3>
            <p :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 px-6">
      <div class="container mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Bio -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
            <p :class="[
              'text-xl mb-6 leading-relaxed',
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            ]">
              I'm a passionate web designer and frontend developer with over 5 years of experience
              creating stunning digital experiences. I specialize in building modern, performant,
              and accessible web applications that users love.
            </p>
            <p :class="[
              'text-xl mb-8 leading-relaxed',
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            ]">
              My approach combines clean design principles with robust development practices,
              ensuring every project not only looks great but performs flawlessly across all devices.
            </p>
            <a
              href="#"
              class="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Download CV
            </a>
          </div>

          <!-- Technologies -->
          <div>
            <h3 class="text-2xl font-semibold mb-6">Technologies & Tools</h3>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="tech in technologies"
                :key="tech"
                :class="[
                  'px-6 py-4 rounded-lg text-center font-medium transition-all duration-200 border',
                  isDarkMode ? 'bg-gray-800 hover:bg-indigo-600/20 hover:border-indigo-500 border-gray-700' : 'bg-white hover:bg-indigo-50 hover:border-indigo-400 border-gray-200'
                ]"
              >
                {{ tech }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" :class="[
      'py-20 px-6',
      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
    ]">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Portfolio</h2>
          <p :class="[
            'text-xl max-w-2xl mx-auto',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">
            A selection of recent projects showcasing my work
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in projects"
            :key="project.title"
            :class="[
              'group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border cursor-pointer',
              isDarkMode ? 'bg-gray-900 border-gray-800 hover:border-indigo-500/50' : 'bg-white border-gray-200 hover:border-indigo-400'
            ]"
          >
            <!-- Project Image Placeholder -->
            <div class="aspect-video bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span class="text-white text-lg font-semibold">View Project</span>
              </div>
            </div>

            <!-- Project Info -->
            <div class="p-6">
              <h3 :class="[
                'text-2xl font-semibold mb-2 transition-colors',
                isDarkMode ? 'group-hover:text-indigo-400' : 'group-hover:text-indigo-600'
              ]">
                {{ project.title }}
              </h3>
              <p :class="[
                'mb-4',
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              ]">{{ project.description }}</p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    isDarkMode ? 'bg-indigo-600/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                  ]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 px-6">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Testimonials</h2>
          <p :class="[
            'text-xl max-w-2xl mx-auto',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">
            What clients say about working with me
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            :class="[
              'p-8 rounded-xl shadow-lg border transition-all duration-300',
              isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-indigo-500/50' : 'bg-white border-gray-200 hover:border-indigo-400'
            ]"
          >
            <!-- Avatar -->
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold mr-4">
                {{ testimonial.initials }}
              </div>
              <div>
                <h4 class="font-semibold text-lg">{{ testimonial.name }}</h4>
                <p :class="[
                  'text-sm',
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                ]">{{ testimonial.role }}</p>
              </div>
            </div>

            <!-- Testimonial Text -->
            <p :class="[
              'italic leading-relaxed',
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              "{{ testimonial.text }}"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" :class="[
      'py-20 px-6',
      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
    ]">
      <div class="container mx-auto max-w-4xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p :class="[
            'text-xl max-w-2xl mx-auto',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">
            Have a project in mind? Let's work together to create something amazing
          </p>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="handleSubmit" :class="[
          'p-8 md:p-12 rounded-xl shadow-2xl border',
          isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        ]">
          <div class="mb-6">
            <label for="name" class="block text-sm font-medium mb-2">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all',
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
                formErrors.name ? 'border-red-500 focus:ring-red-500' : (isDarkMode ? 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500')
              ]"
              placeholder="Your name"
            />
          </div>

          <div class="mb-6">
            <label for="email" class="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all',
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
                formErrors.email ? 'border-red-500 focus:ring-red-500' : (isDarkMode ? 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500')
              ]"
              placeholder="your.email@example.com"
            />
          </div>

          <div class="mb-6">
            <label for="message" class="block text-sm font-medium mb-2">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="6"
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none',
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
                formErrors.message ? 'border-red-500 focus:ring-red-500' : (isDarkMode ? 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500')
              ]"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Send Message
          </button>
        </form>

        <!-- Social Links -->
        <div class="mt-12 text-center">
          <p :class="[
            'mb-6',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">Or connect with me on social media</p>
          <div class="flex justify-center space-x-6">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :class="[
                'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110 border',
                isDarkMode ? 'bg-gray-800 hover:bg-indigo-600 border-gray-700 hover:border-indigo-500' : 'bg-white hover:bg-indigo-600 border-gray-200 hover:border-indigo-500 hover:text-white'
              ]"
              :aria-label="social.name"
            >
              <span class="text-xl">{{ social.icon }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer :class="[
      'py-8 px-6 border-t',
      isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    ]">
      <div :class="[
        'container mx-auto text-center',
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      ]">
        <p>&copy; {{ currentYear }} Petre Bogdan. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Navigation state
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const isDarkMode = ref(true)

// Theme toggle handler
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }
}

// Navigation links
const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

// Services data
const services = [
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful user interfaces that provide exceptional user experiences.'
  },
  {
    icon: '💻',
    title: 'Frontend Development',
    description: 'Building responsive, performant web applications with modern frameworks and best practices.'
  },
  {
    icon: '🧩',
    title: 'Design Systems',
    description: 'Developing scalable design systems and component libraries for consistent user experiences.'
  },
  {
    icon: '⚡',
    title: 'Performance Optimization',
    description: 'Ensuring your website loads fast and runs smoothly across all devices and platforms.'
  }
]

// Technologies
const technologies = [
  'HTML & CSS',
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'Nuxt.js',
  'React',
  'Tailwind CSS',
  'Figma',
  'Git & GitHub',
  'Node.js',
  'REST APIs',
  'Responsive Design'
]

// Projects data
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Modern online shopping experience with Vue and Nuxt',
    tags: ['Nuxt', 'Tailwind', 'Stripe']
  },
  {
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard with real-time data visualization',
    tags: ['Vue', 'Chart.js', 'API']
  },
  {
    title: 'Portfolio Website',
    description: 'Clean and minimal portfolio for a creative agency',
    tags: ['Nuxt', 'Tailwind', 'Animations']
  },
  {
    title: 'Mobile App Landing',
    description: 'Engaging landing page for a mobile application',
    tags: ['Vue', 'Tailwind', 'Responsive']
  },
  {
    title: 'Design System',
    description: 'Comprehensive component library for enterprise',
    tags: ['Vue', 'Storybook', 'TypeScript']
  },
  {
    title: 'Blog Platform',
    description: 'Content-focused blogging platform with CMS',
    tags: ['Nuxt', 'Content', 'SEO']
  }
]

// Testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    initials: 'SJ',
    text: 'Alex delivered an outstanding website that exceeded our expectations. Professional, creative, and incredibly responsive to feedback.'
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager, InnovateCo',
    initials: 'MC',
    text: 'Working with Alex was a pleasure. The attention to detail and technical expertise really shows in the final product.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director, GrowthHub',
    initials: 'ER',
    text: 'Our new website has significantly improved our conversion rates. Alex truly understands both design and user experience.'
  }
]

// Social links
const socialLinks = [
  { name: 'GitHub', icon: '🔗', url: 'https://github.com' },
  { name: 'Dribbble', icon: '🎨', url: 'https://dribbble.com' },
  { name: 'Behance', icon: '📱', url: 'https://behance.net' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' }
]

// Contact form
const form = ref({
  name: '',
  email: '',
  message: ''
})

const formErrors = ref({
  name: false,
  email: false,
  message: false
})

// Form submission handler
const handleSubmit = () => {
  // Simple validation
  formErrors.value = {
    name: !form.value.name,
    email: !form.value.email || !isValidEmail(form.value.email),
    message: !form.value.message
  }

  // Check if form is valid
  if (!Object.values(formErrors.value).some(error => error)) {
    console.log('Form submitted:', form.value)
    // Reset form
    form.value = { name: '', email: '', message: '' }
    alert('Thank you for your message! I will get back to you soon.')
  }
}

// Email validation helper
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Scroll handler for header
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Load theme preference from localStorage
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
