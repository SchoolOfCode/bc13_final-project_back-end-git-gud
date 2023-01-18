import pool from "../db/index.js";

export async function getAllTickets() {
  const query = "SELECT * FROM tickets";
  const result = await pool.query(query);
  console.log(result.rows);
  return result.rows;
}

export async function getAllTicketsByLandlord(landlord_id) { 
  const query = "SELECT * FROM tickets WHERE landlord_id = $1";
  const result  = await pool.query(query, [landlord_id]);   
  console.log(result.rows);
  return result.rows; 
}

export async function getAllTicketsByTenant(tenant_id) { 
  const query = "SELECT * FROM tickets WHERE tenant_id = $1";
  const result  = await pool.query(query, [tenant_id]);   
  console.log(result.rows);
  return result.rows; 
}

export async function createNewTicket(ticket) {
  const query = "INSERT INTO tickets (property_id, landlord_id, tenant_id, completed, raised_by) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const result  = await pool.query(query, [ticket.property_id, ticket.landlord_id, ticket.tenant_id, ticket.completed, ticket.raised_by]);
  return result.rows[0];
}

export async function updateTicket(id, ticket) {
  const query = "UPDATE tickets SET completed = $1 WHERE id = $2 RETURNING *";
  const result  = await pool.query(query, [ticket.completed, id]);
  return result.rows[0];
}