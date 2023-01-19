import express from "express";
import {
  getAllMessagesByTicketID,
  createNewMessage,
} from "../models/messages.js";

export const messagesRouter = express.Router();

messagesRouter.get("/tickets/:id", async (req, res) => {
  const allMessages = await getAllMessagesByTicketID(req.params.id);
  res.status(200);
  res.json({ success: true, payload: allMessages });
});

messagesRouter.post("/", async (req, res) => {
  const newMessage = await createNewMessage(req.body);
  res.status(200);
  res.json({ success: true, payload: newMessage });
});
