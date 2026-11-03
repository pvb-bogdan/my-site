<template>
  <!-- Soft gradient blobs shared by the hero and the 404 page; only the first drifts, very slowly -->
  <div class="absolute inset-0 z-0 pointer-events-none" style="contain: layout style paint;" aria-hidden="true">
    <div class="absolute -top-20 left-[10%] w-[550px] h-[550px] bg-gradient-to-br from-sky-200 to-blue-400 rounded-full blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen dark:opacity-30 animate-blob-move-1"></div>
    <div class="absolute top-[15%] right-[5%] w-[400px] h-[400px] bg-gradient-to-bl from-cyan-300 to-teal-400 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen dark:opacity-20"></div>
    <div class="absolute top-[40%] -left-[5%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-200 to-sky-500 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen dark:opacity-25"></div>
  </div>
</template>
