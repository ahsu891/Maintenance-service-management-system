import express from "express";
import {
  checkPrevent,
  getPrevent,
  getSingleUpdatePrevent,
  prevent,
} from "../controllers/preventive.js";
const router = express.Router();
router.post("/maintenance", prevent);
router.post("/checkPrevent", checkPrevent);
router.post("/getPrevent", getPrevent);
router.post("/getSingleUpdatePrevent", getSingleUpdatePrevent);

export default router;
