PDR (Plano de Desenvolvimento de Projeto) - Simplificado

Plano de Desenvolvimento de Projeto: Cronômetro Fullstack
Introdução e Objetivos

Nome do Projeto: Cronômetro Fullstack
Descrição Sumária: Desenvolvimento de uma aplicação web de cronômetro digital com funcionalidades de contagem de tempo, registro de voltas (laps), persistência desses dados em um banco de dados relacional e exibição de um relógio em tempo real.
Objetivos Principais:
Fornecer uma interface de usuário intuitiva para as funcionalidades do cronômetro.
Implementar a lógica de contagem de tempo precisa (horas, minutos, segundos, milissegundos).
Permitir o registro e visualização de múltiplas voltas.
Garantir a persistência dos dados das voltas para que não sejam perdidos ao fechar a aplicação.
Exibir a hora local atual para o usuário.
Construir um backend robusto para gerenciar os dados e servir a API.
Escopo do Projeto

Funcionalidades Incluídas:
Cronômetro: Iniciar, Parar, Resetar.
Voltas: Registrar volta, Listar voltas (com carregamento das voltas salvas).
Relógio em Tempo Real: Exibição contínua.
Backend: API para salvar e carregar voltas, conexão com banco de dados MySQL.
Funcionalidades Não Incluídas (Nesta Fase):
Autenticação de usuários.
Compartilhamento de tempos/voltas.
Funcionalidades avançadas de análise de tempo.
Arquitetura do Sistema

Frontend:
Tecnologias: HTML5, CSS3, JavaScript (Vanilla JS).
Responsabilidades: Renderização da interface, manipulação do DOM, interações do usuário, comunicação com o backend via requisições HTTP (Fetch API).
Backend:
Tecnologias: Node.js, Express.js.
Responsabilidades: Prover endpoints da API RESTful, lógica de negócios para manipulação dos dados das voltas, interação com o banco de dados.
Banco de Dados:
Tecnologia: MySQL.
Responsabilidades: Armazenamento e recuperação dos dados das voltas (tempos e timestamps).
Schema da Tabela laps:
id: INT, AUTO_INCREMENT, PRIMARY KEY
time: VARCHAR(255), NOT NULL (formato "HH:MM:SS:MS")
timestamp: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP
Tecnologias e Ferramentas

Linguagens: JavaScript (frontend e backend), HTML, CSS.
Frameworks/Bibliotecas Backend: Express.js, mysql2 (Node.js MySQL driver), dotenv, cors.
Banco de Dados: MySQL Server.
Ambiente de Desenvolvimento: Node.js, NPM.
Controle de Versão: Git, GitHub.
Estrutura Detalhada dos Arquivos (conforme README.md)

frontend/: Contém todos os ativos do lado do cliente.
index.html: Ponto de entrada e estrutura da UI.
style.css: Regras de estilo visual.
script.js: Lógica do cronômetro, interações com API, manipulação do DOM.
backend/ (ou raiz do projeto para arquivos do servidor):
server.js: Arquivo principal do servidor, configuração do Express, definição de rotas, middleware e conexão com o BD.
package.json: Metadados do projeto Node.js, dependências e scripts.
.env: Armazena variáveis de ambiente (credenciais do BD, porta do servidor).
Endpoints da API (Detalhado)

POST /api/laps
Descrição: Salva um novo tempo de volta no banco de dados.
Request Body: application/json - { "time": "HH:MM:SS:MS" }
Response Sucesso (201): application/json - { "message": "Tempo de volta salvo com sucesso!", "id": <id_da_volta> }
Response Erro (400): Se o campo time não for fornecido.
Response Erro (500): Erro interno do servidor.
GET /api/laps
Descrição: Retorna uma lista de todas as voltas registradas, ordenadas pela data de criação (mais recentes primeiro).
Response Sucesso (200): application/json - [ { "id": ..., "time": "...", "timestamp": "..." }, ... ]
Response Erro (500): Erro interno do servidor.
GET /api/ping
Descrição: Endpoint de teste para verificar se a API está online.
Response Sucesso (200): application/json - { "message": "pong" }
Plano de Testes (Visão Geral)

Testes Manuais:
Verificar todas as funcionalidades do cronômetro (iniciar, parar, resetar, volta).
Testar o registro de voltas e a correta exibição na lista.
Confirmar a persistência dos dados (recarregar a página e verificar se as voltas são carregadas).
Verificar o funcionamento do relógio em tempo real.
Testar a responsividade da interface em diferentes tamanhos de tela (se aplicável).
Testes de API (usando ferramentas como Postman/Insomnia):
Testar os endpoints POST /api/laps e GET /api/laps com dados válidos e inválidos.
Verificar os códigos de status HTTP e os corpos das respostas.
Riscos e Mitigações (Exemplos)

Risco: Problemas de conexão com o banco de dados.
Mitigação: Implementar tratamento de erros robusto na conexão e queries; garantir que as credenciais no .env estão corretas.
Risco: Inconsistência na formatação do tempo entre frontend e backend.
Mitigação: Padronizar o formato de tempo e validar no backend.
Próximas Etapas e Evolução do Projeto

Concluir a implementação das funcionalidades básicas descritas.
Realizar testes manuais completos.
Preparar o projeto para deploy em uma plataforma de hospedagem.
Refatoração do Frontend: Avaliar e iniciar a refatoração para Vue.js ou Angular para melhorar a manutenibilidade e escalabilidade do frontend.
Melhorias Contínuas: Coletar feedback (se houver usuários) e implementar melhorias na UI/UX.