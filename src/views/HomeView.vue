<script setup>
import { useAgendamentosStore } from '../stores/agendamentos.js'
import AgendamentoCard from '../components/AgendamentoCard.vue'

const store = useAgendamentosStore()

function ordenarPorData(a, b) {
  const chave = (x) => `${x.data} ${x.hora}`
  return chave(a).localeCompare(chave(b))
}

const agendamentosOrdenados = () => [...store.agendamentos].sort(ordenarPorData)
</script>

<template>
  <section>
    <h1>Meus agendamentos</h1>
    <p class="texto-suave">
      Selecione um agendamento para ver os detalhes ou cancelar.
    </p>

    <h2 class="legenda-status">Legenda de status</h2>
    <ul class="lista-status">
      <li class="lista-status__item">
        <span class="status-badge status-badge--confirmado">
          <span class="screen-reader">Confirmado</span>● Confirmado
        </span>
      </li>
      <li class="lista-status__item">
        <span class="status-badge status-badge--cancelado">
          <span class="screen-reader">Cancelado</span>● Cancelado
        </span>
      </li>
      <li class="lista-status__item">
        <span class="status-badge status-badge--pendente">
          <span class="screen-reader">Pendente</span>● Pendente
        </span>
      </li>
    </ul>

    <ul class="lista-agendamentos">
      <li v-for="agendamento in agendamentosOrdenados()" :key="agendamento.id">
        <AgendamentoCard :agendamento="agendamento" />
      </li>
    </ul>

    <p v-if="!store.agendamentos.length" class="texto-suave">
      Nenhum agendamento encontrado.
    </p>
  </section>
</template>