import express from "express";
import {
  getCharData,
  getCharDataInv,
  getDashGraph,
  getDashInv,
  getDashTech,
  getRep,
  getSingleRep,
  getTopDashboard,
  getTopDashboardRequester,
} from "../controllers/report.js";
const router = express.Router();

router.get("/getReport", getRep);
router.post("/getSingleReport", getSingleRep);
router.get("/getTopDashboard", getTopDashboard);
router.post("/getTopDashboardRequster", getTopDashboardRequester);
router.get("/getChartData", getCharData);
router.get("/getChartInv", getCharDataInv);
router.post("/getDashTech", getDashTech);
router.get("/getDashInv", getDashInv);
router.get("/getDashGraph", getDashGraph);
// router.post("/getAssign", getAssign);
// router.post("/getAssignGroup", getAssGroup);
// router.post("/finishAss", finishAss);
// router.post("/conform", conform);
// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
