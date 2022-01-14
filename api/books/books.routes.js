const express = require("express");
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware");
const { log } = require("../../middlewares/logger.middleware");
const {
  getAll,
  getById,
  saveBook,
  remove,
} = require("./books.controller");
const router = express.Router();

router.get("/", log, getAll);
router.get("/:id", log, getById);
// router.post("/", requireAuth, requireAdmin, saveBook);
router.post("/:id?", log, saveBook);
// router.delete("/:id", requireAuth, requireAdmin, remove);
router.delete("/:id",  remove);
console.log("all fine at the book router!");

module.exports = router;