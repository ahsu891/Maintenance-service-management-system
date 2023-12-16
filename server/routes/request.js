import express from "express";
import { getReq } from "../controllers/request.js";
const router = express.Router();

router.get("/getRequests", getReq);

// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
