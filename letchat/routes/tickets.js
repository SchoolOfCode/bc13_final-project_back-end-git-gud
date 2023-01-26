import express from "express";

import {
  getAllTickets,
  getAllTicketsByLandlord,
  getAllTicketsByTenant,
  createNewTicket,
  updateTicket,
} from "../models/tickets.js";

export const ticketsRouter = express.Router();

// Get all tickets
ticketsRouter.get("/", async (req, res) => {
  try {
    const allTickets = await getAllTickets();
    res.status(200);
    res.json({ success: true, payload: allTickets });
  } catch (error) {
    res.status(500);
    res.json({ success: false, message: "Failed to get all tickets" });
  }
});

// Get tickets by landlord
ticketsRouter.get("/landlords/:id", async (req, res) => {
  const allTicketsByLandlord = await getAllTicketsByLandlord(req.params.id);
  if (allTicketsByLandlord.length === 0) {
    res.status(404);
    res.json({
      success: false,
      message: "No tickets found for this landlord",
    });
  } else {
    res.status(200);
    res.json({ success: true, payload: allTicketsByLandlord });
  }
});

// Get tickets by tenant
ticketsRouter.get("/tenants/:id", async (req, res) => {
  const allTicketsByTenant = await getAllTicketsByTenant(req.params.id);
  if (allTicketsByTenant.length === 0) {
    res.status(404);
    res.json({
      success: false,
      message: "No tickets found for this tenant",
    });
  } else {
    res.status(200);
    res.json({ success: true, payload: allTicketsByTenant });
  }
});

// Create new ticket
ticketsRouter.post("/", async (req, res) => {
  try {
    const newTicket = await createNewTicket(req.body);
    res.status(200);
    res.json({ success: true, payload: newTicket });
  } catch (error) {
    res.status(404);
    res.json({
      success: false,
      message: "Failed to create new ticket",
    });
  }
});

// Update ticket
ticketsRouter.patch("/:id", async (req, res) => {
  try {
    const updatedTicket = await updateTicket(req.params.id, req.body);
    res.status(200);
    res.json({ success: true, payload: updatedTicket });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: "Failed to update ticket",
    });
  }
});
