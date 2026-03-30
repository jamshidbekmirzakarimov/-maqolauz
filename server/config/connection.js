import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "ecommerce_products",
});

pool
  .connect()
  .then(() => console.log("Database ulandi ✅"))
  .catch((error) => console.error("Xatolik ❌: ", error));

export default pool;
