import express from "express";
import { deleteTech, getTechnicials } from "../controllers/technicial.js";
const router = express.Router();

router.get("/getTechnicials", getTechnicials);
router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
