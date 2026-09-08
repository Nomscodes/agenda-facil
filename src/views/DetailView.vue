<script setup>
import { computed, ref } from 'vue'
import { useAgendamentosStore } from '../stores/agendamentos.js'
import StatusBadge from '../components/StatusBadge.vue'
import ConfirmCancelModal from '../components/ConfirmCancelModal.vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
})

const store = useAgendamentosStore()

const agendamento = computed(() => store.getById(props.id))

const modalAberto = ref(false)
const mensagem = ref('')
const tipoMensagem = ref('sucesso')
const botaoCancelar = ref(null)

const podeCancelar = computed(() =>
  agendamento.value ? store.podeCancelar(agendamento.value.id) : false,
)

const aquiAgora = new Date()
const horaMinima = new Date(
  aquiAgora.getTime() - store.prazoMinimoHoras * 60 * 60 * 1000,
)

const avisoCancelamento = computed(() => {
  if (!agendamento.value) return ''
  if (agendamento.value.status === 'cancelado') {
    return 'Este agendamento já foi cancelado.'
  }
  if (agendamento.value.status === 'pendente') {
    return 'Este agendamento está pendente de confirmação.'
  }
  const inicio = new Date(`${agendamento.value.data}T${agendamento.value.hora}:00`)
  if (inicio.getTime() < horaMinima.getTime()) {
    return 'O prazo para cancelamento expirou.'
  }
  return ''
})

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

function abrirModal() {
  mensagem.value = ''
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  botaoCancelar.value?.focus()
}

function confirmarCancelamento(dados) {
  const resultado = store.cancelarAgendamento(agendamento.value.id, dados)
  modalAberto.value = false
  if (resultado.ok) {
    tipoMensagem.value = 'sucesso'
    mensagem.value = resultado.mensagem
  } else {
    tipoMensagem.value = 'erro'
    mensagem.value = resultado.erro
  }
  botaoCancelar.value?.focus()
}
</script>

<template>
  <section v-if="agendamento">
    <nav class="prev-next" aria-label="Navegação da página">
      <RouterLink class="btn btn--contorno" :to="{ name: 'home' }">← Voltar para agendamentos</RouterLink>
    </nav>

    <article class="detalhe">
      <div style="display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; align-items: flex-start">
        <h1>{{ agendamento.servico }}</h1>
        <StatusBadge :status="agendamento.status" />
      </div>

      <dl class="detalhe-definicao">
        <dt>Profissional</dt>
        <dd>{{ agendamento.profissional }}</dd>
        <dt>Data</dt>
        <dd>{{ formatarData(agendamento.data) }}</dd>
        <dt>Hora</dt>
        <dd>{{ agendamento.hora }}</dd>
      </dl>

      <p class="detalhe-aviso" :class="{ 'detalhe-aviso--erro': agendamento.status === 'cancelado' }">
        Você pode cancelar este agendamento até {{ store.prazoMinimoHoras }} horas antes do
        horário marcado.
      </p>

      <p v-if="avisoCancelamento" class="detalhe-aviso detalhe-aviso--erro">
        {{ avisoCancelamento }}
      </p>

      <button
        ref="botaoCancelar"
        type="button"
        class="btn btn--perigo-solid"
        :disabled="!podeCancelar || avisoCancelamento !== ''"
        @click="abrirModal"
      >
        Cancelar agendamento
      </button>

      <div
        v-if="mensagem"
        class="mensagem-status"
        :class="{
          'mensagem-status--sucesso': tipoMensagem === 'sucesso',
          'mensagem-status--erro': tipoMensagem === 'erro',
        }"
        role="status"
        aria-live="polite"
      >
        {{ mensagem }}
      </div>
    </article>

    <ConfirmCancelModal
      :aberto="modalAberto"
      :agendamento="agendamento"
      @confirmar="confirmarCancelamento"
      @fechar="fecharModal"
    />
  </section>

  <section v-else>
    <h1>Agendamento não encontrado</h1>
    <p class="texto-suave">Não foi possível encontrar este agendamento.</p>
    <RouterLink class="btn btn--primario" :to="{ name: 'home' }">Voltar para agendamentos</RouterLink>
  </section>
</template>