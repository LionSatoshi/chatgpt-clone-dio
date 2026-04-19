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

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="conversation-shell">
        <header className="conversation-header">
          <h1>Satoshi</h1>
          <div className="header-meta">
            <span className={`status-pill ${isLoading ? "is-busy" : ""}`}>
              {isLoading ? "Processando" : "Pronto"}
            </span>
            <span className="meta-value">{messages.length} mensagens</span>
          </div>
        </header>

        <ChatWindow messages={messages} isLoading={isLoading} />

        {error ? (
          <div className="feedback-banner" role="status">
            {error}
          </div>
        ) : null}

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </main>
    </div>
  );
}

export default ChatPage;
