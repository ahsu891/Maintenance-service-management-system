import express from "express";
import { db } from "./db.js";
import authRoutes from "./routes/auth.js";
import techRoutes from "./routes/technicial.js";
import ReqRoutes from "./routes/requester.js";
import ReqDataRoutes from "./routes/request.js";
import AssRoutes from "./routes/assign.js";
import PrevRoutes from "./routes/preventive.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import { scheduleMaintenanceTasks } from "./controllers/preventive.js";
const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:3001"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
///////////////////////////////////////

app.use("/api/auth", authRoutes);
app.use("/api/technicial", techRoutes);
app.use("/api/requester", ReqRoutes);
app.use("/api/request", ReqDataRoutes);
app.use("/api/assign", AssRoutes);
app.use("/api/prevent", PrevRoutes);

////////////////////////////////////////////
app.get("/", (req, res) => {
  res.json("success");
});

app.listen(8800, () => {
  console.log("Server running on port 8800...");
  db.connect((error) => {
    if (error) {
      console.error("Error connecting to the database:", error);
      return;
    }
    console.log("Connected to the database.");
  });
});
