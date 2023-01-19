import pg from "pg";

const databaseURL = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: databaseURL,
});

export default pool;
