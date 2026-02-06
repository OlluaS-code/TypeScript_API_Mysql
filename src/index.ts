import { config } from "./settings/config";
import server from "./server";

const PORT = config.PORT;

const startServer = () => {
  try {
    const runningServer = server.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado com sucesso!`);
      console.log(`📡 Local: http://localhost:${PORT}`);
    });

    runningServer.on("error", (error: any) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `❌ Erro: A porta ${PORT} já está sendo usada por outro programa.`,
        );
      } else {
        console.error("❌ Erro ao iniciar o servidor de rede:", error.message);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error("💥 Falha crítica na configuração do servidor:", error);
    process.exit(1);
  }
};

startServer();
