<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  aberto: {
    type: Boolean,
    default: false,
  },
  agendamento: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['confirmar', 'fechar'])

const modalEl = ref(null)
const botaoSeguro = ref(null)

const tituloId = 'modal-titulo'
const resumoId = 'modal-resumo'
const motivoHelpId = 'motivo-ajuda'

const motivos = [
  { valor: 'imprevisto', rotulo: 'Imprevisto' },
  { valor: 'remarcacao', rotulo: 'Remarcação' },
  { valor: 'saude', rotulo: 'Problema de saúde' },
  { valor: 'outro', rotulo: 'Outro' },
]

const motivo = ref('')
const descricao = ref('')

function limpar() {
  motivo.value = ''
  descricao.value = ''
}

function alvosFocavel() {
  if (!modalEl.value) return []
  return Array.from(
    modalEl.value.querySelectorAll(
      'button:not([disabled]), select:not([disabled]), textarea:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null)
}

function voltarFoco() {
  nextTick(() => {
    botaoSeguro.value?.focus()
  })
}

watch(
  () => props.aberto,
  (aberto) => {
    if (aberto) {
      limpar()
      modalEl.value?.focus()
      voltarFoco()
    }
  },
)

function aoKeydown(evento) {
  if (!props.aberto) return
  if (evento.key === 'Escape') {
    evento.preventDefault()
    fechar()
    return
  }
  if (evento.key === 'Tab') {
    const alvos = alvosFocavel()
    if (!alvos.length) return
    const primeiro = alvos[0]
    const ultimo = alvos[alvos.length - 1]
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault()
      ultimo.focus()
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault()
      primeiro.focus()
    }
  }
}

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

function confirmar() {
  emit('confirmar', {
    motivo: motivo.value || null,
    descricao: motivo.value === 'outro' ? descricao.value || null : null,
  })
}

function fechar() {
  limpar()
  emit('fechar')
}
</script>

<template>
  <div
    v-if="aberto"
    class="modal-overlay"
    @click.self="fechar"
  >
    <div
      ref="modalEl"
      class="modal"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="tituloId"
      :aria-describedby="resumoId"
      tabindex="-1"
      @keydown="aoKeydown"
    >
      <h2 :id="tituloId" class="modal__titulo">Cancelar agendamento</h2>

      <div :id="resumoId" class="modal__resumo">
        <p class="texto-suave">Confira os dados antes de confirmar:</p>
        <dl class="detalhe-definicao">
          <dt>Serviço</dt>
          <dd>{{ agendamento.servico }}</dd>
          <dt>Profissional</dt>
          <dd>{{ agendamento.profissional }}</dd>
          <dt>Data</dt>
          <dd>{{ formatarData(agendamento.data) }}</dd>
          <dt>Hora</dt>
          <dd>{{ agendamento.hora }}</dd>
        </dl>
        <p class="detalhe-aviso">Esta ação não pode ser desfeita.</p>
      </div>

      <div class="modal__campo">
        <label for="motivo-cancelamento">Motivo do cancelamento (opcional)</label>
        <select
          id="motivo-cancelamento"
          v-model="motivo"
          :aria-describedby="motivoHelpId"
        >
          <option value="">Selecione um motivo</option>
          <option v-for="opcao in motivos" :key="opcao.valor" :value="opcao.valor">
            {{ opcao.rotulo }}
          </option>
        </select>
        <p :id="motivoHelpId" class="texto-suave modal__ajuda">
          Essa informação nos ajuda a melhorar o atendimento.
        </p>
      </div>

      <div v-if="motivo === 'outro'" class="modal__campo">
        <label for="motivo-descricao">Descreva o motivo (opcional)</label>
        <textarea
          id="motivo-descricao"
          v-model="descricao"
          rows="3"
        ></textarea>
      </div>

      <div class="modal__acoes">
        <button
          ref="botaoSeguro"
          type="button"
          class="btn btn--contorno"
          @click="fechar"
        >
          Não, manter agendamento
        </button>
        <button
          type="button"
          class="btn btn--perigo-solid"
          @click="confirmar"
        >
          Sim, cancelar agendamento
        </button>
      </div>

      <button
        type="button"
        class="screen-reader"
        aria-label="Fechar janela de cancelamento"
        @click="fechar"
      >
        Fechar
      </button>
    </div>
  </div>
</template>