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
  };
}

const initialMessages = [
  createMessage(
    "assistant",
    "Ola! Eu sou seu assistente. Envie uma pergunta para comecarmos."
  ),
];

function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
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
          "Erro ao buscar resposta. Verifique o backend e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="chat-main">
        <header className="chat-header">
          <h1>Integrando ChatGPT com Node e React</h1>
          <p>Projeto full stack para desafio DIO</p>
        </header>

        <ChatWindow messages={messages} isLoading={isLoading} />

        {error ? <div className="error-banner">{error}</div> : null}

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </main>
    </div>
  );
}

export default ChatPage;

