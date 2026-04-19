import { useEffect, useRef, useState } from "react";

function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [value]);

  function handleSubmit(event) {
    event.preventDefault();

    const message = value.trim();
    if (!message || disabled) return;

    onSend(message);
    setValue("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer-field">
        <textarea
          ref={textareaRef}
          className="composer-textarea"
          placeholder="Descreva sua solicitacao com contexto suficiente para obter uma resposta precisa."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
      </div>

      <div className="composer-actions">
        <span>Enter envia | Shift+Enter quebra linha</span>
        <button className="composer-submit" type="submit" disabled={disabled}>
          {disabled ? "Gerando" : "Enviar"}
        </button>
      </div>
    </form>
  );
}

export default ChatInput;

