import express from "express";
import morgan from "morgan";
import cors from "cors";

import { landlordsRouter } from "./routes/landlords.js";
import { ticketsRouter } from "./routes/tickets.js";
import { messagesRouter } from "./routes/messages.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/landlords", landlordsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/messages", messagesRouter);

export default app;
