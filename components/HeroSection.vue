<template>
  <section id="hero" class="relative flex items-center justify-center min-h-screen px-6 pt-20 overflow-hidden">
    <!-- Background Gradient Blobs -->
    <div class="absolute inset-0 z-0">
      <!-- Violet/Purple blob - top left area -->
      <div class="absolute -top-20 left-[10%] w-[550px] h-[550px] bg-gradient-to-br from-violet-200 to-purple-400 rounded-full blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen dark:opacity-30 animate-blob-move-1"></div>
      <!-- Cyan/Teal blob - upper right -->
      <div class="absolute top-[15%] right-[5%] w-[400px] h-[400px] bg-gradient-to-bl from-cyan-300 to-teal-400 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen dark:opacity-20 animate-blob-move-2"></div>
      <!-- Indigo/Blue blob - left center-ish -->
      <div class="absolute top-[40%] -left-[5%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200 to-blue-500 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen dark:opacity-25 animate-blob-move-3"></div>
      <!-- Pink/Fuchsia blob - bottom center-right -->
      <div class="absolute bottom-[10%] right-[25%] w-[450px] h-[450px] bg-gradient-to-tl from-pink-300 to-fuchsia-400 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen dark:opacity-20 animate-blob-move-4"></div>
      <!-- Sky/Cyan blob - bottom left offset -->
      <div class="absolute -bottom-16 left-[30%] w-[400px] h-[400px] bg-gradient-to-r from-sky-300 to-cyan-400 rounded-full blur-3xl opacity-25 mix-blend-multiply dark:mix-blend-screen dark:opacity-15 animate-blob-move-5"></div>
    </div>

    <div class="container mx-auto z-1">
      <div class="flex flex-col items-center justify-between gap-12 lg:flex-row">
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left">
          <h1 class="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl animate-fade-in-up animation-delay-100">
            Salut, sunt <br/> <span class="text-indigo-400">{{ name }}</span>
          </h1>
          <h2 class="mb-6 text-3xl font-semibold text-gray-700 md:text-4xl dark:text-gray-300 animate-fade-in-up animation-delay-200">
            UI/UX Designer
          </h2>
          <p class="max-w-2xl mx-auto mb-8 text-xl text-gray-600 lg:mx-0 dark:text-gray-400 animate-fade-in-up animation-delay-300">
            Creez experiențe digitale intuitive și atractive, axate pe utilizator, folosind Figma și AdobeXD pentru prototipare și design. Integrez designul cu dezvoltarea frontend pentru rezultate moderne și eficiente.
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start animate-fade-in-up animation-delay-400">
            <a
              href="#portfolio"
              class="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 transform bg-indigo-600 rounded-lg shadow-lg group hover:scale-105 hover:shadow-xl"
            >
              <span class="relative z-10">Vezi Portofoliul</span>
              <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-indigo-700 to-purple-600 group-hover:opacity-100"></div>
            </a>
            <a
              href="#contact"
              class="px-8 py-4 font-semibold text-gray-900 transition-all duration-200 transform bg-white border border-gray-300 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-700"
            >
              Contactează-mă
            </a>
          </div>
        </div>

          <!-- Hero Image -->
        <div class="relative flex-shrink-0 lg:flex-1 animate-fade-in-right animation-delay-300">
          <!-- Soft Glow/Shadow -->
          <div class="absolute -z-1 left-1/2 top-1/2 w-[90%] h-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/30 blur-2xl"></div>

          <!-- Floating SVG Shapes -->
          <svg class="absolute top-0 left-0 w-16 h-16 text-indigo-300/40 opacity-70 animate-float-slow" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="currentColor"/></svg>
          <svg class="absolute w-10 h-10 text-pink-300 dark:text-green-100 right-4 top-10 opacity-60 animate-float-medium" viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor"/></svg>
          <svg class="absolute bottom-0 w-12 h-12 left-10 text-cyan-300/40 opacity-60 animate-float-fast" viewBox="0 0 40 40" fill="none"><polygon points="20,0 40,40 0,40" fill="currentColor"/></svg>

          <!-- Figma Badge
          <div class="absolute flex items-center gap-1 px-3 py-1 border border-gray-200 rounded-full shadow-lg -top-4 -right-4 bg-white/80 dark:bg-gray-900/80 dark:border-gray-700 backdrop-blur-md animate-fade-in-up animation-delay-400">
            <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><g><circle cx="12" cy="5" r="3" fill="#F24E1E"/><circle cx="12" cy="12" r="3" fill="#A259FF"/><circle cx="12" cy="19" r="3" fill="#1ABCFE"/><circle cx="5" cy="12" r="3" fill="#0ACF83"/><circle cx="19" cy="12" r="3" fill="#FF7262"/></g></svg>
            <span class="text-xs font-semibold text-gray-700 dark:text-gray-200">Figma</span>
          </div> -->

          <img 
            src="~/assets/images/avatar2.webp" 
            alt="Device Mockup" 
            class="relative z-10 hidden w-full max-w-lg mx-auto transition-transform duration-300 transform md:block lg:max-w-xl xl:max-w-[40rem] hover:scale-105"
          />
        </div>
      </div>
    </div>
    <!-- Scroll Indicator -->
    <div class="absolute flex-col items-center hidden -translate-x-1/2 md-flex left-1/2 bottom-6 opacity-80 animate-fade-in-up animation-delay-400 md:flex">
      <div class="relative flex items-start justify-center h-12 border-2 border-indigo-400 rounded-full w-7 dark:border-gray-600">
        <div class="w-2 h-2 mt-2 bg-indigo-400 rounded-full dark:bg-gray-600 animate-scroll-indicator"></div>
      </div>
      <span class="mt-2 text-xs tracking-wide text-indigo-400 dark:text-gray-300">Scroll</span>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  title: string
  description: string
}>()
</script>

<style scoped>
/* Fade in from above */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade in from below */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade in from right */
@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.6s ease-out forwards;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-fade-in-right {
  opacity: 0;
  animation: fade-in-right 0.8s ease-out forwards;
}

/* Animation delays */
.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

@keyframes blob-move-1 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-24px) scale(1.04); }
}
.animate-blob-move-1 { animation: blob-move-1 12s ease-in-out infinite; }
@keyframes blob-move-2 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(18px) scale(1.03); }
}
.animate-blob-move-2 { animation: blob-move-2 10s ease-in-out infinite; }
@keyframes blob-move-3 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-16px) scale(1.05); }
}
.animate-blob-move-3 { animation: blob-move-3 14s ease-in-out infinite; }
@keyframes blob-move-4 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(20px) scale(1.02); }
}
.animate-blob-move-4 { animation: blob-move-4 11s ease-in-out infinite; }
@keyframes blob-move-5 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.04); }
}
.animate-blob-move-5 { animation: blob-move-5 13s ease-in-out infinite; }

@keyframes scroll-indicator {
  0% { opacity: 1; transform: translateY(0); }
  60% { opacity: 1; transform: translateY(18px); }
  100% { opacity: 0; transform: translateY(24px); }
}
.animate-scroll-indicator {
  animation: scroll-indicator 1.6s cubic-bezier(0.4,0,0.2,1) infinite;
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-18px) scale(1.08); }
}
.animate-float-slow {
  animation: float-slow 5s ease-in-out infinite;
}
@keyframes float-medium {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.05); }
}
.animate-float-medium {
  animation: float-medium 3.5s ease-in-out infinite;
}
@keyframes float-fast {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.03); }
}
.animate-float-fast {
  animation: float-fast 2.7s ease-in-out infinite;
}
</style>
