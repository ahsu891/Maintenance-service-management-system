import express from "express";
import { db } from "./db.js";
import authRoutes from "./routes/auth.js";
import techRoutes from "./routes/technicial.js";
import ReqRoutes from "./routes/requester.js";
import ReqDataRoutes from "./routes/request.js";
import AssRoutes from "./routes/assign.js";
import PrevRoutes from "./routes/preventive.js";
import ReportRoutes from "./routes/report.js";
import InventRoutes from "./routes/inventory.js";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { scheduleMaintenanceTasks } from "./controllers/preventive.js";
const app = express();

const currentDir = process.cwd();
app.use("/image", express.static(path.join(currentDir, "image")));
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
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
///////////////////////////////////////

app.use("/api/auth", authRoutes);
app.use("/api/technicial", techRoutes);
app.use("/api/requester", ReqRoutes);
app.use("/api/request", ReqDataRoutes);
app.use("/api/assign", AssRoutes);
app.use("/api/prevent", PrevRoutes);
app.use("/api/report", ReportRoutes);
app.use("/api/inventory", InventRoutes);
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle chat messages
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    // Broadcast message to all connected clients
    console.log(msg);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.json("success");
});

server.listen(8800, () => {
  console.log("Server running on port 8800...");
  db.connect((error) => {
    if (error) {
      console.error("Error connecting to the database:", error);
      return;
    }
    console.log("Connected to the database.");
  });
});
