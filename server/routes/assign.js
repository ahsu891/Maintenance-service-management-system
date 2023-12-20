import express from "express";
import { AssignTech, getAssign } from "../controllers/assign.js";
// import { AssignTech } from "../controllers/assign.js";

const router = express.Router();

router.post("/assingTech", AssignTech);
router.post("/getAssign", getAssign);

// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
