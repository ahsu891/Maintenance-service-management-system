import express from "express";
import {
  deletefun,
  getDashTable,
  getReq,
  getReqAss,
} from "../controllers/request.js";
const router = express.Router();

router.get("/getRequests", getReq);
router.get("/getRequestsAssign", getReqAss);
router.post("/getDashTable", getDashTable);
router.post("/deleteComplain", deletefun);

// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
