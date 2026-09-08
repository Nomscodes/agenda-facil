# Sprint de Evolução do Sistema Interativo — AgendaFácil

> **Grupo 2 — ADS 4º período**
> **Unidades Curriculares:** IHC + Manutenção e Configuração de Software
> **Itens do Sprint Backlog:** US02 e US05
> **Solicitação de mudança avaliada pela CCB:** SM-001 (incide sobre o US05)

---

## 1. Organização da Equipe

A equipe foi organizada nos seguintes papéis, sendo que todos os integrantes participaram das decisões tomadas durante a Sprint:

| Papel | Integrante | Responsabilidade na Sprint |
|-------|------------|---------------------------|
| Product Owner | Ítalo Schimitel | Apresenta e prioriza as necessidades dos usuários; representa o cliente na reunião da CCB |
| Scrum Master | Pedro Henrique Feitosa | Conduz a Sprint, controla o tempo e media a reunião da CCB |
| Equipe de Desenvolvimento (IHC) | Fernando Papacosta, Lucas Mendes, Vitor Hugo Pereira, Gabriel Oliveira de Carvalho, João Pedro Abadla | Análise de usabilidade e acessibilidade; construção do protótipo |
| Equipe de Desenvolvimento (Configuração) | Yan Santos, Ramon Silva, Vinicius Lima, Marilia Braz, Renato Borges | Repositório, branch, commit, Pull Request, merge e versionamento |

---

## 2. Sprint Planning — Etapa 1: Análise das Demandas

### US02 — Pessoas com dificuldade visual encontram problemas para utilizar o sistema

#### Qual problema existe?

A interface do AgendaFácil não é perceptível nem operável por usuários com baixa visão, daltonismo ou que dependem de leitor de tela. Na prática:

- Contraste insuficiente entre texto e fundo;
- Fontes pequenas que quebram o layout quando ampliadas;
- Informação transmitida apenas por cor (por exemplo, status do agendamento em verde e vermelho);
- Campos de formulário sem rótulo associado;
- Ícones sem texto alternativo;
- Navegação que não funciona apenas pelo teclado.

#### Qual conceito de IHC está relacionado?

Acessibilidade é o conceito central, sustentado por:

- **WCAG 2.2 nível AA** — critérios:
  - 1.1.1 (conteúdo não textual)
  - 1.4.1 (uso da cor)
  - 1.4.3 (contraste mínimo)
  - 1.4.4 (redimensionar texto)
  - 1.4.11 (contraste não textual)
  - 2.1.1 (teclado)
  - 2.4.7 (foco visível)
  - 2.5.8 (tamanho do alvo)
  - 3.3.2 (rótulos e instruções)
- **LBI** — Lei 13.146/2015, art. 63, que torna a acessibilidade obrigatória em sites e aplicações;
- **NBR 17225:2025** — norma brasileira de acessibilidade em conteúdo web;
- **Desenho universal** — a correção beneficia todos os usuários, não apenas quem tem deficiência;
- **Heurísticas de Nielsen nº 4** (consistência e padrões) e **nº 6** (reconhecer em vez de lembrar).

#### Qual seria a melhoria proposta?

Adequar a interface ao WCAG 2.2 nível AA:

- Contraste mínimo de **4,5:1** para texto normal e **3:1** para texto grande e componentes de interface;
- Tipografia base de **16px**, com layout que suporta zoom de até **200%** sem perda de conteúdo ou de função;
- Status nunca comunicado apenas por cor — cor somada a ícone e a texto ("Confirmado", "Cancelado");
- Navegação completa por teclado, com indicador de foco visível e ordem de tabulação lógica;
- Alvos de clique e de toque com no mínimo **24 × 24px** (44 × 44px recomendado em dispositivos móveis);
- Rótulos associados a todos os campos e texto alternativo em imagens e ícones informativos;
- Regiões semânticas e `aria-live`, para que mensagens dinâmicas sejam anunciadas pelo leitor de tela;
- Botões de alto contraste e de aumentar/diminuir fonte na barra superior.

**Relação com os conteúdos estudados:** acessibilidade (eixo principal), usabilidade (a mesma correção reduz erro para todos os usuários), experiência do usuário e princípios estruturais de sistemas interativos (percepção e operação).

---

### US05 — Nova funcionalidade para permitir o cancelamento de agendamentos

#### Qual problema existe?

Hoje o usuário que não pode comparecer fica preso à ação, porque não existe caminho de saída dentro do sistema. Ele precisa ligar para a empresa ou simplesmente faltar. Isso gera *no-show*, mantém a agenda ocupada indevidamente e produz sensação de perda de controle. Trata-se de uma **lacuna funcional**, e não apenas de um problema estético.

#### Qual conceito de IHC está relacionado?

- **Controle e liberdade do usuário** (heurística de Nielsen nº 3) — a saída de emergência claramente sinalizada;
- **Reversibilidade das ações**, como princípio estrutural de sistemas interativos;
- **Prevenção de erros** (heurística nº 5) — cancelar é uma ação destrutiva e exige confirmação;
- **Feedback e visibilidade do status do sistema** (heurística nº 1), fechando o golfo de avaliação de Norman: o usuário precisa saber que o cancelamento realmente ocorreu;
- **Experiência do usuário** — reduz ansiedade e aumenta a confiança no sistema.

#### Qual seria a melhoria proposta?

- Botão **"Cancelar agendamento"** visível na tela de detalhe, com rótulo textual e não apenas com ícone;
- **Modal de confirmação** exibindo os dados do agendamento (data, hora, serviço e profissional), para que o usuário confirme que é o agendamento correto;
- Botões com rótulos específicos — **"Sim, cancelar agendamento"** e **"Não, manter agendamento"** — nunca "OK" e "Cancelar", que geram a ambiguidade "cancelar o quê?";
- Ação destrutiva **não sendo a opção padrão**: o foco inicial do modal fica sobre o botão seguro;
- **Feedback de sucesso explícito** após a ação, com o status do agendamento mudando para "Cancelado";
- **Regra de negócio visível** — prazo mínimo para cancelar, por exemplo até 2 horas antes — informada antes da tentativa, e não como mensagem de erro depois;
- **Registro do cancelamento** no histórico do usuário.

**Relação com os conteúdos estudados:** experiência do usuário, usabilidade (controle, prevenção e recuperação de erros), tipos de interface e comunicação (o diálogo modal como canal de confirmação) e princípios estruturais de sistemas interativos.

---

## 3. Definição da Sprint — Sprint Backlog

O Grupo 2 recebeu dois itens do Product Backlog, e ambos entram na Sprint.

| Prioridade | ID | Item | Esforço | Problema do usuário que será resolvido |
|------------|----|------|---------|----------------------------------------|
| 1 | US05 | Cancelamento de agendamento | Alto | O usuário não consegue desmarcar um atendimento sozinho: precisa ligar para a empresa ou faltar |
| 2 | US02 | Acessibilidade visual | Médio (transversal) | Usuários com baixa visão, daltonismo ou leitor de tela não conseguem operar o sistema |

### Justificativa da prioridade

O **US05** ocupa a primeira posição porque é a única solicitação explícita do cliente presente no backlog, é a que entrega valor de negócio novo — o sistema ganha uma capacidade que não possuía — e é a base sobre a qual a solicitação de mudança da CCB será avaliada. Sem o cancelamento implementado, a mudança solicitada não tem onde ser aplicada.

O **US02** ocupa a segunda posição, mas é executado de forma transversal. Ele não foi deixado no fim da fila: todas as telas novas ou alteradas nesta Sprint — modal, botões e mensagens de feedback — já nascem em conformidade com o WCAG 2.2 nível AA, e essa conformidade integra a Definition of Done. A razão é prática: acessibilidade tratada como última tarefa é a primeira a ser cortada quando o tempo aperta, e neste caso ela é obrigação legal (LBI, art. 63), não item opcional. Tratá-la como critério de qualidade, em vez de tarefa isolada, garante a entrega mesmo com a Sprint apertada.

### Definition of Done da Sprint

Um item só é considerado pronto se:

- Atende aos critérios do WCAG 2.2 nível AA aplicáveis;
- É operável integralmente por teclado, com foco visível;
- Toda ação do usuário produz feedback perceptível;
- Ações destrutivas exigem confirmação explícita;
- Está versionado no Git, com Pull Request revisado e aprovado.

---

## 4. Gerência de Mudanças — Ata da Reunião da CCB

### 4.1 Identificação da solicitação

| Campo | Conteúdo |
|-------|----------|
| Identificador | SM-001 |
| Título | Registro do motivo do cancelamento de agendamento |
| Solicitante | Cliente, por intermédio do Product Owner |
| Descrição | Além de cancelar um agendamento, o usuário deve poder informar o motivo do cancelamento |
| Item relacionado | US05 |
| Momento | Durante a Sprint, com o escopo já fechado no Planning |

### 4.2 Análise de impacto

**Impacto no sistema**

- **Banco de dados:** novas colunas `motivo_cancelamento` (enumerado) e `motivo_descricao` (texto livre, opcional) na tabela de agendamentos, o que exige script de migração;
- **Camada de domínio:** novo enumerado de motivos padronizados e regra sobre a obrigatoriedade do campo;
- **API:** alteração do contrato do endpoint de cancelamento, com novo campo no payload — mudança retrocompatível, desde que o campo seja opcional;
- **Relatórios:** abre a possibilidade futura de análise das causas de cancelamento, o que não faz parte do escopo desta mudança.

**Impacto na interface**

- O modal de confirmação do US05, que já estava sendo desenhado, ganha um campo de seleção de motivos e um campo de texto opcional;
- Aumenta a carga cognitiva do modal, com risco de o usuário abandonar a ação no meio do caminho;
- Exige novos rótulos, mensagens de validação e associação por `aria-describedby`, para manter a conformidade com o WCAG 2.2 nível AA;
- O modal fica mais alto, o que exige atenção ao comportamento com zoom de 200% e em telas pequenas.

**Impacto no tempo da Sprint**

- A solicitação chegou com a Sprint já em andamento e com o escopo fechado no Planning;
- A estimativa envolve migração de banco, ajuste de API, redesenho do modal e reteste de acessibilidade;
- Implementar o escopo completo, incluindo relatórios e análise dos motivos, estouraria a Sprint e colocaria em risco o US05, que é o item de maior prioridade;
- Implementar apenas o registro do motivo, como campo opcional, cabe no escopo, porque o modal já está em construção — fazer agora custa menos do que reabrir a tela depois.

**Necessidade do usuário**

Para o usuário final, a necessidade é baixa: ele quer cancelar rapidamente, e informar o motivo é uma fricção adicional. Para o cliente e para o negócio, a necessidade é alta: conhecer o motivo permite entender as causas de *no-show*, ajustar a agenda e reduzir prejuízo.

**Riscos da alteração**

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Estouro do escopo da Sprint | Média | Alto | Fatiar a entrega: apenas o registro agora, relatórios depois |
| Abandono do cancelamento por fricção | Média | Médio | Campo opcional, com motivos pré-definidos em vez de texto livre obrigatório |
| Regressão de acessibilidade no modal | Média | Alto | Reteste WCAG após a alteração, incluído na Definition of Done |
| Falha na migração de dados | Baixa | Alto | Coluna que aceita nulo e script reversível (rollback) |

### 4.3 Decisão da CCB: APROVADA COM RESSALVAS (escopo reduzido)

A mudança é aprovada para a Sprint atual, restrita ao seguinte escopo:

- Campo de **motivo opcional**, com lista de motivos pré-definidos (**imprevisto**, **remarcação**, **problema de saúde** e **outro**), mais campo de **texto livre exibido apenas quando "outro" for selecionado**;
- **Sem bloqueio** do cancelamento caso o usuário opte por não informar o motivo.

**Adiado para a versão seguinte:** relatórios gerenciais, painel e análise estatística dos motivos de cancelamento.

### 4.4 Justificativa da decisão

A CCB considerou que o custo marginal de incorporar a mudança agora é significativamente menor do que o custo de reabrir a tela depois: o modal de cancelamento está em construção nesta mesma Sprint, e acrescentar o campo enquanto a tela está aberta evita retrabalho de design, de acessibilidade e de migração de banco.

Ao mesmo tempo, a CCB protegeu o objetivo da Sprint ao recusar o escopo completo. Tornar o campo opcional preserva o conceito de IHC que motivou o US05 — **controle e liberdade do usuário** — porque não transforma a saída de emergência em um formulário obrigatório. O valor de negócio é capturado e a fricção para o usuário permanece próxima de zero.

> **Registro:** esta decisão, sua justificativa e a análise de impacto acima integram a ata da CCB e são referenciadas no Pull Request da alteração.

---

## 5. Parte Prática — Interface

**Tela escolhida:** modal de cancelamento de agendamento, que representa em uma única tela o US05, o US02 e a mudança SM-001 aprovada pela CCB.

### 5.1 Wireframe da solução

```
+--------------------------------------------------------+
| Cancelar agendamento [ X ] | <- o foco inicial NAO fica aqui
+--------------------------------------------------------+
|                                                          |
| /!\ Voce esta prestes a cancelar este agendamento. | <- icone + texto (nunca so cor)
|                                                          |
| +--------------------------------------------------+    |
| | Servico: Consulta de avaliacao                     |    |
| | Data: 12/09/2026 (sexta-feira)                     |    | <- usuario confere se e o certo
| | Horario: 14h30                                     |    |
| | Profissional: Dra. Helena Prado                    |    |
| +--------------------------------------------------+    |
|                                                          |
| Motivo do cancelamento (opcional)  | <- campo da mudanca SM-001
| +--------------------------------------------------+    |
| | Selecione um motivo [v] |                             |
| +--------------------------------------------------+    |
| Essa informacao nos ajuda a melhorar o atendimento. | <- aria-describedby
|                                                          |
| (i) Cancelamentos sao permitidos ate 2h antes do      | <- regra ANTES do erro
|     horario marcado.                                    |
|                                                          |
+--------------------------------------------------------+
| [ Nao, manter agendamento ] [ Sim, cancelar ]           |
|          ^ FOCO INICIAL AQUI              ^ destrutivo  |
+--------------------------------------------------------+
```

Após a confirmação, mensagem com `role="status"` e `aria-live="polite"`:

```
+--------------------------------------------------------+
| (v) Agendamento cancelado com sucesso.                  |
|     Um e-mail de confirmacao foi enviado. [Desfazer]    |
+--------------------------------------------------------+
```

### 5.2 Conceitos de IHC demonstrados na tela

O enunciado exige no mínimo três conceitos; a tela proposta demonstra **seis**.

| Conceito | Como aparece na tela |
|----------|----------------------|
| **Feedback ao usuário** | Mensagem de confirmação com `aria-live` e mudança do status do agendamento para "Cancelado" na lista |
| **Prevenção de erros** | Modal de confirmação, foco inicial sobre o botão seguro e regra de prazo informada antes da tentativa |
| **Mensagens claras** | Botões com verbo e objeto ("Sim, cancelar agendamento"), em vez de "OK" e "Cancelar" |
| **Acessibilidade** | Contraste de 4,5:1, navegação por teclado com foco preso ao modal, `role="dialog"` e `aria-modal="true"`, fechamento por ESC, alvos de no mínimo 24px e uso de ícone somado a texto |
| **Controle e liberdade do usuário** | Existe a saída (cancelar), existe a volta ("manter agendamento") e existe o "Desfazer" |
| **Comunicação entre usuário e sistema** | Os dados do agendamento são exibidos no modal: o sistema mostra o que entendeu antes de agir |

### 5.3 Especificação visual para o protótipo

- **Cores:** texto principal `#1A1A1A` sobre `#FFFFFF` (contraste de 17:1); botão destrutivo `#B3261E` com texto branco (contraste de 5,9:1). Não utilizar vermelho claro;
- **Tipografia:** base de 16px, títulos de 20px e altura de linha de 1,5;
- **Botões:** altura mínima de 44px, com espaçamento de 12px entre eles, para evitar clique errado;
- **Foco:** contorno de 2px em `#0B57D0`, com deslocamento de 2px, visível em todos os elementos interativos;
- **Sobreposição de fundo** em `rgba(0,0,0,0.5)`: o modal não deve depender apenas da sombra para se destacar.

### 5.4 Qual problema existia e por que a solução melhora a experiência do usuário

Antes, o usuário que não podia comparecer não tinha saída dentro do sistema: precisava ligar para a empresa ou simplesmente faltar. E nada disso era utilizável por quem tem baixa visão ou depende de leitor de tela. A solução:

- **Devolve controle ao usuário**, porque a saída passa a existir;
- **Protege contra erro**, por meio da confirmação com os dados à vista e da possibilidade de desfazer;
- **Fecha o golfo de avaliação de Norman**, já que o feedback confirma que a ação ocorreu em vez de deixar o usuário na dúvida;
- **Torna tudo operável por teclado e por leitor de tela**, atendendo ao WCAG 2.2 nível AA e à LBI.

---

## 6. Controle de Versão

Fluxo seguido: `main → feature/us05-cancelamento-agendamento → implementação → Pull Request → merge na main`.

### 6.1 Repositório

```bash
mkdir agendafacil && cd agendafacil
git init
git branch -M main
git add .
git commit -m "chore: estrutura inicial do projeto AgendaFacil v1.0.0"
git tag -a v1.0.0 -m "Versao base do sistema"
git remote add origin https://github.com/<organizacao>/agendafacil.git
git push -u origin main --tags
```

### 6.2 Branch

O diagrama do enunciado utiliza `feature/melhoria-interface`. Mantivemos o padrão `feature/`, com um nome mais rastreável, que amarra a branch ao item do backlog:

```bash
git checkout -b feature/us05-cancelamento-agendamento
```

### 6.3 Commit

Padrão **Conventional Commits**: assunto no imperativo, com até 50 caracteres, e corpo explicando o motivo da alteração.

```bash
git add .
git commit -m "feat(agendamento): adiciona cancelamento com confirmacao e motivo

Implementa o cancelamento de agendamentos pelo proprio usuario,
com modal de confirmacao acessivel (WCAG 2.2 AA), feedback de
sucesso via aria-live e campo opcional de motivo aprovado pela
CCB (SM-001).

Resolve: US05
Refs: US02, SM-001"
```

### 6.4 Pull Request

**Título:** `feat(agendamento): cancelamento de agendamento com confirmação e motivo (US05)`

**O que foi alterado**

- Novo botão "Cancelar agendamento" na tela de detalhe do agendamento;
- Modal de confirmação acessível, exibindo os dados do agendamento;
- Campo opcional de motivo do cancelamento, com lista pré-definida;
- Mensagem de feedback com `role="status"` e opção "Desfazer";
- Adequação da tela ao WCAG 2.2 nível AA: contraste, foco visível, rótulos e navegação por teclado;
- Migração de banco com as colunas `motivo_cancelamento` e `motivo_descricao`, ambas aceitando nulo.

**Qual problema foi resolvido**

O usuário não tinha como desmarcar um atendimento sem contatar a empresa, e a tela não era operável por teclado nem por leitor de tela, o que impedia o uso por pessoas com deficiência visual.

**Qual item do backlog está relacionado**

- **US05** — Cancelamento de agendamento (item principal);
- **US02** — Acessibilidade, aplicada como Definition of Done;
- **SM-001** — Mudança aprovada com ressalvas pela CCB.

### 6.5 Merge

```bash
git checkout main
git merge --no-ff feature/us05-cancelamento-agendamento
git push origin main
git tag -a v1.1.0 -m "Cancelamento de agendamento com confirmacao e motivo"
git push origin v1.1.0
```

O parâmetro `--no-ff` é utilizado para que o merge apareça como um nó no histórico, o que torna o fluxo visível na apresentação por meio do comando `git log --graph --oneline --all`.

---

## 7. Versionamento da Solução

**Versão atual: v1.0.0** | **Nova versão definida: v1.1.0**

Justificativa segundo o conceito **MAJOR.MINOR.PATCH**:

| Componente | Quando é incrementado | Aplica-se ao nosso caso? |
|------------|-----------------------|--------------------------|
| MAJOR (2.0.0) | Mudança incompatível com a versão anterior | Não. Nada foi removido ou quebrado; como o campo de motivo é opcional, a API permanece retrocompatível |
| MINOR (1.1.0) | Nova funcionalidade retrocompatível | **Sim.** É exatamente o caso: o cancelamento de agendamento é uma capacidade que o sistema não possuía |
| PATCH (1.0.1) | Apenas correção de defeito, sem funcionalidade nova | Não. Seria insuficiente, pois o cancelamento não é correção de erro, e sim recurso novo |

**Conclusão:** o incremento correto é o **MINOR**, resultando na versão **v1.1.0**.

**Observações complementares**

- Se a Sprint tivesse entregue apenas o US02, ou seja, ajustes de contraste, rótulos e mensagens, sem funcionalidade nova, a versão correta seria a **v1.0.1**, porque correções de conformidade são PATCH;
- O campo de motivo (SM-001) entra na mesma **v1.1.0**, por ter sido integrado à mesma release. Se a CCB tivesse adiado a mudança, ele se tornaria a v1.2.0;
- Os relatórios de motivos de cancelamento, adiados pela CCB, serão entregues na **v1.2.0**;
- Caso o campo de motivo se tornasse obrigatório na API, isso quebraria os clientes existentes e exigiria a **v2.0.0**.

---

## 8. Entrega da Sprint — Roteiro da Apresentação

| Tempo | Bloco | Quem apresenta | Conteúdo |
|-------|-------|----------------|----------|
| 0:30 | Contexto | Product Owner | Somos o Grupo 2; nossos itens são o US02 (acessibilidade) e o US05 (cancelamento) |
| 1:30 | Problemas de IHC | Equipe (IHC) | Os dois problemas identificados e o conceito de IHC de cada um: acessibilidade e controle e liberdade do usuário |
| 1:30 | Solução proposta | Equipe (IHC) | Apresentação da tela no protótipo, apontando os seis conceitos aplicados |
| 1:00 | Gerência de mudança | Scrum Master | A SM-001 foi aprovada com ressalvas: campo opcional agora e relatórios adiados, justificando por custo marginal e proteção do objetivo da Sprint |
| 1:00 | Controle de versão | Equipe (Configuração) | Demonstração ao vivo do `git log --graph --oneline --all`, da branch, do Pull Request e do merge |
| 0:30 | Nova versão | Equipe (Configuração) | v1.1.0, incremento MINOR, por se tratar de funcionalidade nova e retrocompatível |

### Perguntas prováveis e respostas preparadas

**"Por que vocês aceitaram uma mudança no meio da Sprint?"**
Não aceitamos a mudança inteira. A CCB fatiou o escopo, aprovou apenas a parte cujo custo marginal era menor por já estar sendo construída naquele momento e adiou o restante, protegendo o objetivo da Sprint e evitando retrabalho.

**"O US02 está em prioridade 2. Vocês vão conseguir entregá-lo?"**
Sim, porque ele não é uma tarefa no fim da fila: é critério de aceite de tudo o que foi construído nesta Sprint. A tela do US05 já nasce em conformidade com o WCAG 2.2 nível AA.