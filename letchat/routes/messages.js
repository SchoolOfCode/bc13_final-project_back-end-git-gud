import express from "express";
import {
  getAllMessagesByTicketID,
  createNewMessage,
} from "../models/messages.js";

export const messagesRouter = express.Router();

messagesRouter.get("/tickets/:id", async (req, res) => {
  try {
    const allMessages = await getAllMessagesByTicketID(req.params.id);
    res.status(200);
    res.json({ success: true, payload: allMessages });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      success: false,
      message: "Failed to get all messages by ticket ID",
    });
  }
});

messagesRouter.post("/", async (req, res) => {
  try {
    const newMessage = await createNewMessage(req.body);
    res.status(200);
    res.json({ success: true, payload: newMessage });
  } catch (error) {
    // console.log(error);
    res.status(500);
    res.json({ success: false, message: "Failed to create new message" });
  }
});
