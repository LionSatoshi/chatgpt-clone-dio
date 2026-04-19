function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <article className={`message-row ${isUser ? "user" : "assistant"}`}>
      <div className="message-avatar">{isUser ? "U" : "AI"}</div>
      <div className="message-bubble">{content}</div>
    </article>
  );
}

export default ChatMessage;

