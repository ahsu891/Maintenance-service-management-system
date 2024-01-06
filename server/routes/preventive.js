import express from "express";
import {
  checkPrevent,
  deletePrevent,
  getPrevent,
  getPreventiveConf,
  getSingleUpdatePrevent,
  prevent,
} from "../controllers/preventive.js";
const router = express.Router();
router.post("/maintenance", prevent);
router.post("/checkPrevent", checkPrevent);
router.post("/getPrevent", getPrevent);
router.get("/getPreventConf", getPreventiveConf);
router.post("/getSingleUpdatePrevent", getSingleUpdatePrevent);
router.delete("/deletePrevent/:id", deletePrevent);
export default router;
