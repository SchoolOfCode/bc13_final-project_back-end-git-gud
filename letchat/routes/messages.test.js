import request from "supertest";
import {expect,test} from "@jest/globals";
import app from "../app.js";
import pool from "../db/index.js";



afterAll(async () => {
    await pool.end();
});


test ("GET all messages from a ticket ID", async () => {
    const response = await request(app).get("/api/messages/tickets/112");
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

test ("POST a new message", async () => {
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
