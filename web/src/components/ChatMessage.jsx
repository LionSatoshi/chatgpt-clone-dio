function formatTime(timestamp) {
  if (!timestamp) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
}

function ChatMessage({ role, content, createdAt }) {
  const isUser = role === "user";
  const author = isUser ? "Voce" : "Auralis Assistant";
  const avatarLabel = isUser ? "VC" : "AR";
  const sentAt = formatTime(createdAt);

  return (
    <article className={`message-item ${isUser ? "is-user" : "is-assistant"}`}>
      <div className="message-avatar">{avatarLabel}</div>
      <div className="message-card">
        <header className="message-meta">
          <strong>{author}</strong>
          <time>{sentAt}</time>
        </header>
        <div className="message-content">{content}</div>
      </div>
    </article>
  );
}

export default ChatMessage;
