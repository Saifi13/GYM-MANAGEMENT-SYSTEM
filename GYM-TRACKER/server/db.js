import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "Gym-tracker",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432
});

export default db;