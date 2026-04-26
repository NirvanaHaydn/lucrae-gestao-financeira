=======================================================================================================================
Contém toda a lógica JavaScript da aplicação.
Estrutura:
js
│
├── components
├── pages
├── services
│
├── main.js
└── router.js

=======================================================================================================================
PASTAS:

COMPONENTS:
Contém componentes reutilizáveis da interface.

Exemplos de componentes:
    navbar
    cards de informação
    modais
    botões reutilizáveis
    widgets de dashboard

Esses componentes podem ser utilizados em várias páginas.


PAGES:
Contém scripts responsáveis pelo comportamento específico de cada página.

Exemplos de responsabilidades:
    carregar dados do dashboard
    enviar formulários
    validar inputs
    renderizar gráficos.

Cada página HTML pode possuir um script correspondente dentro desta pasta.


SERVICES:
Contém a lógica de negócio da aplicação.

Esses arquivos lidam com:
    manipulação de dados
    comunicação com APIs
    regras financeiras

Exemplos:
    registrar despesas
    calcular saldo
    recuperar histórico financeiro.

Essa separação ajuda a manter o código organizado e reutilizável.

=======================================================================================================================
ARQUIVOS:

main.js --> Arquivo principal de inicialização do JavaScript da aplicação.

Responsável por:
    iniciar o sistema
    carregar componentes globais
    iniciar o roteador.


libs.js --> Responsável pela inserção de bibliotecas na aplicação.

Ele gerencia:
    redirecionamentos
    rotas
    carregamento de páginas.

Esse arquivo permite organizar a navegação do sistema de forma mais estruturada.

=======================================================================================================================