import express from "express";
import { getReq, getReqAss } from "../controllers/request.js";
const router = express.Router();

router.get("/getRequests", getReq);
router.get("/getRequestsAssign", getReqAss);

// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
