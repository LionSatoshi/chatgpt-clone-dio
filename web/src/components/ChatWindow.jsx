import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage.jsx";

function ChatWindow({ messages, isLoading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <section className="conversation-stream">
      <div className="stream-inner">
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
            <span className="loading-label">Satoshi esta preparando a resposta</span>
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
