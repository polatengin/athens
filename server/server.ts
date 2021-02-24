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
  response.send("Hello World!..");
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

io.on("connection", (socket: Socket) => {
  connections.push({ socket: socket, clientId: socket.id });
  console.log(`client ${socket.id} connected @ ${new Date()}...`);
});

server.listen(4000, () => {
  console.log("it's started listening...");
});
