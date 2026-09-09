import { defineStore } from 'pinia'

const PRAZO_MINIMO_HORAS = 2

function toDateKey(agendamento) {
  return new Date(`${agendamento.data}T${agendamento.hora}:00`)
}

export const useAgendamentosStore = defineStore('agendamentos', {
  state: () => ({
    prazoMinimoHoras: PRAZO_MINIMO_HORAS,
    agendamentos: [
      {
        id: 1,
        servico: 'Corte de cabelo',
        profissional: 'Carlos Mendes',
        data: '2026-09-09',
        hora: '09:00',
        status: 'confirmado',
      },
      {
        id: 2,
        servico: 'Manicure e pedicure',
        profissional: 'Juliana Prado',
        data: '2026-09-10',
        hora: '14:30',
        status: 'confirmado',
      },
      {
        id: 3,
        servico: 'Barba e sobrancelha',
        profissional: 'Roberto Lima',
        data: '2026-09-12',
        hora: '10:15',
        status: 'confirmado',
      },
      {
        id: 4,
        servico: 'Massagem relaxante',
        profissional: 'Ana Beatriz',
        data: '2026-09-08',
        hora: '09:00',
        status: 'cancelado',
      },
      {
        id: 5,
        servico: 'Limpeza de pele',
        profissional: 'Fernanda Costa',
        data: '2026-09-15',
        hora: '16:45',
        status: 'confirmado',
      },
    ],
    historico: [
      {
        agendamentoId: 4,
        tipo: 'cancelamento',
        em: '2026-09-06T18:05:00',
      },
    ],
  }),

  getters: {
    getById: (state) => (id) => {
      const parsed = Number(id)
      return state.agendamentos.find((a) => a.id === parsed)
    },
  },

  actions: {
    podeCancelar(id) {
      const agendamento = this.getById(id)
      if (!agendamento || agendamento.status === 'cancelado') return false
      const diffMs = toDateKey(agendamento).getTime() - Date.now()
      return diffMs > this.prazoMinimoHoras * 60 * 60 * 1000
    },

    cancelarAgendamento(id, dadosCancelamento = {}) {
      const agendamento = this.getById(id)
      if (!agendamento) {
        return { ok: false, erro: 'Agendamento não encontrado.' }
      }
      if (agendamento.status === 'cancelado') {
        return { ok: false, erro: 'Este agendamento já foi cancelado.' }
      }
      if (!this.podeCancelar(id)) {
        return {
          ok: false,
          erro: `Não é possível cancelar: o prazo mínimo é de ${this.prazoMinimoHoras} horas antes do horário agendado.`,
        }
      }
      const motivo = dadosCancelamento.motivo || null
      const descricao = dadosCancelamento.descricao || null
      agendamento.status = 'cancelado'
      agendamento.motivo_cancelamento = motivo
      agendamento.motivo_descricao = descricao
      this.historico.push({
        agendamentoId: agendamento.id,
        tipo: 'cancelamento',
        em: new Date().toISOString(),
        motivo,
        descricao,
      })
      return { ok: true, mensagem: 'Agendamento cancelado com sucesso.' }
    },
  },
})