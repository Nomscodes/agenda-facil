<script setup>
import StatusBadge from './StatusBadge.vue'

defineProps({
  agendamento: {
    type: Object,
    required: true,
  },
})

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}
</script>

<template>
  <RouterLink
    class="agendamento-link"
    :to="{ name: 'detalhe', params: { id: agendamento.id } }"
  >
    <article class="agendamento-card">
      <h2 class="agendamento-card__titulo">{{ agendamento.servico }}</h2>
      <p class="agendamento-card__meta">
        {{ agendamento.profissional }} · {{ formatarData(agendamento.data) }} às
        {{ agendamento.hora }}
      </p>
      <StatusBadge :status="agendamento.status" />
    </article>
  </RouterLink>
</template>