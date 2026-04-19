const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

export async function postChatMessage(message) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const errorMessage =
      data?.error || "Nao foi possivel concluir a solicitacao no momento.";
    throw new Error(errorMessage);
  }

  if (!data?.reply) {
    throw new Error("Servico indisponivel temporariamente.");
  }

  return data.reply;
}
