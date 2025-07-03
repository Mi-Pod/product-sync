const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");

// CRUD Routes
router.post("/", itemController.create);
router.get("/:id", itemController.getById);
router.put("/:id", itemController.update);
router.delete("/:id", itemController.delete);

// Paginated/Filtered Query Route
router.get("/", itemController.paginated);

// Import/Export Routes
router.post("/import", itemController.importItems);
router.get("/export", itemController.exportItems);

// Synchronize Items
router.post("/sync", itemController.synchronizeItems);

module.exports = router;
