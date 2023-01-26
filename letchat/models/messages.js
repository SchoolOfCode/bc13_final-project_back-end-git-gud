import pool from "../db/index.js";

export async function getAllMessagesByTicketID(ticket_id) {
  const query =
    "SELECT messages.id,	messages.user_id,	messages.ticket_id,	messages.user_role,	messages.message,	messages.time,	messages.date, tickets.subject FROM messages INNER JOIN tickets ON tickets.id = messages.ticket_id WHERE ticket_id = $1";
  const result = await pool.query(query, [ticket_id]);
  return result.rows;
}

export async function createNewMessage(message) {
  const query =
    "INSERT INTO messages (user_id, ticket_id, user_role, message) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [
    message.user_id,
    message.ticket_id,
    message.user_role,
    message.message,
  ]);
  return result.rows[0];
}
