import request from "supertest";
import { expect, test } from "@jest/globals";
import app from "../app.js";
import pool from "../db/index.js";

// Close pool after jest finishes
afterAll(async () => {
  await pool.end();
});

test("GET all properties by landlord ID should fail for landlord IDs that do not exist", async() => {
  const response = await request(app).get("/api/landlords/9999");
  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("No properties found for landlord ID");
})

test("GET all properties by landlord ID should pass for landlord IDs that exist", async() => {
  const response = await request(app).get("/api/landlords/1");
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  for (let property of response.body.payload) {
    expect(property).toHaveProperty("address");
    expect(property).toHaveProperty("postcode");
    expect(property).toHaveProperty("landlord_id");
  }
})