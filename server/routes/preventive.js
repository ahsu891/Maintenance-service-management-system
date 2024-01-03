import express from "express";
import {
  checkPrevent,
  getPrevent,
  prevent,
} from "../controllers/preventive.js";
const router = express.Router();
router.post("/maintenance", prevent);
router.post("/checkPrevent", checkPrevent);
router.post("/getPrevent", getPrevent);

export default router;
