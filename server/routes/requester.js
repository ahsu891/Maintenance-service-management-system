import express from "express";
import {
  deleteTheRequester,
  getSingleRequester,
  getTheRequester,
  makeRequest,
  register,
} from "../controllers/requester.js";

const router = express.Router();

router.post("/makeRequest", makeRequest);
router.post("/register", register);
router.post("/getSingleInfo", getSingleRequester);
router.get("/getRequester", getTheRequester);
router.post("/deleteRequester", deleteTheRequester);

// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
