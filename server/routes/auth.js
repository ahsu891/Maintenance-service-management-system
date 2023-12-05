import express from "express";
import { checkLogin, login, logout } from "../controllers/auth.js";

const router = express.Router();
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkLogin", checkLogin);
export default router;
