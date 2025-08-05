import "reflect-metadata";
import "./frameworks/di/container";
import app from "./frameworks/express/app";
import { connectDB } from "./lib/db";
import { connectRedisClient } from "frameworks/cache/redis.connect";
import { createServer } from "http";
import { SocketServer } from "frameworks/socket/socketServer";
import { container } from "tsyringe";

connectDB();
connectRedisClient();

const httpServer = createServer(app);

const socketServer = container.resolve(SocketServer);

socketServer.initialize(httpServer);

socketServer.onConnection((socket) => {
  // console.log("New client connected: ", socket);

  // socket.on("test:event", (data) => {
  //   console.log("Received test:event with data: ", data);
  //   socket.emit("test:response", { message: "hello from server" });
  // });

  console.log("socket server connecte successfull: ", socket);
});

httpServer.listen(3000, () => {
  console.log(" server is running, http://localhost:3000");
});
