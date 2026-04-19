import OpenAI from "openai";

function createServiceError(statusCode, publicMessage, cause) {
  const error = new Error(publicMessage);
  error.statusCode = statusCode;
  error.publicMessage = publicMessage;
  error.cause = cause;
  return error;
}

function extractOutputText(response) {
  if (typeof response?.output_text === "string" && response.output_text.trim()) {
    return response.output_text.trim();
  }

  if (Array.isArray(response?.output)) {
    const textParts = [];

    for (const item of response.output) {
      if (!Array.isArray(item?.content)) continue;

      for (const contentItem of item.content) {
        if (contentItem?.type === "output_text" && contentItem?.text) {
          textParts.push(contentItem.text);
        }
      }
    }

    return textParts.join("\n").trim();
  }

  return "";
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw createServiceError(
      500,
      "Chave da OpenAI nao configurada no servidor (.env)."
    );
  }

  return new OpenAI({ apiKey });
}

export async function generateReply(message) {
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const client = getOpenAIClient();

  try {
    const response = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content:
            "Voce e um assistente util, didatico e objetivo. Responda em portugues do Brasil quando o usuario escrever em portugues.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = extractOutputText(response);

    if (!reply) {
      throw createServiceError(
        502,
        "A OpenAI nao retornou um texto valido. Tente novamente."
      );
    }

    return reply;
  } catch (error) {
    if (error?.status === 401 || error?.status === 403) {
      throw createServiceError(
        502,
        "Falha de autenticacao com a OpenAI. Verifique sua chave de API.",
        error
      );
    }

    if (error?.status === 429) {
      throw createServiceError(
        429,
        "Limite de requisicoes atingido na OpenAI. Aguarde e tente de novo.",
        error
      );
    }

    if (error?.status >= 500) {
      throw createServiceError(
        502,
        "Servico da OpenAI indisponivel no momento. Tente novamente.",
        error
      );
    }

    if (error?.statusCode && error?.publicMessage) {
      throw error;
    }

    throw createServiceError(
      500,
      "Nao foi possivel gerar resposta agora. Tente novamente.",
      error
    );
  }
}

