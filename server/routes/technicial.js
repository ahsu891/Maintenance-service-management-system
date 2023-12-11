import express from "express";
import {
  addTech,
  deleteTech,
  getTechnicials,
} from "../controllers/technicial.js";
const router = express.Router();
router.post("/addtech", addTech);
router.get("/getTechnicials", getTechnicials);
router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
