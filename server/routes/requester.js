import express from "express";
import { makeRequest } from "../controllers/requester.js";

const router = express.Router();

router.post("/makeRequest", makeRequest);
// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
