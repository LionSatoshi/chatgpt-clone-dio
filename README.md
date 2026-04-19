# chatgpt-clone-dio

Aplicacao full stack para o desafio da DIO **"Integrando ChatGPT com Node e React"**.

O projeto simula uma interface estilo ChatGPT com:
- frontend em React + Vite
- backend em Node.js + Express
- integracao com OpenAI no backend usando SDK oficial e Responses API

A chave da OpenAI fica protegida no servidor via variavel de ambiente.

## Descricao do desafio

Construir uma aplicacao de chat moderna e responsiva, com separacao clara de responsabilidades entre frontend e backend, incluindo consumo de IA de forma segura para publicacao em portfolio e GitHub.

## Arquitetura do projeto

```txt
chatgpt-clone-dio/
  server/                       # API Node.js
    src/
      app.js                    # Configuracao do Express (middlewares e rotas)
      server.js                 # Bootstrap do servidor
      routes/chatRoutes.js      # Rota POST /chat
      controllers/chatController.js
      services/openaiService.js # Integracao com OpenAI (Responses API)
    .env.example
    package.json

  web/                          # Aplicacao React
    src/
      pages/ChatPage.jsx
      components/
        Sidebar.jsx
        ChatWindow.jsx
        ChatMessage.jsx
        ChatInput.jsx
      services/api.js           # Cliente HTTP do frontend
      styles/global.css
      App.jsx
      main.jsx
    .env.example
    package.json
    vite.config.js
    index.html
```

## Tecnologias utilizadas

### Backend
- Node.js
- Express
- CORS
- dotenv
- openai (SDK oficial)
- nodemon

### Frontend
- React
- Vite
- CSS (tema escuro, responsivo)

## Fluxo da aplicacao

1. Usuario envia mensagem no frontend.
2. Frontend faz `POST /chat` para o backend.
3. Backend valida o payload e chama `client.responses.create(...)`.
4. Backend retorna `{ "reply": "..." }`.
5. Frontend renderiza a resposta da IA.

## Variaveis de ambiente

### Backend (`server/.env`)

Use `server/.env.example`:

```env
PORT=3333
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

### Frontend (`web/.env`)

Use `web/.env.example`:

```env
VITE_API_URL=http://localhost:3333
```

## Como executar localmente

### 1) Clonar o repositorio

```bash
git clone https://github.com/SEU_USUARIO/chatgpt-clone-dio.git
cd chatgpt-clone-dio
```

### 2) Configurar backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

No Windows PowerShell, para copiar o `.env`:

```powershell
Copy-Item .env.example .env
```

Backend disponivel em: `http://localhost:3333`

### 3) Configurar frontend

Em outro terminal:

```bash
cd web
cp .env.example .env
npm install
npm run dev
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Frontend disponivel em: `http://localhost:5173`

## Endpoint principal

### `POST /chat`

Request:

```json
{
  "message": "Explique React em 3 linhas"
}
```

Response (`200`):

```json
{
  "reply": "React e uma biblioteca JavaScript para construir interfaces..."
}
```

Erros esperados:
- `400` mensagem invalida
- `429` limite de requisicoes na OpenAI
- `500`/`502` erro interno/externo

## Demonstracao

Adicione aqui os prints/GIFs do projeto rodando:

- `docs/images/chat-desktop.png`
- `docs/images/chat-mobile.png`
- `docs/images/chat-loading.png`

Exemplo de markdown para screenshot:

```md
![Tela principal](docs/images/chat-desktop.png)
```

## Aprendizados

- Estruturacao de API Express em camadas (`routes`, `controllers`, `services`)
- Boas praticas de seguranca para uso de API key no backend
- Integracao com OpenAI usando Responses API
- Organizacao de componentes React para reuso
- Tratamento de loading, erro e responsividade em UI de chat

## Melhorias futuras

- Historico de conversas persistido em banco de dados
- Streaming de respostas da OpenAI em tempo real
- Autenticacao e controle por usuario
- Testes automatizados (unitarios e integracao)
- Docker e pipeline CI/CD
- Deploy (backend + frontend)

## Publicacao no GitHub

Na raiz do projeto:

```bash
git init
git add .
git commit -m "feat: final version for dio challenge"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/chatgpt-clone-dio.git
git push -u origin main
```
