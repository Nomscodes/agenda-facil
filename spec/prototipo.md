# Especificação do Protótipo — AgendaFácil

> **Grupo 2 — ADS 4º período**
> **Unidades Curriculares:** IHC + Manutenção e Configuração de Software
> **Tecnologia:** Vue.js 3

---

## 1. Visão Geral

O protótipo cobre as duas user stories da Sprint, incluindo a mudança **SM-001** aprovada com ressalvas pela CCB (registro opcional do motivo do cancelamento):

| Item | Objetivo |
|------|----------|
| **US02** | Interface acessível (WCAG 2.2 nível AA) para pessoas com dificuldade visual |
| **US05** | Cancelamento de agendamentos com confirmação segura e feedback explícito |
| **SM-001** | Campo opcional de motivo do cancelamento (lista pré-definida + texto livre apenas em "outro") |

---

## 2. Stack Tecnológica

| Tecnologia | Uso |
|------------|-----|
| **Vue.js 3** (Composition API + `<script setup>`) | Framework front-end |
| **Vite** | Build tool e dev server |
| **Vue Router** | Navegação entre telas |
| **Pinia** (opcional) | Estado global (agendamentos, status, histórico) |
| **CSS customizado** | Estilização focada em acessibilidade e contraste |
| **HTML semântico** | `<header>`, `<nav>`, `<main>`, `<dialog>`, formulários com `<label>` |

---

## 3. Estrutura de Pastas

```
agenda-facil/
└── src/
    ├── main.js
    ├── App.vue
    ├── routers/
    │   └── index.js
    ├── stores/                 # Pinia
    │   └── agendamentos.js
    ├── components/
    │   ├── AppHeader.vue        # Barra superior (contraste, fonte, acessibilidade)
    │   ├── AppFooter.vue
    │   ├── AgendamentoCard.vue
    │   ├── StatusBadge.vue      # Status com cor + ícone + texto
    │   └── ConfirmCancelModal.vue
    ├── views/
    │   ├── HomeView.vue         # Lista de agendamentos
    │   └── DetailView.vue       # Detalhe do agendamento + cancelamento
    └── assets/
        ├── styles/
        │   └── main.css         # Variáveis de contraste, temas, fontes
        └── icons/               # SVG com aria-hidden / título
```

---

## 4. Funcionalidades

### 4.1 US02 — Acessibilidade

| Requisito | Implementação no protótipo |
|-----------|----------------------------|
| Contraste 4,5:1 (texto) / 3:1 (UI) | Paleta de cores definida por variáveis CSS testadas no contraste checker |
| Tipografia base 16px + zoom 200% | `font-size: 16px` no `html`; layout fluido com `rem` e `flex/grid` responsivos |
| Status não só por cor | Componente `StatusBadge` renderiza cor **+** ícone **+** texto ("Confirmado"/"Cancelado") |
| Navegação por teclado | Ordem de `tabindex` lógica; foco visível com `:focus-visible` bebordado |
| Alvos mínimos 24×24px | `min-width/min-height` nos botões e links clicáveis |
| Rótulos associados | Todo `<input>` possui `<label>` com `for`/`id` correspondentes |
| Ícones com alternativa textual | SVG informativos com `<title>`; decorativos com `aria-hidden="true"` |
| Mensagens dinâmicas anunciadas | `aria-live="polite"`/`assertive` em feedbacks de sucesso e erro |
| Ajuste de fonte e alto contraste | Botões no `AppHeader` (A+/A- e tema de alto contraste) |

### 4.2 US05 — Cancelamento de agendamento

| Requisito | Implementação no protótipo |
|-----------|----------------------------|
| Botão "Cancelar agendamento" | Presente em `DetailView`, com rótulo textual |
| Modal de confirmação | `ConfirmCancelModal` exibe data, hora, serviço e profissional |
| Rótulos específicos | "Sim, cancelar agendamento" / "Não, manter agendamento" |
| Ação destrutiva não é padrão | Foco inicial no botão "Não, manter agendamento" |
| Feedback de sucesso | Status muda para "Cancelado" + mensagem `role="status"` / `aria-live="polite"` com opção **"Desfazer"** |
| Regra de negócio visível | Aviso de prazo (ex.: até 2h antes) exibido antes da tentativa |
| Registro no histórico | Ação dispara update no store `agendamentos` (status + data do cancelamento) |
| Motivo opcional (SM-001) | Lista pré-definida (imprevisto, remarcação, problema de saúde, outro) + texto livre exibido apenas quando "outro"; **não bloqueia** o cancelamento se não for informado |

---

## 5. Telas (Views)

### 5.1 HomeView — Lista de agendamentos

- Lista de `AgendamentoCard` com: serviço, profissional, data/hora e `StatusBadge`;
- Filtros (se aplicável) com rótulos claros e acessíveis;
- Navegação por link/teclado para a tela de detalhe.

### 5.2 DetailView — Detalhe do agendamento

- Dados completos do agendamento;
- Regra de negócio do prazo de cancelamento informada ("Você pode cancelar até 2 horas antes");
- Botão **"Cancelar agendamento"**;
- Em caso de sucesso: status "Cancelado" + feedback acessível (`role="status"`) com opção **"Desfazer"**.

---

## 6. Modal de Confirmação (`ConfirmCancelModal`)

Fluxo do cancelamento (inclui SM-001):

1. Usuário clica em **"Cancelar agendamento"**;
2. Modal abre com `role="dialog"` + `aria-modal="true"`;
3. Conteúdo: resumo do agendamento (data, hora, serviço, profissional) e aviso do prazo;
4. Campo **"Motivo do cancelamento (opcional)"**: seleção pré-definida (imprevisto, remarcação, problema de saúde, outro) + texto livre apenas quando "outro" — associado por `aria-describedby`;
5. Botões:
   - **"Não, manter agendamento"** (botão seguro — recebe o foco inicial);
   - **"Sim, cancelar agendamento"**;
6. Confirmação → status atualizado para "Cancelado" + mensagem com `role="status"` / `aria-live="polite"` e opção **"Desfazer"**;
7. Modal fecha com `Esc` ou botão de fechar (com texto alternativo).

> **SM-001 (decisão da CCB):** o motivo é **opcional** — não bloqueia o cancelamento caso o usuário opte por não informar.

---

## 7. Especificação Visual

| Elemento | Valor |
|----------|-------|
| Texto principal | `#1A1A1A` sobre `#FFFFFF` (contraste de 17:1) |
| Botão destrutivo | `#B3261E` com texto branco (contraste de 5,9:1). **Não utilizar vermelho claro** |
| Tipografia | Base de 16px, títulos de 20px, altura de linha de 1,5 |
| Botões | Altura mínima de 44px, com espaçamento de 12px entre eles |
| Foco | Contorno de 2px em `#0B57D0`, com deslocamento de 2px, visível em todos os elementos interativos |
| Overlay do modal | `rgba(0,0,0,0.5)` — o modal não deve depender apenas da sombra para se destacar |

---

## 8. Critérios de Aceite

- [ ] Contraste 4,5:1 para texto normal e 3:1 para componentes;
- [ ] Alinhamento com WCAG 2.2 AA (critérios 1.1.1, 1.4.1, 1.4.3, 1.4.4, 1.4.11, 2.1.1, 2.4.7, 2.5.8, 3.3.2);
- [ ] Navegação e cancelamento 100% operáveis por teclado;
- [ ] Status de agendamento sempre representado por cor + ícone + texto;
- [ ] Cancelamento exige confirmação com dados do agendamento;
- [ ] Foco inicial do modal no botão seguro;
- [ ] Feedback de sucesso visível e anunciado por leitor de tela, com opção "Desfazer";
- [ ] Prazo mínimo de cancelamento informado antes da ação;
- [ ] Campo de motivo opcional (SM-001) com lista pré-definida e texto livre condicionado a "outro";
- [ ] Cancelamento registrado no histórico (store).

---

## 9. Definir de Pronto (DoD)

- Protótipo roda com `npm run dev` (Vite);
- Implementado com Vue.js 3 na branch `feature/us05-cancelamento-agendamento`;
- Validado no teclado e com extensão de contraste (ex.: axe / Lighthouse);
- Pull Request revisado e mergeado em `main` (merge `--no-ff`), referenciando **US05**, **US02** e **SM-001**.