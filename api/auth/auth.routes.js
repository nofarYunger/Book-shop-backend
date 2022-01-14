const express = require("express");
const {
  register,
  login,
  logout,
  getLoggedinUser,
} = require("./auth.controller");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", getLoggedinUser);

module.exports = router;
