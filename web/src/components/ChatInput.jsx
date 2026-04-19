import { useState } from "react";

function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const message = value.trim();
    if (!message || disabled) return;

    onSend(message);
    setValue("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <form className="chat-input-wrapper" onSubmit={handleSubmit}>
      <textarea
        className="chat-textarea"
        placeholder="Digite sua mensagem..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
      />

      <button className="send-button" type="submit" disabled={disabled}>
        {disabled ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}

export default ChatInput;

