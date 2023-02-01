import pool from "../db/index.js";

export async function getAllTickets() {
  try {
    const query = "SELECT * FROM tickets";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllTicketsByLandlord(landlord_id) {
  try {
    const query =
      "SELECT tickets.id, tickets.subject, tickets.message, tickets.landlord_id, tickets.property_id, tickets.completed, tickets.raised_by, tickets.date, tickets.time, tenants.first_name, tenants.last_name FROM tickets INNER JOIN tenants ON tenants.id = tickets.tenant_id WHERE tickets.landlord_id = $1";
    const result = await pool.query(query, [landlord_id]);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllTicketsByTenant(tenant_id) {
  try {
    const query = "SELECT * FROM tickets WHERE tenant_id = $1";
    const result = await pool.query(query, [tenant_id]);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createNewTicket(ticket) {
  try {
    const query =
    "INSERT INTO tickets (property_id, landlord_id, tenant_id, completed, raised_by, subject, message) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const result = await pool.query(query, [
    ticket.property_id,
    ticket.landlord_id,
    ticket.tenant_id,
    ticket.completed,
    ticket.raised_by,
    ticket.subject,
    ticket.message,
  ]);
  const ticket_id = result.rows[0].id;
  const msgQuery =
    "INSERT INTO messages (user_id, ticket_id, user_role, message) VALUES ($1, $2, $3, $4) RETURNING *";
  const msgResult = await pool.query(msgQuery, [
    ticket.tenant_id,
    ticket_id,
    ticket.raised_by,
    ticket.message,
  ]);
  return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }

}

export async function updateTicket(id, ticket) {
  try {
    const query = "UPDATE tickets SET completed = $1 WHERE id = $2 RETURNING *";
    const result = await pool.query(query, [ticket.completed, id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
