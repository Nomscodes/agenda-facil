# Product Backlog — Sprint de Evolução do AgendaFácil

**Equipe 1**
**Turma:** ADS — 4º período
**Unidades curriculares:** Interface Homem-Computador (IHC) + Manutenção e
Configuração de Software
**Sprint:** 08/09/2026

---

## Integrantes da Equipe 1

| # | Integrante |
|---|---|
| 1 | Jurandir Marques |
| 2 | Salmuel da Silva |
| 3 | Gabriel Naoki |
| 4 | Caio Nunes |
| 5 | Felipi Vieira |
| 6 | Gustavo Fernandes |
| 7 | Enzo Aquino |
| 8 | João Victor do Santos |
| 9 | William Mariano |
| 10 | Cassiano Nunes |
| 11 | Guilherme Silva |
| 12 | Jordana |
| 13 | Ian Borges |
| 14 | Lucio Souza |

### Papéis Scrum

| Papel | Responsável |
|---|---|
| Product Owner | *(preencher)* |
| Scrum Master | *(preencher)* |
| Equipe de Desenvolvimento | demais integrantes |

---

## Product Backlog completo

Solicitações recebidas pela empresa, distribuídas entre as três equipes.

| ID | Solicitação | Equipe |
|---|---|---|
| **US01** | O usuário não sabe se o agendamento foi realizado com sucesso. | **Equipe 1** |
| US02 | Pessoas com dificuldade visual encontram problemas para utilizar o sistema. | Equipe 2 |
| US03 | O menu possui muitas opções e os usuários não conseguem encontrar rapidamente as principais funcionalidades. | Equipe 3 |
| **US04** | O sistema permite excluir um agendamento sem solicitar confirmação. | **Equipe 1** |
| US05 | A empresa solicitou uma nova funcionalidade para permitir o cancelamento de agendamentos. | Equipe 2 |
| US06 | A tela de login apresenta mensagens de erro pouco claras. | Equipe 3 |

---

## Sprint Backlog da Equipe 1

Itens comprometidos para esta Sprint: **US01** e **US04**.

### US01 — Confirmação de sucesso do agendamento

> Como usuário do AgendaFácil, quero receber uma confirmação clara após
> agendar um atendimento, para ter certeza de que a operação foi concluída
> e não precisar tentar de novo.

| Campo | Conteúdo |
|---|---|
| **Prioridade** | Alta — 1º item da Sprint |
| **Problema** | Após enviar o formulário, o sistema não emitia nenhum sinal de conclusão. O usuário não sabia se devia esperar, repetir a ação ou sair da tela, o que gerava agendamentos duplicados. |
| **Conceito de IHC** | Visibilidade do status do sistema e feedback (1ª heurística de Nielsen) |
| **Melhoria proposta** | Estado de carregamento explícito durante o processamento, notificação de sucesso anunciada também por leitor de tela, e redirecionamento para a lista onde o novo agendamento aparece. |

**Critérios de aceite**

- [x] O botão de confirmação exibe estado de carregamento e fica desabilitado durante o envio, impedindo envio duplicado.
- [x] Ao concluir, o sistema exibe mensagem de sucesso explícita, com `role="alert"` e `aria-live="assertive"`.
- [x] O usuário é levado à lista de agendamentos, onde vê o registro criado.
- [x] O contador de agendamentos ativos é atualizado.

**Justificativa da prioridade.** É o problema de maior frequência: atinge
todo usuário em toda tentativa de agendamento, e o retrabalho que provoca
(agendamentos duplicados) gera custo para a empresa.

### US04 — Confirmação antes de excluir um agendamento

> Como usuário do AgendaFácil, quero que o sistema peça confirmação antes de
> excluir um agendamento, para não perder um atendimento por um clique
> acidental.

| Campo | Conteúdo |
|---|---|
| **Prioridade** | Alta — 2º item da Sprint |
| **Problema** | A exclusão era disparada por um único clique, sem aviso, sem revisão e sem retorno. Um toque acidental destruía o agendamento de forma irreversível. |
| **Conceito de IHC** | Prevenção de erros (5ª heurística) e controle e liberdade do usuário (3ª heurística) |
| **Melhoria proposta** | Diálogo modal de confirmação exibindo os dados do agendamento, com rótulos de botão explícitos e foco inicial na opção não destrutiva. |

**Critérios de aceite**

- [x] Nenhum agendamento é excluído sem confirmação explícita do usuário.
- [x] O diálogo mostra qual agendamento será excluído: serviço, data e horário.
- [x] Os botões usam verbo explícito — "Manter agendamento" e "Sim, cancelar" — em vez de "OK / Cancelar".
- [x] O foco inicial vai para a opção não destrutiva.
- [x] Clicar fora do diálogo não o fecha: a decisão precisa ser explícita.
- [x] O diálogo usa `role="dialog"`, `aria-modal`, `aria-labelledby` e `aria-describedby`.
- [ ] A tecla `Esc` fecha o diálogo mantendo o agendamento. *(pendente — ver Limitações no README)*

**Justificativa da prioridade.** Frequência menor que a US01, porém impacto
irreversível quando ocorre: o usuário perde o atendimento e precisa
reagendar, quando ainda houver vaga.

---

## Definição de Pronto (DoD)

Um item só é considerado concluído quando:

1. A melhoria está implementada e funcionando no protótipo.
2. O conceito de IHC aplicado está marcado no código com comentário `/* IHC: ... */`.
3. A alteração está registrada em commit com mensagem clara referenciando o item do backlog.
4. O item está documentado no README com problema, conceito e solução.

---

## Solicitação de mudança registrada

| ID | Solicitação | Origem | Situação |
|---|---|---|---|
| CM-01 | Permitir que o usuário informe o motivo do cancelamento | Cliente, durante a Sprint | Aprovada com adiamento pela CCB — **implementada na V2** |

A análise de impacto e a justificativa da decisão estão registradas no
[README, seção "Decisão da CCB"](./README.md#decisão-da-ccb).

---

## Backlog da próxima Sprint

Itens levantados durante esta Sprint e ainda não implementados:

| ID | Item | Origem | Situação |
|---|---|---|---|
| CM-01 | Motivo do cancelamento (opcional) | CCB | ✅ Entregue na V2 |
| TD-01 | Usar os dados do formulário ao criar o agendamento | Limitação identificada | ✅ Entregue na V2 |
| TD-02 | Fechar o diálogo com a tecla `Esc` e devolver o foco ao botão de origem | Limitação identificada | Pendente |
| TD-03 | Mecanismo de desfazer o cancelamento | Melhoria de reversibilidade | Pendente |
| TD-04 | Corrigir contraste do selo "Cancelado" para atingir 4,5:1 | Acessibilidade | Pendente |
| TD-05 | Respeitar `prefers-reduced-motion` nas animações | Acessibilidade | Pendente |

---

## V2 — Implementação da mudança aprovada pela CCB

Entregue na branch `V2`, a partir da branch `feature`.

### CM-01 — Motivo do cancelamento

> Como gestor da clínica, quero saber por que os agendamentos são
> cancelados, para identificar padrões e reduzir cancelamentos.

**Critérios de aceite**

- [x] O diálogo de cancelamento apresenta um campo "Motivo do cancelamento".
- [x] O campo é **opcional**, conforme a condicionante registrada pela CCB — não bloqueia o cancelamento e não aumenta o atrito da decisão.
- [x] Limite de 250 caracteres, com contador de caracteres restantes anunciado por `aria-live="polite"`.
- [x] O contador muda de cor ao se aproximar do limite, avisando antes do erro em vez de depois.
- [x] O motivo informado é exibido no card do agendamento cancelado.

**Conceito de IHC.** Prevenção de erros (limite com aviso antecipado) e
comunicação usuário–sistema (o dado informado retorna visível ao usuário,
em vez de desaparecer no sistema).

### TD-01 — Correção do agendamento criado

O formulário validava os campos corretamente, mas a função `handleBooked`
descartava os valores preenchidos e inseria sempre um registro fixo. A V2
passa os dados do formulário para a lista, de modo que o agendamento criado
corresponde ao que o usuário escolheu.
