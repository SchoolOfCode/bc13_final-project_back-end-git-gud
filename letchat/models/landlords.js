import pool from "../db/index.js";

export async function getAllLandlords() {
  const query = "SELECT * FROM landlords";
  const result = await pool.query(query);
  console.log(result.rows);
  return result.rows;
}
