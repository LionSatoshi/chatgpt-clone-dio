import { useState } from "react";
import ChatInput from "../components/ChatInput.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { postChatMessage } from "../services/api.js";

function createMessage(role, content) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    createdAt: Date.now(),
  };
}

const quickPrompts = [
  "Organize um plano de acao para os proximos 30 dias com foco em produtividade.",
  "Resuma em 5 pontos um texto tecnico que vou enviar em seguida.",
  "Me ajude a transformar esta ideia em uma proposta executiva objetiva.",
];

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend(message) {
    if (!message.trim() || isLoading) return;

    const cleanMessage = message.trim();
    setError("");
    setMessages((prev) => [...prev, createMessage("user", cleanMessage)]);
    setIsLoading(true);

    try {
      const reply = await postChatMessage(cleanMessage);
      setMessages((prev) => [...prev, createMessage("assistant", reply)]);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Nao foi possivel concluir a solicitacao no momento."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleQuickPrompt(prompt) {
    if (isLoading) return;
    void handleSend(prompt);
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="conversation-shell">
        <header className="conversation-header">
          <div>
            <p className="header-kicker">Workspace Inteligente</p>
            <h1>Auralis Console</h1>
            <p className="header-subtitle">
              Plataforma de conversacao orientada a produtividade, contexto e
              clareza nas respostas.
            </p>
          </div>
          <div className="header-meta">
            <span className={`status-pill ${isLoading ? "is-busy" : ""}`}>
              {isLoading ? "Processando" : "Pronto"}
            </span>
            <span className="meta-value">{messages.length} mensagens</span>
          </div>
        </header>

        <section className="quick-actions">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="quick-action"
              onClick={() => handleQuickPrompt(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </section>

        <ChatWindow messages={messages} isLoading={isLoading} />

        {error ? (
          <div className="feedback-banner" role="status">
            {error}
          </div>
        ) : null}

        <ChatInput onSend={handleSend} disabled={isLoading} />

        <p className="disclaimer">
          Validacao humana continua recomendada para decisoes criticas.
        </p>
      </main>
    </div>
  );
}

export default ChatPage;
