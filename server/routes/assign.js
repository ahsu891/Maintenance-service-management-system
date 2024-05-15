import express from "express";
import {
  AssignTech,
  ComplainMessege,
  RejectMassage,
  conform,
  finishAss,
  getAssGroup,
  getAssign,
  getRejectMessage,
  makeCancelReject,
} from "../controllers/assign.js";
// import { AssignTech } from "../controllers/assign.js";

const router = express.Router();

router.post("/assingTech", AssignTech);
router.post("/getAssign", getAssign);
router.post("/getAssignGroup", getAssGroup);
router.post("/finishAss", finishAss);
router.post("/conform", conform);
router.post("/rejectMessage", RejectMassage);
router.post("/complainMessage", ComplainMessege);
router.post("/getRejectMessage", getRejectMessage);
router.post("/cancelReject", makeCancelReject);

// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
