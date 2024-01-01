import express from "express";
import { prevent } from "../controllers/preventive.js";
const router = express.Router();
router.post("/maintenance", prevent);
export default router;
