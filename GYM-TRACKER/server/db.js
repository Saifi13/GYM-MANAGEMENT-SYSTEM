import pg from "pg";

const { Pool } = pg;

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Gym-tracker",
  password: "Saifi1323",
  port: 5432
});


export default db;