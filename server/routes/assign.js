import express from "express";
import {
  AssignTech,
  conform,
  finishAss,
  getAssGroup,
  getAssign,
} from "../controllers/assign.js";
// import { AssignTech } from "../controllers/assign.js";

const router = express.Router();

router.post("/assingTech", AssignTech);
router.post("/getAssign", getAssign);
router.post("/getAssignGroup", getAssGroup);
router.post("/finishAss", finishAss);
router.post("/conform", conform);

// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
