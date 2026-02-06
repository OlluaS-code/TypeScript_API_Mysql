import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/UserRoutes";

const server = express();

server.use(express.json());

server.use("/users", userRoutes);

server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`💥 Erro detectado: ${err.message}`);

  res.status(500).json({
    status: "error",
    message: err.message || "Erro interno do servidor",
  });
});

export default server;
