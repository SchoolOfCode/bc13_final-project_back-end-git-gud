import request from "supertest";
import { expect, test } from "@jest/globals";
import app from "../app.js";
import pool from "../db/index.js";

// Close pool after jest finishes
afterAll(async () => {
  await pool.end();
});

test("GET tickets", async () => {
  const response = await request(app).get("/api/tickets/");
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  for (let ticket of response.body.payload) {
    expect(ticket).toHaveProperty("id");
    expect(ticket).toHaveProperty("property_id");
    expect(ticket).toHaveProperty("landlord_id");
    expect(ticket).toHaveProperty("tenant_id");
    expect(ticket).toHaveProperty("completed");
    expect(ticket).toHaveProperty("raised_by");
    expect(ticket).toHaveProperty("subject");
    expect(ticket).toHaveProperty("message");
  }
});

test("GET tickets by landlord fails when there are no tickets for that landlord", async () => {
  const response = await request(app).get("/api/tickets/landlords/99999");
  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("No tickets found for this landlord");
});

test("GET tickets by landlord passes when the landlord has tickets", async () => {
  const response = await request(app).get("/api/tickets/landlords/1");
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  let length = response.body.payload.length;
  expect(length).toBeGreaterThanOrEqual(1);
});

test("GET tickets by tenant fails when there are no tickets for that tenant", async () => {
  const response = await request(app).get("/api/tickets/tenants/18");
  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("No tickets found for this tenant");
});

test("GET tickets by tenant passes when the tenant has tickets", async () => {
  const response = await request(app).get("/api/tickets/tenants/1");
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  for (let ticket of response.body.payload) {
    expect(ticket).toHaveProperty("id");
    expect(ticket).toHaveProperty("property_id");
    expect(ticket).toHaveProperty("landlord_id");
    expect(ticket).toHaveProperty("tenant_id");
    expect(ticket).toHaveProperty("completed");
    expect(ticket).toHaveProperty("raised_by");
    expect(ticket).toHaveProperty("subject");
    expect(ticket).toHaveProperty("message");
  }
});

test("POST tickets", async () => {
  const response = await request(app).post("/api/tickets/").send({
    property_id: 1,
    landlord_id: 19,
    tenant_id: 1,
    completed: false,
    raised_by: "tenant",
    subject: "test",
    message: "test",
  });
  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Failed to create new ticket");
});

test("POST tickets", async () => {
  const response = await request(app).post("/api/tickets/").send({
    property_id: 1,
    landlord_id: 1,
    tenant_id: 1,
    completed: false,
    raised_by: "tenant",
    subject: "test",
    message: "test",
  });
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.payload).toHaveProperty("id");
  expect(response.body.payload).toHaveProperty("property_id");
  expect(response.body.payload).toHaveProperty("landlord_id");
  expect(response.body.payload).toHaveProperty("tenant_id");
  expect(response.body.payload).toHaveProperty("completed");
  expect(response.body.payload).toHaveProperty("raised_by");
  expect(response.body.payload).toHaveProperty("subject");
  expect(response.body.payload).toHaveProperty("message");
});
