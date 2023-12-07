import express from "express";
import { getTechnicials } from "../controllers/technicial.js";
const router = express.Router();

router.get("/getTechnicials", getTechnicials);

export default router;
