<template>
  <section id="contact" class="px-6 py-20 bg-gray-100 dark:bg-gray-800/50">
    <div class="container max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-4xl font-bold md:text-5xl">Contactează-mă</h2>
        <p class="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
          Ai un proiect în minte? Hai să lucrăm împreună pentru a crea ceva extraordinar
        </p>
      </div>

      <!-- Two Column Layout -->
      <div class="grid items-stretch gap-8 md:grid-cols-2">
        <!-- Left Column: Contact Details -->
        <div class="space-y-4">
          <!-- Intro Text -->
          <div class="p-6 bg-white border border-gray-200 shadow-lg dark:bg-gray-900 rounded-2xl dark:border-gray-700">
            <h3 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Să vorbim!</h3>
            <p class="leading-relaxed text-gray-600 dark:text-gray-400">
              Sunt mereu deschis pentru noi colaborări și proiecte creative. 
              Nu ezita să mă contactezi prin oricare dintre canalele de mai jos.
            </p>
          </div>

          <!-- Contact Items -->
          <div class="space-y-4">
            <!-- Phone -->
            <div 
              @click="revealPhone"
              :class="[
                'flex items-center gap-4 p-4 transition-all duration-300 bg-white border border-gray-200 dark:bg-gray-900 group rounded-xl dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg',
                !phoneRevealed ? 'cursor-pointer' : ''
              ]"
            >
              <div class="flex items-center justify-center w-12 h-12 transition-all duration-300 bg-indigo-100 rounded-xl dark:bg-indigo-900/30 group-hover:bg-indigo-600 group-hover:text-white">
                <IconsPhone class="w-6 h-6 text-indigo-600 group-hover:text-white" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 dark:text-gray-400">Telefon</p>
                <p v-if="!phoneRevealed" class="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Click pentru a afișa
                </p>
                <a 
                  v-else
                  :href="`tel:${phone.replace(/\s/g, '')}`"
                  class="font-semibold text-gray-900 transition-colors dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                  @click.stop
                >
                  {{ phone }}
                </a>
              </div>
              <IconsEye v-if="!phoneRevealed" class="w-5 h-5 text-gray-400" />
            </div>

            <!-- Email -->
            <div 
              @click="revealEmail"
              :class="[
                'flex items-center gap-4 p-4 transition-all duration-300 bg-white border border-gray-200 dark:bg-gray-900 group rounded-xl dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg',
                !emailRevealed ? 'cursor-pointer' : ''
              ]"
            >
              <div class="flex items-center justify-center w-12 h-12 transition-all duration-300 bg-indigo-100 rounded-xl dark:bg-indigo-900/30 group-hover:bg-indigo-600 group-hover:text-white">
                <IconsEmail class="w-6 h-6 text-indigo-600 group-hover:text-white" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p v-if="!emailRevealed" class="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Click pentru a afișa
                </p>
                <a 
                  v-else
                  :href="`mailto:${email}`"
                  class="font-semibold text-gray-900 transition-colors dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                  @click.stop
                >
                  {{ email }}
                </a>
              </div>
              <IconsEye v-if="!emailRevealed" class="w-5 h-5 text-gray-400" />
            </div>

            <!-- WhatsApp -->
            <a 
              :href="`https://wa.me/${whatsapp}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 transition-all duration-300 bg-white border border-gray-200 dark:bg-gray-900 group rounded-xl dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-lg"
            >
              <div class="flex items-center justify-center w-12 h-12 transition-all duration-300 bg-green-100 rounded-xl dark:bg-green-900/30 group-hover:bg-green-500 group-hover:text-white">
                <IconsWhatsapp class="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">WhatsApp</p>
                <p class="font-semibold text-gray-900 transition-colors dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">Trimite mesaj</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Right Column: Image Card with Social Icons inside -->
        <div class="relative p-6 bg-white border border-gray-200 shadow-lg dark:bg-gray-900 rounded-2xl dark:border-gray-700 flex items-center justify-center min-h-[400px]">
          <!-- SVG Image -->
          <img 
            src="~/assets/images/contact-1.svg" 
            alt="Contact illustration" 
            class="object-contain w-full h-full"
          />
          
          <!-- Social Icons Card - positioned bottom right -->
          <div class="absolute flex gap-2 p-3 border border-gray-200 shadow-lg bottom-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm dark:border-gray-700 rounded-xl">
            <!-- Instagram -->
            <a 
              :href="contactInfo.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-10 h-10 transition-all duration-300 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:border-transparent group"
              aria-label="Instagram"
            >
              <IconsInstagram class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
            </a>

            <!-- Facebook -->
            <a 
              :href="contactInfo.facebook"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-10 h-10 transition-all duration-300 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:bg-blue-600 hover:border-transparent group"
              aria-label="Facebook"
            >
              <IconsFacebook class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
            </a>

            <!-- LinkedIn -->
            <a 
              :href="contactInfo.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-10 h-10 transition-all duration-300 border border-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg dark:border-gray-600 hover:bg-[#0077B5] hover:border-transparent group"
              aria-label="LinkedIn"
            >
              <IconsLinkedin class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Reveal states for anti-spam protection
const phoneRevealed = ref(false)
const emailRevealed = ref(false)

// Reveal functions
const revealPhone = () => {
   if (!phoneRevealed.value) {
    setTimeout(() => (phoneRevealed.value = true), 300)
  }
}

const revealEmail = () => {
   if (!emailRevealed.value) {
    setTimeout(() => (emailRevealed.value = true), 300)
  }
}

// Contact information - you can update these values
const contactInfo = {
  phone: ['+40', '723', '390', '457'],
  email: ['pvb.bogdan', 'gmail', 'com'],
  whatsapp: ['40', '723', '390', '457'],
  instagram: 'https://www.instagram.com/bogdanpetre72/',
  facebook: 'https://www.facebook.com/pvb.bogdan',
  linkedin: 'https://www.linkedin.com/in/petrebogdan'
}
const phone = computed(() => contactInfo.phone.join(' '))
const whatsapp = computed(() => contactInfo.whatsapp.join(''))
const email = computed(() => `${contactInfo.email[0]}@${contactInfo.email[1]}.${contactInfo.email[2]}`)

</script>
