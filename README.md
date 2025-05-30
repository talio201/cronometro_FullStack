# Cronômetro Fullstack ⏱️

Bem-vindo ao Cronômetro Fullstack! Este é um projeto de um cronômetro digital completo com funcionalidades de iniciar, parar, resetar, registrar voltas e persistência de dados em um banco de dados MySQL. O projeto também exibe um relógio em tempo real.

## ✨ Funcionalidades

* **Cronômetro Digital:** Exibição no formato `HH:MM:SS:MS`.
* **Controles:**
    * **Iniciar:** Inicia ou retoma a contagem do tempo.
    * **Parar:** Pausa a contagem e registra automaticamente uma volta se o cronômetro estiver rodando e com tempo maior que zero.
    * **Resetar:** Zera o cronômetro e limpa a lista de voltas da interface.
    * **Volta:** Registra o tempo atual como uma volta sem parar o cronômetro.
* **Registro de Voltas:**
    * As voltas são exibidas na interface.
    * As voltas são salvas em um banco de dados MySQL para persistência.
    * As voltas anteriores são carregadas ao iniciar a aplicação.
* **Relógio em Tempo Real:** Exibe a hora local atual.

## 🛠️ Tecnologias Utilizadas

* **Frontend:**
    * HTML5
    * CSS3
    * JavaScript (ES6+)
* **Backend:**
    * Node.js
    * Express.js
* **Banco de Dados:**
    * MySQL
* **Outras bibliotecas/ferramentas:**
    * `cors` (para habilitar Cross-Origin Resource Sharing)
    * `dotenv` (para gerenciamento de variáveis de ambiente)
    * `mysql2` (driver Node.js para MySQL)

## 📂 Estrutura do Projeto

O projeto é dividido principalmente em duas pastas: `frontend` e `backend`.







cronometro-fullstack/
├── frontend/
│   ├── index.html        # Estrutura principal da página
│   ├── style.css         # Estilização visual
│   └── script.js         # Lógica do cliente e interações com a API
│
├── backend/              # Ou a raiz do projeto, se o server.js estiver lá
│   ├── server.js         # Configuração do servidor Express, rotas da API, DB
│   ├── package.json      # Dependências e scripts do backend
│   ├── package-lock.json # Lockfile das dependências
│   └── .env.example      # Arquivo de exemplo para variáveis de ambiente (crie um .env)
│
└── README.md             # Este arquivo





## 🚀 Configuração e Instalação (Desenvolvimento Local)

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local:

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio-github>
    cd cronometro-fullstack
    ```

2.  **Configure o Backend:**
    * Navegue até a pasta do backend (ex: `cd backend`).
    * Instale as dependências:
        ```bash
        npm install
        ```
    * **Configure o Banco de Dados MySQL:**
        * Certifique-se de que você tem um servidor MySQL rodando.
        * Crie um banco de dados (ex: `cronometro_db`).
        * Crie a tabela `laps` no seu banco de dados:
            ```sql
            CREATE TABLE laps (
                id INT AUTO_INCREMENT PRIMARY KEY,
                time VARCHAR(255) NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            ```
    * **Variáveis de Ambiente:**
        * Crie um arquivo `.env` na pasta do backend (copie do `.env.example` se houver, ou crie um novo).
        * Adicione as seguintes variáveis com suas credenciais do MySQL:
            ```env
            DB_HOST=localhost
            DB_USER=seu_usuario_mysql
            DB_PASSWORD=sua_senha_mysql
            DB_DATABASE=cronometro_db
            PORT=3000
            ```
    * Inicie o servidor backend:
        ```bash
        npm start
        ```
        O servidor deverá estar rodando em `http://localhost:3000`.

3.  **Configure o Frontend:**
    * Abra o arquivo `frontend/index.html` diretamente no seu navegador.
    * Certifique-se de que a constante `API_BASE_URL` no arquivo `frontend/script.js` está configurada para `http://localhost:3000` (ou a porta que você definiu para o backend).
        ```javascript
        const API_BASE_URL = 'http://localhost:3000';
        ```

## 🌐 Endpoints da API

O backend expõe os seguintes endpoints:

* `GET /api/ping`:
    * Verifica a saúde da API.
    * Resposta: `{ "message": "pong" }`
* `POST /api/laps`:
    * Salva um novo tempo de volta.
    * Corpo da requisição: `{ "time": "HH:MM:SS:MS" }`
    * Resposta: `{ "message": "Tempo de volta salvo com sucesso!", "id": novoId }`
* `GET /api/laps`:
    * Recupera todos os tempos de volta salvos.
    * Resposta: Array de objetos de volta (ex: `[{ "id": 1, "time": "00:00:01:500", "timestamp": "..." }]`)

## 🌱 Próximos Passos (Sugestões)

* Refatorar o frontend utilizando Vue.js ou Angular.
* Implementar testes unitários e de integração.
* Melhorar a interface do usuário (UI) e experiência do usuário (UX).
* Adicionar paginação para a lista de voltas se ela se tornar muito longa.