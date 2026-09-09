# AgendaFácil — Proposta de Melhoria de Interface

Protótipo funcional desenvolvido na **Sprint de Evolução de um Sistema
Interativo**, integrando as unidades curriculares de **Interface
Homem-Computador (IHC)** e **Manutenção e Configuração de Software**.

O AgendaFácil é um sistema de agendamento de atendimentos que apresentava
problemas de comunicação com o usuário e de prevenção de erros. Este
repositório contém o protótipo que materializa as melhorias propostas pela
Equipe 1 para os itens **US01** e **US04** do Product Backlog.

---

## Sumário

- [Equipe](#equipe)
- [Product Backlog](./BACKLOG.md)
- [Problema e proposta](#problema-e-proposta)
- [Conceitos de IHC aplicados](#conceitos-de-ihc-aplicados)
- [Como executar](#como-executar)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Decisão da CCB](#decisão-da-ccb)
- [Fluxo de controle de versão](#fluxo-de-controle-de-versão)
- [Versionamento](#versionamento)
- [Limitações conhecidas](#limitações-conhecidas)

---

## Equipe

Equipe 1 — Turma ADS, 4º período. Sprint Backlog: US01 e US04.

A composição da equipe está registrada na mensagem do commit inicial. O
Product Backlog completo e os critérios de aceite estão em
**[BACKLOG.md](./BACKLOG.md)**.

---

## Problema e proposta

### US01 — Ausência de confirmação de sucesso

> *"O usuário não sabe se o agendamento foi realizado com sucesso."*

**Problema.** Após enviar o formulário, o sistema não emitia nenhum sinal de
que a operação havia sido concluída. O usuário ficava sem saber se deveria
esperar, tentar de novo ou sair da tela — e a repetição do envio gerava
agendamentos duplicados.

**Conceito de IHC.** Visibilidade do status do sistema e feedback
(1ª heurística de Nielsen).

**Melhoria entregue.**
- Estado de carregamento explícito no botão durante o processamento
  (spinner + texto "Processando...", com o botão desabilitado para impedir
  envio duplicado).
- Notificação de sucesso persistente por 5 segundos, com `role="alert"` e
  `aria-live="assertive"`, anunciada também por leitores de tela.
- Redirecionamento automático para a aba "Meus agendamentos", onde o novo
  registro aparece na lista — confirmação por evidência, não só por texto.
- Caixa informativa explicando o que acontece depois da confirmação.

**Prioridade:** Alta. É o problema de maior frequência e o que mais gera
retrabalho e chamados de suporte.

### US04 — Exclusão sem confirmação

> *"O sistema permite excluir um agendamento sem solicitar confirmação."*

**Problema.** O cancelamento era disparado por um único clique, sem aviso,
sem revisão e sem possibilidade de retorno. Um toque acidental destruía o
agendamento de forma irreversível.

**Conceito de IHC.** Prevenção de erros (5ª heurística) e controle e
liberdade do usuário (3ª heurística).

**Melhoria entregue.**
- Diálogo modal de confirmação (`role="dialog"`, `aria-modal="true"`,
  `aria-labelledby` e `aria-describedby`) exibido antes de qualquer
  cancelamento.
- O diálogo mostra **qual** agendamento será cancelado — serviço, data e
  horário — para que a decisão seja tomada com a informação à vista, e não
  de memória.
- Botões com verbo explícito: **"Manter agendamento"** e **"Sim, cancelar"**.
  A recusa deliberada do par "OK / Cancelar" evita a ambiguidade de
  "cancelar o cancelamento".
- O foco inicial vai para a opção não destrutiva ("Manter agendamento"), de
  modo que o caminho padrão seja o seguro.
- Clicar fora do diálogo não o fecha: a ação exige decisão explícita.
- O agendamento cancelado permanece na lista com o status "Cancelado", em
  vez de desaparecer — o usuário enxerga o resultado da própria ação.

**Prioridade:** Alta. Menor frequência que a US01, porém impacto
irreversível para o usuário quando ocorre.

---

## Conceitos de IHC aplicados

| Conceito | Onde está no protótipo |
|---|---|
| **Feedback ao usuário** | Notificação de sucesso, estado de carregamento no botão, contador de agendamentos ativos no cabeçalho e na aba |
| **Prevenção de erros** | Diálogo de confirmação antes do cancelamento; validação por campo antes do envio; data mínima igual à data atual, bloqueando agendamento no passado |
| **Mensagens claras** | Erros específicos e acionáveis ("Selecione um profissional.", "A data não pode ser no passado."), nunca "Erro" ou "Campo inválido" |
| **Organização da navegação** | Duas abas com estado ativo visível, contador de itens e marcação semântica de painel |
| **Acessibilidade** | `label` associado a todo campo, `aria-required`, `aria-invalid`, `aria-describedby` ligando o erro ao campo, `aria-label` descritivo nos botões de ação, anel de foco de 2px visível em todos os elementos interativos, paleta monocromática que não comunica estado apenas por cor |
| **Comunicação usuário–sistema** | Rótulos com verbo em vez de "OK/Cancelar"; texto de consequência antes da ação destrutiva; canal de suporte no rodapé |

---

## Como executar

Requisitos: **Node.js 22** e **pnpm 10** (versões fixadas em `.mise.toml`).

```bash
pnpm install
pnpm dev          # servidor de desenvolvimento
pnpm build        # build de produção em dist/
pnpm preview      # serve o build gerado
```

**Stack:** React 19 · TypeScript 5.7 · Vite 8 · Tailwind CSS v4
(via `@tailwindcss/vite`, sem arquivo de configuração).

### Roteiro de demonstração

1. Aba **Novo agendamento** → envie o formulário vazio. As mensagens de
   erro aparecem por campo, e não em um alerta genérico.
2. Preencha e confirme. Observe o estado de carregamento, a notificação de
   sucesso e a mudança automática para a lista.
3. Aba **Meus agendamentos** → clique em "Cancelar agendamento". O diálogo
   abre mostrando os dados do agendamento; note que o foco está em
   "Manter agendamento".
4. Percorra a tela inteira usando apenas a tecla **Tab**, para evidenciar o
   anel de foco e a ordem de navegação.

---

## Estrutura do projeto

```
.
├── index.html          # shell do Vite com o elemento #root
├── src/
│   ├── main.tsx        # ponto de entrada; monta App e importa index.css
│   ├── App.tsx         # aplicação completa: formulário, lista,
│   │                   # diálogo de confirmação e notificações
│   └── index.css       # tokens de tema (Tailwind v4), foco e animações
├── vite.config.ts
├── package.json
└── AGENTS.md           # guia do projeto para agentes de IA
```

Os pontos em que cada conceito de IHC foi aplicado estão marcados no código
com comentários no formato `/* IHC: ... */`, para facilitar a defesa da
solução durante a apresentação.

---

## Decisão da CCB

**Solicitação de mudança.** O cliente deseja que, além de cancelar um
agendamento, o usuário possa informar o motivo do cancelamento.

**Reunião do Change Control Board — 08/09/2026.**

> **Decisão preliminar: APROVADA COM ADIAMENTO** para a versão seguinte.
> *(Confirme e ajuste esta seção conforme a decisão real da sua equipe.)*

| Critério | Análise |
|---|---|
| **Impacto no sistema** | Exige um novo campo `cancellationReason` no modelo de agendamento, persistência do valor e, futuramente, um relatório de motivos. No protótipo o impacto é baixo; em produção envolve migração de banco de dados e alteração de contrato de API. |
| **Impacto na interface** | O diálogo de confirmação deixa de ser apenas confirmatório e passa a coletar dado. Isso aumenta a carga cognitiva no exato momento em que o usuário quer uma saída rápida, e conflita com o objetivo da US04, que é reduzir atrito na decisão. Mitigação: motivo opcional, com opções pré-definidas e um campo livre. |
| **Impacto no tempo da Sprint** | A Sprint já está comprometida com US01 e US04. Incluir a mudança agora ameaça a entrega das duas histórias que resolvem os problemas mais críticos de usabilidade. |
| **Necessidade do usuário** | Legítima, porém de valor **indireto**: quem se beneficia é a empresa (dados para gestão), não o usuário final que cancela. |
| **Riscos** | Coletar motivo de forma obrigatória pode induzir abandono no meio do fluxo, ou respostas aleatórias apenas para prosseguir — dado ruim é pior que dado ausente. |

**Justificativa.** A solicitação agrega valor real e deve ser implementada,
mas não durante esta Sprint. Aceitá-la agora colocaria em risco a entrega
das US01 e US04, que atacam problemas de maior severidade para o usuário
final. A mudança foi registrada no Product Backlog para a próxima Sprint,
com a condicionante de que o motivo seja **opcional** e apresentado após a
confirmação do cancelamento, e não antes — preservando o ganho de
usabilidade conquistado na US04.

---

## Fluxo de controle de versão

```
main
 │
 └── feature/melhoria-interface
      │
      └── implementação das melhorias (US01 e US04)
           │
           └── Pull Request
                │
                └── Merge na main
```

### Primeiro push

```bash
git init
git add .
git commit -m "feat: protótipo da proposta de melhoria de interface do AgendaFácil (US01, US04)"
git branch -M main
git remote add origin git@github.com:<usuario>/agendafacil-proposta.git
git push -u origin main
git tag -a v1.0.0 -m "Primeira versão do protótipo da proposta"
git push origin v1.0.0
```

### Padrão de mensagens de commit

Convenção **Conventional Commits**, para que o histórico deixe explícita a
natureza de cada alteração:

```
feat(agendamentos): adiciona diálogo de confirmação de cancelamento (US04)
feat(agendamentos): adiciona notificação de sucesso no agendamento (US01)
fix(agendamentos): usa os dados do formulário ao criar o agendamento
docs: adiciona README com a análise de IHC da Sprint
```

### Conteúdo esperado do Pull Request

- **O que foi alterado:** diálogo de confirmação antes do cancelamento e
  notificação de sucesso após o agendamento.
- **Qual problema foi resolvido:** exclusão acidental irreversível (US04) e
  ausência de confirmação de sucesso (US01).
- **Itens do backlog relacionados:** US01 e US04.
- **Como testar:** roteiro de demonstração descrito acima.

---

## Versionamento

O projeto segue **Versionamento Semântico** no formato `MAJOR.MINOR.PATCH`.

| Componente | Quando incrementar |
|---|---|
| MAJOR | mudança incompatível, que quebra o uso existente |
| MINOR | funcionalidade nova, compatível com o que já existia |
| PATCH | correção de defeito, sem alterar funcionalidade |

**Este repositório** inicia em **`v1.0.0`** — primeira versão publicada do
protótipo da proposta.

**Sistema AgendaFácil em produção.** A versão atual é a `v1.0.0`. Uma vez
integradas as melhorias das US01 e US04, a nova versão do sistema será a
**`v1.1.0`**.

**Justificativa.** Não se trata de `v1.0.1`: as alterações não corrigem um
defeito de implementação, e sim introduzem **comportamento novo** — uma
etapa de confirmação que antes não existia e um mecanismo de feedback que
antes não existia. Também não se trata de `v2.0.0`: nenhum fluxo existente
foi quebrado nem removido, o usuário continua conseguindo agendar e
cancelar da mesma forma, apenas com mais segurança e informação. Portanto,
incremento de **MINOR**, mantendo MAJOR e zerando PATCH: **`v1.1.0`**.

---

## Limitações conhecidas

Registradas de forma transparente como candidatas ao Backlog da próxima
Sprint:

1. **O agendamento criado não usa os dados do formulário.** Em
   `src/App.tsx`, a função `handleBooked()` insere um registro fixo em vez
   de aproveitar os valores preenchidos. A validação funciona, mas o dado
   escolhido é descartado. **Corrigir antes da apresentação.**
2. **A tecla `Esc` não fecha o diálogo de confirmação.** Falta o listener de
   teclado e o retorno do foco ao botão que abriu o diálogo. Sem isso, o
   usuário de teclado não tem saída rápida — o que enfraquece justamente a
   heurística de controle e liberdade que a US04 pretende reforçar.
3. **Não existe "desfazer".** O cancelamento é definitivo assim que
   confirmado. Um mecanismo de desfazer com janela de alguns segundos daria
   reversibilidade real, e não apenas prevenção.
4. **Mensagem inconsistente.** O diálogo afirma que "esta ação não pode ser
   desfeita", mas a notificação seguinte convida a "reagendar a qualquer
   momento", e o reagendamento ainda não existe no sistema. Alinhar os dois
   textos ao comportamento real.
5. **Marcação de abas incompleta.** Os botões usam `role="tab"` sem um
   elemento com `role="tablist"` ao redor, o que impede o leitor de tela de
   anunciar a posição ("aba 1 de 2").
6. **Contraste do selo "Cancelado".** A combinação de cinzas fica em torno
   de 3,9:1, abaixo dos 4,5:1 exigidos pela WCAG para texto normal.
7. **`prefers-reduced-motion` não é respeitado.** As animações de entrada
   são executadas mesmo para quem pediu redução de movimento no sistema
   operacional.
8. **Sem persistência.** Os dados vivem apenas em memória e são perdidos ao
   recarregar a página — comportamento esperado para um protótipo de
   avaliação, não para produção.

---

*Projeto acadêmico. Sem fins comerciais.*
