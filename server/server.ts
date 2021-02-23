import express from "express";
import cors from "cors";
import { createServer } from "http";

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

app.get("/", (request, response) => {
  response.send("Hello World!..");
});
server.listen(4000, () => {
  console.log("it's started listening...");
});
