import express from 'express';
import userRoutes from "./routes/UserRoutes"


const server = express();

server.use(express.json());
server.use('/api', userRoutes);

export default server;
