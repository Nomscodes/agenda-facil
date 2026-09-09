# Product Backlog — Sprint de Evolução do AgendaFácil

**Equipe 3**

**Turma:** ADS — 4º período  
**Unidades curriculares:** Interface Homem-Computador (IHC) + Manutenção e Configuração de Software  
**Sprint:** 08/09/2026

---

## Integrantes da Equipe 3

| # | Integrante |
|---:|---|
| 1 | Lucas Esposito |
| 2 | Filipe Esposito |
| 3 | Lucas André |
| 4 | Marco Tulio |
| 5 | Daniel |
| 6 | Gabriel Santiago |
| 7 | Luiz Eduardo |
| 8 | Davi Martins |
| 9 | Caio Vinicius |
| 10 | Joel |

### Papéis Scrum

| Papel | Responsável |
|---|---|
| Product Owner | Filipe Esposito |
| Scrum Master | Gabriel Santiago |
| Equipe de Desenvolvimento | Demais integrantes |

---

## Product Backlog completo

Solicitações recebidas pela empresa, distribuídas entre as três equipes.

| ID | Solicitação | Equipe |
|---|---|---|
| US01 | O usuário não sabe se o agendamento foi realizado com sucesso. | Equipe 1 |
| US02 | Pessoas com dificuldade visual encontram problemas para utilizar o sistema. | Equipe 2 |
| **US03** | **O menu possui muitas opções e os usuários não conseguem encontrar rapidamente as principais funcionalidades.** | **Equipe 3** |
| US04 | O sistema permite excluir um agendamento sem solicitar confirmação. | Equipe 1 |
| US05 | A empresa solicitou uma nova funcionalidade para permitir o cancelamento de agendamentos. | Equipe 2 |
| **US06** | **A tela de login apresenta mensagens de erro pouco claras.** | **Equipe 3** |

---

## Sprint Backlog da Equipe 3

Itens comprometidos para esta Sprint: **US03** e **US06**.

### US03 — Reorganização do menu e acesso rápido às funcionalidades

> Como usuário do AgendaFácil, quero encontrar rapidamente as principais funcionalidades do sistema, para realizar minhas tarefas sem precisar procurar em um menu extenso e confuso.

| Campo | Conteúdo |
|---|---|
| **Prioridade** | Alta — 1º item da Sprint |
| **Problema** | O menu apresentava muitas opções simultaneamente e sem uma hierarquia clara. Isso aumentava o tempo de procura, dificultava a identificação das ações mais importantes e elevava a carga cognitiva do usuário. |
| **Conceito de IHC** | Correspondência entre o sistema e o mundo real, reconhecimento em vez de memorização e consistência e padrões (2ª, 6ª e 4ª heurísticas de Nielsen). |
| **Melhoria proposta** | Substituir a exposição simultânea das opções por um seletor compacto de abas e apresentar, no painel, quatro cartões com as funcionalidades mais importantes. Incluir um campo de busca que filtre os cartões do menu em tempo real. |

**Critérios de aceite**

- [x] A navegação principal é apresentada em um seletor compacto de abas, evitando que todas as telas ocupem espaço simultaneamente.
- [x] O seletor informa claramente qual aba está aberta no momento.
- [x] O usuário pode acessar diretamente Login, Painel de Agendamentos, Novo Agendamento e Criar Conta.
- [x] O painel destaca quatro funcionalidades em cartões: Marcar Consulta, Meus Horários, Histórico e Configurações.
- [x] As ações prioritárias recebem o selo visual “AÇÃO RÁPIDA”.
- [x] A busca filtra os cartões em tempo real com base no título associado à funcionalidade.
- [x] Os cartões possuem efeito de `hover`, alteração de borda e movimento vertical para indicar interatividade.
- [x] O cartão “Marcar Consulta” abre o formulário de novo agendamento.
- [ ] Os cartões “Meus Horários”, “Histórico” e “Configurações” devem abrir seus respectivos conteúdos. *(pendente — atualmente possuem aparência clicável, mas não executam uma ação)*
- [ ] Quando nenhum cartão corresponder à pesquisa, o sistema deve exibir a mensagem “Nenhuma opção encontrada”.
- [ ] A pesquisa também deve considerar o título apresentado visualmente no cartão, além do valor técnico de `data-title`.

**Justificativa da prioridade:** O menu é utilizado durante toda a navegação e afeta todas as tarefas do sistema. A dificuldade para localizar funcionalidades aumenta o tempo de execução, gera erros de navegação e prejudica principalmente usuários iniciantes. Por isso, sua reorganização apresenta impacto direto e frequente na experiência geral.

### US06 — Mensagens de erro claras na tela de login

> Como usuário do AgendaFácil, quero receber mensagens de erro claras ao tentar entrar no sistema, para entender qual informação está incorreta e saber como corrigi-la.

| Campo | Conteúdo |
|---|---|
| **Prioridade** | Alta — 2º item da Sprint |
| **Problema** | A tela de login apresentava mensagens genéricas, como “Dados inválidos”, sem indicar qual campo estava incorreto ou o que deveria ser feito. Isso levava o usuário a repetir tentativas sem compreender o problema. |
| **Conceito de IHC** | Ajudar os usuários a reconhecer, diagnosticar e recuperar-se de erros (9ª heurística de Nielsen), visibilidade do status do sistema e prevenção de erros. |
| **Melhoria proposta** | Validar individualmente os campos de e-mail e senha, alterar a borda do campo inválido para vermelho e exibir uma mensagem específica imediatamente abaixo dele. Quando o e-mail for válido, sua borda passa para verde. |

**Critérios de aceite**

- [x] Ao tentar entrar com os campos vazios, o sistema informa separadamente que o e-mail e a senha são obrigatórios.
- [x] Um e-mail em formato incorreto apresenta a orientação “Digite um e-mail válido no formato usuario@dominio.com”.
- [x] A borda do campo de e-mail inválido muda para vermelho.
- [x] A borda do campo de e-mail válido muda para verde.
- [x] A senha vazia apresenta a orientação “Por favor, informe sua senha de acesso”.
- [x] As mensagens aparecem imediatamente abaixo dos respectivos campos e utilizam linguagem objetiva.
- [x] As mensagens anteriores são removidas quando o formulário é enviado novamente com o respectivo campo válido.
- [x] Quando os dois campos são considerados válidos, o sistema apresenta o alerta “Login realizado com sucesso!”.
- [ ] O campo de senha deve validar o mínimo de seis caracteres informado no cadastro.
- [ ] O primeiro campo inválido deve receber foco automaticamente.
- [ ] Os erros devem ser removidos durante a digitação, sem exigir um novo envio do formulário.
- [ ] O formulário deve utilizar `aria-invalid`, `aria-describedby` e uma região `aria-live` para leitores de tela.
- [ ] Após o login válido, o usuário deve ser direcionado automaticamente ao Painel de Agendamentos.

**Justificativa da prioridade:** O login é a porta de entrada do sistema. Mensagens pouco claras impedem o acesso, aumentam a frustração e podem levar o usuário a acreditar que sua conta está bloqueada. A melhoria reduz tentativas repetidas e torna a recuperação do erro simples e imediata.

---

## Evidências das melhorias no protótipo

### Fluxo de demonstração da US03

1. O usuário abre o seletor “Navegar por Abas”.
2. O sistema apresenta quatro destinos: Login no Sistema, Painel de Agendamentos, Novo Agendamento e Criar Conta.
3. O usuário escolhe “Painel de Agendamentos”.
4. O painel apresenta quatro cartões de funcionalidade e os próximos agendamentos.
5. O usuário digita no campo “Buscar Opção / Agendamento”.
6. Os cartões que não correspondem à pesquisa são ocultados em tempo real.
7. Ao selecionar “Marcar Consulta”, o usuário é levado ao formulário de agendamento.

### Fluxo de demonstração da US06

1. O usuário acessa a tela de login.
2. Ao enviar o formulário vazio, recebe uma mensagem específica abaixo de cada campo e vê as bordas em vermelho.
3. Ao informar um e-mail em formato incorreto, recebe um exemplo do formato esperado.
4. Ao preencher um e-mail válido, a borda do campo muda para verde.
5. Após preencher os dois campos, o sistema apresenta o alerta “Login realizado com sucesso!”.

---

## Definição de Pronto (DoD)

Um item só é considerado concluído quando:

1. A melhoria está implementada e funcionando no protótipo.
2. O conceito de IHC aplicado está marcado no código com comentário `/* IHC: ... */`.
3. A alteração está registrada em commit com mensagem clara referenciando o item do backlog.
4. O item está documentado no README com problema, conceito e solução.
5. Os critérios de aceite foram testados pela equipe.
6. Os componentes interativos apresentam estados de foco, hover, erro, carregamento e sucesso quando aplicável.

---

## Solicitação de mudança registrada

| ID | Solicitação | Origem | Situação |
|---|---|---|---|
| CM-01 | Permitir que a busca encontre também os próximos agendamentos, além das opções do menu. | Cliente, durante a Sprint | Analisada pela CCB — aprovada com adiamento para a próxima Sprint |

A análise de impacto e a justificativa da decisão devem ser registradas no [README, seção “Decisão da CCB”](./README.md#decisão-da-ccb).

### Decisão da CCB

A solicitação foi considerada relevante porque o campo atual se chama “Buscar Opção / Agendamento”, mas a implementação filtra somente os cartões do menu. Para pesquisar os registros da tabela também será necessário definir quais colunas participarão da busca e como os dois tipos de resultado serão apresentados. Para não ampliar o escopo durante a Sprint, a CCB aprovou a mudança para o próximo ciclo.

---

## Backlog da próxima Sprint

Itens levantados durante esta Sprint e ainda não implementados:

| ID | Item | Origem |
|---|---|---|
| CM-01 | Ampliar a busca para filtrar também os próximos agendamentos. | CCB |
| TD-01 | Implementar as ações de Meus Horários, Histórico e Configurações. | Limitação identificada |
| TD-02 | Mostrar um estado vazio quando a busca não encontrar cartões. | Usabilidade |
| TD-03 | Direcionar o usuário ao painel após o login válido. | Limitação identificada |
| TD-04 | Validar o tamanho mínimo da senha e manter o requisito consistente entre login e cadastro. | Consistência |
| TD-05 | Adicionar atributos ARIA e anúncio das mensagens de erro. | Acessibilidade |
| TD-06 | Implementar navegação por teclado no seletor de abas e nos cartões. | Acessibilidade |
| TD-07 | Respeitar `prefers-reduced-motion` nas animações e transições. | Acessibilidade |

---

## Sugestões de commits

```text
feat(US03): reorganiza menu e adiciona busca de recursos
feat(US06): melhora validações e mensagens de erro do login
docs: documenta melhorias de IHC e decisão da CCB
```
