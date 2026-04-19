# Auralis Console

Plataforma full stack de conversacao inteligente para fluxos profissionais.

O produto combina uma interface premium em React com uma API em Node.js para orquestrar interacoes com modelos de linguagem de forma segura, escalavel e orientada a produtividade.

## Visao geral

**Auralis Console** foi projetado para equipes que precisam transformar perguntas complexas em respostas acionaveis com rapidez e consistencia.

Principais objetivos:
- reduzir friccao na comunicacao entre usuario e assistente de IA
- elevar a clareza visual com uma experiencia SaaS de alto padrao
- manter arquitetura limpa e pronta para evolucao

## Arquitetura

O projeto utiliza separacao clara entre frontend e backend:

- `web`: aplicacao React (Vite), responsavel pela experiencia conversacional
- `server`: API Express, responsavel por validacao, integracao OpenAI e tratamento de erros

Fluxo:
1. O frontend envia uma solicitacao para `POST /chat`.
2. O backend valida payload e executa chamada via OpenAI SDK (Responses API).
3. A API retorna um objeto padrao com a resposta textual.
4. O frontend renderiza mensagens, estados de loading e feedback de erro.

## Stack

### Frontend
- React 18
- Vite 5
- CSS com design tokens semanticos

### Backend
- Node.js
- Express
- CORS
- dotenv
- openai (SDK oficial)
- nodemon

## Estrutura do projeto

```txt
auralis-console/
  server/
    src/
      app.js
      server.js
      routes/
        chatRoutes.js
      controllers/
        chatController.js
      services/
        openaiService.js
    .env.example
    package.json
  web/
    src/
      components/
        ChatInput.jsx
        ChatMessage.jsx
        ChatWindow.jsx
        Sidebar.jsx
      pages/
        ChatPage.jsx
      services/
        api.js
      styles/
        global.css
      App.jsx
      main.jsx
    .env.example
    index.html
    package.json
    vite.config.js
  .gitignore
  README.md
```

## Variaveis de ambiente

### Backend (`server/.env`)

```env
PORT=3333
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

### Frontend (`web/.env`)

```env
VITE_API_URL=http://localhost:3333
```

## Execucao local

### 1. Instalar backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

API disponivel em `http://localhost:3333`.

### 2. Instalar frontend

Em um novo terminal:

```bash
cd web
cp .env.example .env
npm install
npm run dev
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Aplicacao web disponivel em `http://localhost:5173`.

## Endpoints

### `POST /chat`

Request body:

```json
{
  "message": "Crie um resumo executivo desta proposta"
}
```

Success (`200`):

```json
{
  "reply": "Aqui esta um resumo executivo..."
}
```

Erros comuns:
- `400`: payload invalido
- `429`: limite de requisicoes no provedor de IA
- `500`/`502`: indisponibilidade temporaria

## Diferenciais da interface

- design system com tokens semanticos (cores, espacos, radius e sombras)
- hierarquia visual orientada a leitura e decisao
- componente de composicao de mensagem com estados refinados
- loading discreto e feedback de erro contextual
- layout responsivo com acabamento consistente em desktop e mobile

## Roadmap

- streaming de resposta em tempo real
- persistencia de historico por workspace
- autenticacao e controle de acesso
- observabilidade (logs estruturados e metricas)
- testes automatizados de interface e API
- pipeline CI/CD e deploy multiambiente

## Publicacao no GitHub

Na raiz do repositorio:

```bash
git init
git add .
git commit -m "feat: initial release of auralis console"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/auralis-console.git
git push -u origin main
```
