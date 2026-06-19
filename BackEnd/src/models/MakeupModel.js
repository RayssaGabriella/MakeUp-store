const db = require("../config/database");

const MakeupModel = {
  // Retorna todas as maquiagens
  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM makeups ORDER BY id");
    return rows;
  },

  // Busca uma maquiagem pelo id
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM makeups WHERE id = ?", [id]);
    return rows[0];
  },

  // Cria uma nova maquiagem
  create: async ({ nome, marca, categoria, cor, preco }) => {
    const sql = `
      INSERT INTO makeups (nome, marca, categoria, cor, preco)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [nome, marca, categoria, cor, preco]);
    return { id: result.insertId, nome, marca, categoria, cor, preco };
  },

  // Atualiza uma maquiagem existente
  update: async (id, { nome, marca, categoria, cor, preco }) => {
    const sql = `
      UPDATE makeups
      SET nome = ?, marca = ?, categoria = ?, cor = ?, preco = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [nome, marca, categoria, cor, preco, id]);
    return result.affectedRows;
  },

  // Remove uma maquiagem
  delete: async (id) => {
    const [result] = await db.query("DELETE FROM makeups WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = MakeupModel;
