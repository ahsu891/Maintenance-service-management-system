import express from "express";
import { makeRequest, register } from "../controllers/requester.js";

const router = express.Router();

router.post("/makeRequest", makeRequest);
router.post("/register", register);
// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
