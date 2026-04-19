import { generateReply } from "../services/openaiService.js";

export async function postChat(req, res, next) {
  const { message } = req.body ?? {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Informe uma mensagem valida no campo 'message'.",
    });
  }

  try {
    const reply = await generateReply(message.trim());
    return res.status(200).json({ reply });
  } catch (error) {
    return next(error);
  }
}
