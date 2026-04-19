import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage.jsx";

function ChatWindow({ messages, isLoading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <section className="chat-window">
      <div className="messages-list">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {isLoading ? (
          <article className="message-row assistant">
            <div className="message-avatar">AI</div>
            <div className="message-bubble typing-indicator">
              <span />
              <span />
              <span />
            </div>
          </article>
        ) : null}

        <div ref={endRef} />
      </div>
    </section>
  );
}

export default ChatWindow;

