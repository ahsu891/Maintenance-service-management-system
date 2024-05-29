import express from "express";
import {
  dashboardSuper,
  deleteTheRequester,
  getSingleRequester,
  getTheRequester,
  getstatus,
  makeRequest,
  register,
  toggleStatus,
} from "../controllers/requester.js";

const router = express.Router();

router.post("/makeRequest", makeRequest);
router.post("/register", register);
router.post("/getSingleInfo", getSingleRequester);
router.get("/getRequester", getTheRequester);
router.post("/deleteRequester", deleteTheRequester);
router.get("/getDashboardSuper", dashboardSuper);
router.get("/getStatus", getstatus);
router.post("/undoStatus", toggleStatus);

// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
