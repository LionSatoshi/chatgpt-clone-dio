import cors from "cors";
import express from "express";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: frontendUrl,
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(chatRoutes);

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const publicMessage =
    err.publicMessage || "Nao foi possivel processar sua solicitacao agora.";

  if (statusCode >= 500) {
    // Loga detalhes internos sem expor ao cliente.
    console.error("[server-error]", err);
  }

  res.status(statusCode).json({ error: publicMessage });
});

export default app;
