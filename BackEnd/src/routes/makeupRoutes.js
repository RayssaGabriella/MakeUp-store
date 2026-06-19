const express = require("express");
const router = express.Router();
const MakeupController = require("../controllers/MakeupController");

router.get("/", MakeupController.index);        // Lista todas
router.get("/:id", MakeupController.show);       // Busca uma por id
router.post("/", MakeupController.store);        // Cria nova
router.put("/:id", MakeupController.update);     // Atualiza existente
router.delete("/:id", MakeupController.destroy); // Remove

module.exports = router;
