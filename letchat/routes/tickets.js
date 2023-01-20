import express from "express";



import {
  getAllTickets,
  getAllTicketsByLandlord,
  getAllTicketsByTenant,
  createNewTicket,
  updateTicket,
} from "../models/tickets.js";

export const ticketsRouter = express.Router();

ticketsRouter.get("/", async (req, res) => {
  try {
    const allTickets = await getAllTickets();
    // console.log(allTickets);
    res.status(200);
    res.json({ success: true, payload: allTickets });
  } catch (error) {
    // console.log(error);
    res.status(500);
    res.json({ success: false, message: "Failed to get all tickets" });
  }
});

ticketsRouter.get("/landlords/:id", async (req, res) => {
  const allTicketsByLandlord = await getAllTicketsByLandlord(req.params.id);
  if (allTicketsByLandlord.length === 0) {
    res.status(404);
    res.json({
      success: false,
      message: "No tickets found for this landlord",
    });
  } else {
    // console.log(allTicketsByLandlord);
    res.status(200);
    res.json({ success: true, payload: allTicketsByLandlord });
  } 
});

ticketsRouter.get("/tenants/:id", async (req, res) => {
  const allTicketsByTenant = await getAllTicketsByTenant(req.params.id);
  if (allTicketsByTenant.length === 0) {
    res.status(404);
    res.json({
      success: false,
      message: "No tickets found for this tenant",
    });
  } else {
    // console.log(allTicketsByTenant);
    res.status(200);
    res.json({ success: true, payload: allTicketsByTenant });
  } 
});

ticketsRouter.post("/", async (req, res) => {
  try {
    const newTicket = await createNewTicket(req.body);
    // console.log(newTicket);
    res.status(200);
    res.json({ success: true, payload: newTicket });
  } catch (error) {
    // console.log(error);
    res.status(404);
    res.json({
      success: false,
      message: "Failed to create new ticket",
    });
  }
});

ticketsRouter.patch("/:id", async (req, res) => {
  try {
    const updatedTicket = await updateTicket(req.params.id, req.body);
    // console.log(updatedTicket);
    res.status(200);
    res.json({ success: true, payload: updatedTicket });
  } catch (error) {
    // console.log(error);
    res.status(500);
    res.json({
      success: false,
      message: "Failed to update ticket",
    });
  }
});
