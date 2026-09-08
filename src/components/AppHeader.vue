<script setup>
import { ref } from 'vue'

const passos = [14, 16, 18, 20, 22, 24]
const indiceFonte = ref(1)
const altoContraste = ref(false)

function setFonte(indice) {
  indiceFonte.value = Math.min(passos.length - 1, Math.max(0, indice))
  document.documentElement.style.fontSize = `${passos[indiceFonte.value]}px`
}

function aumentar() {
  setFonte(indiceFonte.value + 1)
}

function diminuir() {
  setFonte(indiceFonte.value - 1)
}

function alternarContraste() {
  altoContraste.value = !altoContraste.value
  document.documentElement.classList.toggle('hc', altoContraste.value)
}
</script>

<template>
  <div class="barra-acessibilidade">
    <div class="barra-acessibilidade__container">
      <button
        type="button"
        class="btn btn--acess-reduzir"
        aria-label="Diminuir tamanho da fonte"
        @click="diminuir"
      >
        A-
      </button>
      <button
        type="button"
        class="btn btn--acess-aumentar"
        aria-label="Aumentar tamanho da fonte"
        @click="aumentar"
      >
        A+
      </button>
      <button
        type="button"
        class="btn btn--acess-contraste"
        aria-pressed="false"
        :aria-label="altoContraste ? 'Desativar alto contraste' : 'Ativar alto contraste'"
        @click="alternarContraste"
      >
        Alto contraste
      </button>
    </div>
  </div>

  <header class="site-header">
    <div class="site-header__container">
      <RouterLink class="brand" :to="{ name: 'home' }">AgendaFácil</RouterLink>
      <nav class="site-nav" aria-label="Navegação principal">
        <ul>
          <li>
            <RouterLink :to="{ name: 'home' }" active-class="ativo">Agendamentos</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>