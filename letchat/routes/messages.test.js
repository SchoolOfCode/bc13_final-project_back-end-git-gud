import request from "supertest";
import { expect, test } from "@jest/globals";
import app from "../app.js";
import pool from "../db/index.js";

// Close pool after jest finishes
afterAll(async () => {
  await pool.end();
});

test("GET all messages from a ticket ID should fail for IDs that do not exist", async () => {
  const response = await request(app).get("/api/messages/tickets/99999");
  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("No messages found for this ticket ID");
});

test("GET all messages from a ticket ID should pass for IDs that exist", async () => {
  const response = await request(app).get("/api/messages/tickets/1");
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  for (let message of response.body.payload) {
    expect(message).toHaveProperty("user_id");
    expect(message).toHaveProperty("ticket_id");
    expect(message).toHaveProperty("user_role");
    expect(message).toHaveProperty("message");
    expect(message).toHaveProperty("time");
    expect(message).toHaveProperty("date");
  }
});

test("POST a new message should pass for ticket IDs that exist", async () => {
  const response = await request(app).post("/api/messages/").send({
    user_id: 1,
    ticket_id: 1,
    user_role: "landlord",
    message: "Hello",
  });
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.payload).toHaveProperty("user_id");
  expect(response.body.payload).toHaveProperty("ticket_id");
  expect(response.body.payload).toHaveProperty("user_role");
  expect(response.body.payload).toHaveProperty("message");
  expect(response.body.payload).toHaveProperty("time");
  expect(response.body.payload).toHaveProperty("date");
});

test("POST a new message should fail for a ticket ID that does not exist", async () => {
  const response = await request(app).post("/api/messages/").send({
    user_id: 1,
    ticket_id: 99999,
    user_role: "landlord",
    message: "Hello",
  });
  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Failed to create new message");
});