import express from "express";
import {
  getSingleRequester,
  makeRequest,
  register,
} from "../controllers/requester.js";

const router = express.Router();

router.post("/makeRequest", makeRequest);
router.post("/register", register);
router.post("/getSingleInfo", getSingleRequester);
// router.delete("/deleteTech/:technician_id", deleteTech);

export default router;
