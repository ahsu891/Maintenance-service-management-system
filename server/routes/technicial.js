import express from "express";
import {
  addTech,
  deleteTech,
  getDashTableTech,
  getTechnicials,
  getTheTechicianNME,
  toggele,
} from "../controllers/technicial.js";
const router = express.Router();
router.post("/addtech", addTech);
router.post("/toggle/:technician_id", toggele);
router.get("/getTechnicials", getTechnicials);
router.delete("/deleteTech/:technician_id", deleteTech);
router.post("/getDashTableTech", getDashTableTech);
router.get("/getTechicianName", getTheTechicianNME);

export default router;
