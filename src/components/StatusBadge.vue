<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (v) => ['confirmado', 'cancelado', 'pendente'].includes(v),
  },
})

const rotulos = {
  confirmado: 'Confirmado',
  cancelado: 'Cancelado',
  pendente: 'Pendente',
}

const descricoes = {
  confirmado: 'Agendamento confirmado',
  cancelado: 'Agendamento cancelado',
  pendente: 'Agendamento pendente de confirmação',
}

const rotulo = computed(() => rotulos[props.status])
const classe = computed(() => `status-badge status-badge--${props.status}`)
</script>

<template>
  <span :class="classe">
    <svg
      class="info-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle v-if="status === 'confirmado'" cx="12" cy="12" r="10" />
      <path v-if="status === 'confirmado'" d="m9 12 2 2 4-4" />
      <circle v-if="status === 'cancelado'" cx="12" cy="12" r="10" />
      <path v-if="status === 'cancelado'" d="m15 9-6 6M9 9l6 6" />
      <circle v-if="status === 'pendente'" cx="12" cy="12" r="10" />
      <path v-if="status === 'pendente'" d="M12 7v5l3 2" />
    </svg>
    <span>{{ rotulo }}</span>
    <span class="screen-reader">{{ descricoes[status] }}</span>
  </span>
</template>