import express from "express";
import {
  getCharData,
  getRep,
  getSingleRep,
  getTopDashboard,
} from "../controllers/report.js";
const router = express.Router();

router.get("/getReport", getRep);
router.post("/getSingleReport", getSingleRep);
router.get("/getTopDashboard", getTopDashboard);
router.get("/getChartData", getCharData);
// router.post("/getAssign", getAssign);
// router.post("/getAssignGroup", getAssGroup);
// router.post("/finishAss", finishAss);
// router.post("/conform", conform);
// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
