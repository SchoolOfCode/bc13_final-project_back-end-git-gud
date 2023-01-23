import express from "express";
import {
  getAllMessagesByTicketID,
  createNewMessage,
} from "../models/messages.js";

export const messagesRouter = express.Router();

// Get messages by ticket ID
messagesRouter.get("/tickets/:id", async (req, res) => {
  const allMessagesByTicketID = await getAllMessagesByTicketID(req.params.id);
  if (allMessagesByTicketID.length === 0) {
    res.status(404);
    res.json({
      success: false,
      message: "No messages found for this ticket ID",
    });
  } else {
    res.status(200);
    res.json({ success: true, payload: allMessagesByTicketID });
  }
});

// Create new message
messagesRouter.post("/", async (req, res) => {
  try {
    const newMessage = await createNewMessage(req.body);
    res.status(200);
    res.json({ success: true, payload: newMessage });
  } catch (error) {
    res.status(404);
    res.json({ success: false, message: "Failed to create new message" });
  }
});
