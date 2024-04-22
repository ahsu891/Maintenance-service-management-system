import express from "express";
import {
  checkLogin,
  getSettingEdit,
  login,
  logout,
} from "../controllers/auth.js";

const router = express.Router();
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkLogin", checkLogin);
router.post("/getSettingInfo", getSettingEdit);
export default router;
