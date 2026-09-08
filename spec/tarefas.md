# Plano de Tarefas — Implementação do Protótipo

> **Grupo 2 — ADS 4º período**
> **Projeto:** AgendaFácil
> **Tecnologia:** Vue.js 3
> **Escopo:** US02 (Acessibilidade) + US05 (Cancelamento de agendamentos) + SM-001 (motivo do cancelamento, aprovado pela CCB)
> **Branch de trabalho:** `feature/us05-cancelamento-agendamento`

---

## 1. Visão Geral

As tarefas abaixo organizam a implementação do protótipo em fases, com ordem sugerida e dependências. Cada tarefa possui critérios mínimos de aceite. A mudança **SM-001** foi aprovada pela CCB com ressalvas: apenas o registro opcional do motivo entra na Sprint — relatórios e análise estatística ficam para a versão seguinte.

---

## 2. Quadro de Tarefas

| # | Fase | Tarefa | Responsável | Depende de | Critério para concluir |
|---|------|--------|-------------|------------|------------------------|
| 1 | Configuração (Git) | Criar branch `feature/us05-cancelamento-agendamento` a partir de `main` | Configuração | — | Branch criada e branch atual confirmada com `git branch` |
| 2 | Configuração (Setup) | Inicializar projeto Vue.js 3 com Vite | Configuração | 1 | `npm run dev` abre o app; push da branch inicial |
| 3 | Configuração (Deps) | Instalar Vue Router e Pinia | Configuração | 2 | Dependências no `package.json`; import sem erros |
| 4 | Configuração (Git) | Definir convenção Conventional Commits e comunicar à equipe | Configuração | 1 | Convenção documentada no README ou no repo |
| 5 | IHC (Base) | Criar `main.css` com paleta AA (`#1A1A1A`/`#FFFFFF`, destrutivo `#B3261E`, foco `#0B57D0`) e tipografia base 16px | IHC | 2 | Variáveis de tema definidas; teste de contraste 4,5:1 documentado |
| 6 | IHC (Base) | Implementar tema de alto contraste (toggle) e botões A+/A- de fonte | IHC | 5 | Troca de tema e ajuste de fonte funcionam no `AppHeader` |
| 7 | IHC (Layout) | Criar `AppHeader` e `AppFooter` com HTML semântico e navegação por teclado | IHC | 5 | Header/Footer renderizados; percorríveis por `Tab` |
| 8 | Configuração (Router) | Criar rotas: `/` (HomeView) e `/agendamento/:id` (DetailView) | Configuração | 3, 7 | Navegação entre as duas telas via Vue Router |
| 9 | IHC (Store) | Criar store Pinia `agendamentos` com dados mock e ações de update | Configuração/IHC | 3 | Store populada; ler dados em componente |
| 10 | IHC (Componente) | Criar `StatusBadge` (cor + ícone + texto) com `aria-label` e contraste AA | IHC | 5 | Badge exibe "Confirmado"/"Cancelado" como texto visível |
| 11 | IHC (Componente) | Criar `AgendamentoCard` com rótulos, `:focus-visible` e alvos ≥ 24×24px | IHC | 10 | Card clicável por teclado e exibição de status acessível |
| 12 | IHC (View) | Montar `HomeView` (lista de agendamentos) | IHC | 9, 11 | Lista renderiza com agendamentos e navegação para detalhe |
| 13 | IHC (View) | Montar `DetailView` (dados, regra de prazo de cancelamento e botão "Cancelar agendamento") | IHC | 9, 12 | Tela mostra dados e regra de negócio antes da ação |
| 14 | IHC (Acessibilidade) | Revisar formulários/campos com `<label>` associado, `aria-live` e `aria-describedby` | IHC | 12, 13 | Campos com rótulos; feedback dinâmico anunciado |
| 15 | IHC (Componente) | Criar `ConfirmCancelModal` com resumo do agendamento e botões "Sim, cancelar agendamento" / "Não, manter agendamento" | IHC | 13 | Modal abre, exibe dados e rótulos específicos |
| 16 | Configuração (BD) | Script de migração: colunas `motivo_cancelamento` (enumerado) e `motivo_descricao` (texto), ambas aceitando nulo e com rollback | Configuração | 3 | Script aplicado e reversível; colunas anuláveis |
| 17 | IHC (SM-001) | Campo "Motivo do cancelamento (opcional)" no modal: lista pré-definida (imprevisto, remarcação, problema de saúde, outro) + texto livre apenas em "outro"; sem bloqueio se não informado | IHC | 15, 16 | Motivo selecionável ou ignorado, sem impedir o cancelamento; `aria-describedby` associado |
| 18 | IHC (Fluxo) | Implementar foco inicial no botão seguro do modal e fechamento com `Esc` | IHC | 15 | Foco inicia em "Não, manter agendamento"; `Esc` fecha |
| 19 | IHC (Fluxo) | Implementar ação de cancelamento: validação do prazo, persistência do motivo, update do status para "Cancelado" e registro no histórico | IHC + Configuração | 17, 18 | Store atualiza status e motivo; histórico registrado |
| 20 | IHC (Fluxo) | Feedback de sucesso: mensagem `role="status"` / `aria-live="polite"` com opção **"Desfazer"** | IHC | 19 | Leitor de tela anuncia a confirmação; "Desfazer" reverte o status |
| 21 | IHC (Teste) | Validar contraste (Lighthouse/axe), zoom 200%, navegação 100% por teclado e o modal com o novo campo (SM-001) | IHC | 20 | Auditorias sem erros críticos de acessibilidade (reteste pós-SM-001) |
| 22 | Configuração (Git) | Commit em etapas (tarefas concluídas) seguindo a convenção, incluindo a migração | Configuração | 4 | Histórico com commits atômicos e mensagens claras |
| 23 | Configuração (Git) | Abrir Pull Request para `main` com descrição das entregas (US05, US02, SM-001) | Configuração | 21, 22 | PR criado com descrição e checks passando |
| 24 | Equipe (Review) | Revisão do PR (acessibilidade, fluxo de cancelamento e campo de motivo) + merge `--no-ff` em `main` | Todos | 23 | Merge concluído; `main` atualizada com nó de merge |
| 25 | Configuração (Docs) | Criar tag `v1.1.0` e atualizar README/spec com o status da Equipe 2 | Configuração | 24 | README reflete o avanço; tag v1.1.0 registrada |

---

## 3. Ordem Recomendada (visão resumida)

```
Configuração inicial (1 → 4)
        ↓
Base de estilos e componentes (5 → 7)
        ↓
Router + Store (8 → 9)
        ↓
Componentes e telas (10 → 13)
        ↓
Acessibilidade e modal de cancelamento (14 → 18)
        ↓
Fluxo completo com SM-001 + feedback (17, 19 → 20)
        ↓
Validação e testes (21)
        ↓
Versionamento, PR, merge e docs (22 → 25)
```

---

## 4. Convenção de Commits

| Tipo | Uso |
|------|-----|
| `feat` | Nova funcionalidade (ex.: `feat(agendamento): ...`) |
| `fix` | Correção de bug |
| `style` | Ajuste de estilos/contraste |
| `refactor` | Mudança de estrutura sem alterar comportamento |
| `docs` | Atualização de documentação |
| `chore` | Configuração de projeto (Vite, deps, git, migração) |

Exemplo de commit (Conventional Commits, assunto no imperativo, até 50 caracteres):

```
feat(agendamento): adiciona cancelamento com confirmacao e motivo

Implementa o cancelamento de agendamentos pelo proprio usuario,
com modal de confirmacao acessivel (WCAG 2.2 AA), feedback de
sucesso via aria-live e campo opcional de motivo aprovado pela
CCB (SM-001).

Resolve: US05
Refs: US02, SM-001
```

---

## 5. Observações

- Todo trabalho é feito na branch `feature/us05-cancelamento-agendamento`; `main` só recebe conteúdo via Pull Request com merge `--no-ff`;
- A ação destrutiva exige confirmação explícita e o campo de motivo (SM-001) é opcional, sem bloqueio do cancelamento;
- A emissão se baseia em valor de negócio: o cancelamento é funcionalidade nova e retrocompatível → incremento **MINOR**, release **v1.1.0** (tag);
- Tarefas de IHC e Configuração podem rodar em paralelo quando não houver dependência.