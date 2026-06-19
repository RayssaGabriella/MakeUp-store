const MakeupModel = require("../models/MakeupModel");

function validateMakeupData({ nome, marca, categoria, cor, preco }) {
  if (!nome || !marca || !categoria || !cor) {
    return "Os campos nome, marca, categoria e cor são obrigatórios.";
  }
  if (preco === undefined || preco === null || isNaN(Number(preco))) {
    return "O campo preco é obrigatório e deve ser numérico.";
  }
  return null;
}

const MakeupController = {
  // GET /makeups
  async index(req, res) {
    try {
      const makeups = await MakeupModel.findAll();
      res.json(makeups);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar maquiagens.", details: err.message });
    }
  },

  // GET /makeups/:id
  async show(req, res) {
    try {
      const makeup = await MakeupModel.findById(req.params.id);
      if (!makeup) {
        return res.status(404).json({ error: "Maquiagem não encontrada." });
      }
      res.json(makeup);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar maquiagem.", details: err.message });
    }
  },

  // POST /makeups
  async store(req, res) {
    try {
      const errorMsg = validateMakeupData(req.body);
      if (errorMsg) {
        return res.status(400).json({ error: errorMsg });
      }

      const { nome, marca, categoria, cor, preco } = req.body;
      const novaMakeup = await MakeupModel.create({
        nome,
        marca,
        categoria,
        cor,
        preco: Number(preco),
      });

      res.status(201).json(novaMakeup);
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar maquiagem.", details: err.message });
    }
  },

  // PUT /makeups/:id
  async update(req, res) {
    try {
      const { id } = req.params;

      const existente = await MakeupModel.findById(id);
      if (!existente) {
        return res.status(404).json({ error: "Maquiagem não encontrada." });
      }

      const errorMsg = validateMakeupData(req.body);
      if (errorMsg) {
        return res.status(400).json({ error: errorMsg });
      }

      const { nome, marca, categoria, cor, preco } = req.body;
      await MakeupModel.update(id, {
        nome,
        marca,
        categoria,
        cor,
        preco: Number(preco),
      });

      res.json({ id: Number(id), nome, marca, categoria, cor, preco: Number(preco) });
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar maquiagem.", details: err.message });
    }
  },

  // DELETE /makeups/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const existente = await MakeupModel.findById(id);
      if (!existente) {
        return res.status(404).json({ error: "Maquiagem não encontrada." });
      }

      await MakeupModel.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Erro ao excluir maquiagem.", details: err.message });
    }
  },
};

module.exports = MakeupController;
