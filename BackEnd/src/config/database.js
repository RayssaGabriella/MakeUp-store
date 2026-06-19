require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "makeup_store",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Testa a conexão ao iniciar
pool
  .getConnection()
  .then((conn) => {
    console.log("Conectado ao MariaDB:", process.env.DB_NAME);
    conn.release();
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MariaDB:", err.message);
  });

module.exports = pool;
