import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage.jsx";

function ChatWindow({ messages, isLoading }) {
  const endRef = useRef(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <section className="conversation-stream">
      <div className="stream-inner">
        {!hasMessages ? (
          <div className="empty-state">
            <h2>Inicie uma conversa estrategica</h2>
            <p>
              Compartilhe contexto, objetivo e formato desejado para receber
              respostas mais precisas e acionaveis.
            </p>
            <ul>
              <li>Planejamento de iniciativas e OKRs</li>
              <li>Sintese de documentos e reunioes</li>
              <li>Refinamento de comunicacao executiva</li>
            </ul>
          </div>
        ) : null}

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            createdAt={message.createdAt}
          />
        ))}

        {isLoading ? (
          <div className="loading-row" aria-live="polite">
            <span className="loading-label">Auralis esta preparando a resposta</span>
            <span className="loading-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
        ) : null}

        <div ref={endRef} />
      </div>
    </section>
  );
}

export default ChatWindow;
