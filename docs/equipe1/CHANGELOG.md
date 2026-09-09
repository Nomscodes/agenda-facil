# Changelog — AgendaFácil (Equipe 1)

Todas as alterações relevantes deste projeto são registradas neste arquivo.

O versionamento segue **MAJOR.MINOR.PATCH** (Versionamento Semântico):

| Componente | Quando incrementar |
|---|---|
| MAJOR | mudança incompatível, que quebra o uso existente |
| MINOR | funcionalidade nova, compatível com o que já existia |
| PATCH | correção de defeito, sem alterar funcionalidade |

---

## [1.2.0] — 08/09/2026 — branch `V2`

Implementação da solicitação de mudança aprovada pela CCB.

### Adicionado
- **CM-01** — Campo "Motivo do cancelamento" no diálogo de confirmação.
  Opcional, conforme a condicionante registrada pela CCB, com limite de 250
  caracteres e contador de caracteres restantes anunciado por
  `aria-live="polite"`.
- Exibição do motivo informado no card do agendamento cancelado.

### Corrigido
- **TD-01** — `handleBooked()` descartava os valores preenchidos no
  formulário e inseria sempre um registro fixo. Passou a usar os dados
  escolhidos pelo usuário.

### Por que MINOR e não MAJOR
O motivo do cancelamento é **opcional**: nenhum fluxo anterior deixou de
funcionar e quem já usava o sistema continua cancelando exatamente como
antes. Não houve quebra de compatibilidade, portanto incrementa-se MINOR,
não MAJOR. Também não é PATCH, porque não se trata apenas de correção — há
funcionalidade nova. A branch chama-se `V2` como rótulo de trabalho da
segunda entrega, o que não corresponde a uma versão 2.0.0.

---

## [1.1.0] — 08/09/2026 — branch `feature`

Entrega das duas histórias do Sprint Backlog da Equipe 1.

### Adicionado
- **US01** — Confirmação de sucesso do agendamento: estado de carregamento
  explícito durante o envio, notificação com `role="alert"` e `aria-live`,
  e redirecionamento para a lista onde o novo registro aparece.
- **US04** — Confirmação antes de excluir um agendamento: diálogo modal
  exibindo serviço, data e horário, com rótulos de botão explícitos
  ("Manter agendamento" / "Sim, cancelar") e foco inicial na opção não
  destrutiva.
- Documentação da Sprint: `README.md` e `BACKLOG.md`.

### Por que MINOR
As alterações não corrigem defeito de implementação: introduzem
comportamento novo — uma etapa de confirmação e um mecanismo de feedback
que antes não existiam. Nenhum fluxo existente foi quebrado ou removido.

---

## [1.0.0] — versão de origem

Sistema AgendaFácil conforme recebido no início da Sprint, com os problemas
de interface descritos no Product Backlog:

- o usuário não sabia se o agendamento havia sido realizado (US01);
- a exclusão de um agendamento ocorria sem qualquer confirmação (US04).

---

## Pendências para a próxima versão

| ID | Item | Tipo previsto |
|---|---|---|
| TD-02 | Fechar o diálogo com `Esc` e devolver o foco ao botão de origem | PATCH |
| TD-03 | Mecanismo de desfazer o cancelamento | MINOR |
| TD-04 | Corrigir contraste do selo "Cancelado" para atingir 4,5:1 | PATCH |
| TD-05 | Respeitar `prefers-reduced-motion` nas animações | PATCH |
