import express from "express";
import { getAllTickets, getAllTicketsByLandlord, getAllTicketsByTenant, createNewTicket, updateTicket } from "../models/tickets.js";

export const ticketsRouter = express.Router();

ticketsRouter.get("/", async (req, res) => {
  const allTickets = await getAllTickets();
  console.log(allTickets);
  res.status(200);
  res.json({ success: true, payload: allTickets });
});

ticketsRouter.get("/landlords/:id", async (req, res) => {
    const allTicketsByLandlord = await getAllTicketsByLandlord(req.params.id);
    console.log(allTicketsByLandlord);
    res.status(200);
    res.json({ success: true, payload: allTicketsByLandlord });
});

ticketsRouter.get("/tenants/:id", async (req, res) => {
    const allTicketsByTenant = await getAllTicketsByTenant(req.params.id);
    console.log(allTicketsByTenant);
    res.status(200);
    res.json({ success: true, payload: allTicketsByTenant });
});

ticketsRouter.post("/", async (req, res) => {
    const newTicket = await createNewTicket(req.body);
    res.status(200);
    res.json({ success: true, payload: newTicket });
});

ticketsRouter.patch("/:id", async (req, res) => {
    const updatedTicket = await updateTicket(req.params.id, req.body);
    res.status(200);
    res.json({ success: true, payload: updatedTicket });
});