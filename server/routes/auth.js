import express from "express";
import {
  checkLogin,
  forgetPassword,
  getSettingEdit,
  login,
  logout,
  resetPassword,
  saveEditChange,
} from "../controllers/auth.js";

const router = express.Router();
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkLogin", checkLogin);
router.post("/getSettingInfo", getSettingEdit);
router.post("/saveSetting", saveEditChange);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);
export default router;
