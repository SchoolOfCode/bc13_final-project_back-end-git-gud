import pool from "../db/index.js";

export async function getAllMessagesByTicketID(ticket_id) {
  const query = "SELECT * FROM messages WHERE ticket_id = $1";
  const result = await pool.query(query, [ticket_id]);
  console.log(result.rows);
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
