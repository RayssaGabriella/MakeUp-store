require("dotenv").config();
const express = require("express");
const cors = require("cors");
const makeupRoutes = require("./routes/makeupRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API MakeUp Store rodando 💄 (MariaDB)" });
});

app.use("/makeups", makeupRoutes);

// Middleware simples para rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
