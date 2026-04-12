# Especificação do Projeto

## Perfis de Usuários

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil: Construtor de Patrimônio </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Usuário que gerencia finanças pessoais com foco em estabilidade e crescimento, utilizando controle sistemático, metas financeiras e decisões baseadas em dados.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>
1. Garantir contas em dia;
2. Eliminar dívidas;
3. Construir reserva de emergência;
4. Alocar em investimentos seguros;
5. Monitorar cenário econômico;
6. Diversificar gradualmente;
7. Planejar crescimento de patrimônio.
</td>
</tr>
</tbody>
</table>


## Histórias de Usuários

Com base na análise nas análises foram identificadas as seguintes histórias do usuário:

|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
| Construtor de Patrimônio | quero me registrar e autenticar com username e password | para acessar meus dados financeiros com segurança. |
| Construtor de Patrimônio | quero registrar entradas e saídas financeiras | para controlar minhas finanças pessoais. |
| Construtor de Patrimônio | quero classificar minhas entradas e saídas em categorias | para entender melhor meus gastos e receitas. |
| Construtor de Patrimônio | quero visualizar meu saldo e histórico em gráficos e tabelas | para acompanhar minha situação financeira. |
| Construtor de Patrimônio | quero estabelecer metas financeiras | para planejar meu crescimento patrimonial. |
| Construtor de Patrimônio | quero acompanhar o progresso das minhas metas | para saber se estou no caminho certo. |
| Construtor de Patrimônio | quero buscar e filtrar minhas movimentações | para encontrar informações específicas rapidamente. |
| Construtor de Patrimônio | quero acessar notícias e conteúdos educativos sobre gestão financeira | para tomar decisões melhores. |
| Construtor de Patrimônio | quero editar ou excluir movimentações | para corrigir erros nos meus registros. |
| Construtor de Patrimônio | quero que o sistema calcule automaticamente meu saldo | para evitar erros manuais. |
| Construtor de Patrimônio | quero definir limites de gastos por categoria | para controlar meu orçamento. |
| Construtor de Patrimônio | quero definir movimentações como recorrentes | para automatizar registros frequentes. |
| Construtor de Patrimônio | quero gerar relatórios em PDF | para compartilhar ou analisar meus dados financeiros. |
| Construtor de Patrimônio | quero visualizar dashboards financeiros | para ter uma visão geral das minhas finanças. |
| Construtor de Patrimônio | quero converter valores entre moedas com taxas atualizadas | para acompanhar investimentos internacionais. |

## Requisitos do Projeto

### Requisitos Funcionais

|ID    | Descrição                | Prioridade |
|-------|---------------------------------|----|
| RF-01 | O sistema deve permitir o registro e autenticação de usuários, utilizando os campos username e password. | ALTA  | 
| RF-02 | O sistema deve permitir o registro de entradas e saídas financeiras pelo usuário | ALTA  |
| RF-03 | O usuário deve poder classificar as entradas e saídas financeiras em categorias.  | ALTA  | 
| RF-04 | A aplicação deve permitir ao usuário visualizar o saldo e o histórico de movimentações financeiras, por meio de gráficos e tabelas. | ALTA  |
| RF-05 | A aplicação deve permitir ao usuário estabelecer metas financeiras. | ALTA  | 
| RF-06 | A aplicação deve permitir ao usuário acompanhar o progresso das metas definidas. | MÉDIA |
| RF-07 | A aplicação deve permitir que os usuários realizem buscas e filtrem informações relacionadas aos seus dados financeiros. | MÉDIA | 
| RF-08 | O sistema deve disponibilizar ao usuário notícias, informativos e conteúdos educativos sobre gestão financeira. | MÉDIA |
| RF-09 | O sistema deve permitir ao usuário editar ou excluir registros de entradas e saídas financeiras. | MÉDIA | 
| RF-10 | O sistema deve calcular automaticamente o saldo total do usuário com base nas movimentações registradas. | ALTA  |
| RF-11 | O sistema deve permitir ao usuário definir limites de gastos por categoria. | MÉDIA | 
| RF-12 | O sistema deve permitir ao usuário definir se uma movimentação financeira é recorrente ou única, possibilitando o registro automático de entradas ou saídas recorrentes. | ALTA  |
| RF-13 | O sistema deve permitir ao usuário gerar e realizar o download de relatórios em formato PDF, contendo dados financeiros apresentados em tabelas e gráficos. | MÉDIA | 
| RF-14 | O sistema deve fornecer ao usuário dashboards financeiros, apresentando informações como saldo, gastos por categoria e histórico de movimentações por meio de gráficos e tabelas. | ALTA  |
| RF-15 | O sistema deve permitir ao usuário converter valores entre diferentes moedas utilizando taxas de câmbio atualizadas em tempo real. | MÉDIA |

**Prioridade: Alta / Média / Baixa. 

### Requisitos não Funcionais

|ID      | Descrição               |Prioridade |
|--------|-------------------------|----|
| RNF-01 |  O sistema deve possuir interface responsiva capaz de se adaptar a diferentes tamanhos de tela, permitindo seu uso em dispositivos como computadores, smartphones e tablets. | ALTA  | 
| RNF-02 |  O sistema deve funcionar corretamente nos navegadores modernos como Google Chrome, Mozilla Firefox, Microsoft Edge e Safari. | ALTA  | 
| RNF-03 |  O sistema deve possuir interface simples e intuitiva para facilitar o uso pelos usuários. | ALTA  |

**Prioridade: Alta / Média / Baixa. 

