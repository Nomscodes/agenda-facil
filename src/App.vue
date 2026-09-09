<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo principal</a>

  <AppHeader />

  <main id="conteudo" class="conteudo" tabindex="-1">
    <RouterView />
  </main>

  <AppFooter />
</template>