import express from "express";
import cors from "cors";
import { createServer } from "http";

const app = express();

app.use(cors(corsOptions));

const server = createServer(app);

