import pool from "../db/index.js";

export async function getAllLandlords() {
  try {
    const query = "SELECT * FROM landlords";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllPropertiesByLandlordID(landlord_id) {
  try {
    const query =
      "SELECT properties.address, properties.postcode, properties.landlord_id FROM properties WHERE landlord_id = $1";
    const result = await pool.query(query, [landlord_id]);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
