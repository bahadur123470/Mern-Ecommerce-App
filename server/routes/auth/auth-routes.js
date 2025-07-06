import express from "express";
import { registerUser } from "../../controllers/auth/auth.controller.js";

const router = express.Router();
router.post("/register", registerUser)

module.exports = router