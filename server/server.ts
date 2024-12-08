import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204,
  "credentials": true
};

const app = express();

app.use(cors(corsOptions));

const server = createServer(app);

const connections: Socket[] = [];

app.get("/", (request, response) => {
  response.send(`There are ${connections.length} client connected to server...`);
});

app.post("/broadcast", (request, response) => {
  connections.forEach(connection => {
    connection.emit("broadcast", { date: new Date(), random: Math.random() });
  });

  response.json({ success: true });
});

const io = new Server(server, {
  path: "/socket.io",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.sockets.on("connection", (socket: Socket) => {

  console.log(`client with id: "${socket.id}" connected!`);
  connections.push(socket);

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);

    const index = connections.indexOf(socket);

    connections.splice(index, 1);
 });

});

server.listen(4000, () => {
  console.log("it's started listening...");
});
