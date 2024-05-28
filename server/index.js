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
import { v4 as uuidv4 } from "uuid";
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
let onlineUsers = [];
const addNewUser = (user_id, socketId) => {
  !onlineUsers.some((user) => user.user_id === user_id) &&
    onlineUsers.push({ user_id, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (user_id) => {
  return onlineUsers.find((user) => user.user_id === user_id);
};
io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);
  socket.on("newUser", (user_id) => {
    addNewUser(user_id, socket.id);
  });
  // Handle chat messages
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    // Broadcast message to all connected clients
    // console.log(msg);
  });
  socket.on("sendNotification", ({ id, user_id, type, title }) => {
    const sqlQuery = `INSERT INTO notify (id, user_id,type, title, created_at, status) VALUES (?,?,?,?,?,?);`;
    const receiver = getUser(user_id);
    // console.log(receiver);
    // console.log(us);
    db.query(
      sqlQuery,
      [id, user_id, type, title, new Date(), 0],
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);

          return;
        }

        // Return the query results as JSON
      }
    );
    // console.log(id, user_id, type, title);

    io.emit("getNotification", {
      id,
      user_id,
      type,
      title,
      date: new Date(),
    });
  });
  // send the notification for Technition
  socket.on("sendNotificationTech", ({ id, user_id, type, title }) => {
    const sqlQuery = `INSERT INTO notify (id, user_id,type, title, created_at, status) VALUES (?,?,?,?,?,?);`;
    // const receiver = getUser(user_id);
    // console.log(receiver);
    // console.log(user_id, "hhh");
    // user_id.forEach(element=>{
    //   db.query(
    //     sqlQuery,
    //     [id, element, type, title, new Date(), 0],
    //     (error, results) => {
    //       if (error) {
    //         console.error("Error executing the query:", error);

    //         return;
    //       }

    //       // Return the query results as JSON
    //     }
    //   );

    // })

    // console.log(id, user_id, type, title);
    user_id.forEach((element) => {
      io.emit("getNotificationTech", {
        id,
        user_id: element,
        type,
        title,
        date: new Date(),
      });
    });
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    removeUser(socket.id);
  });
});

////////////////////////////////////////////
app.get("/", (req, res) => {
  res.json("success");
});

// Function to check if it's time to execute daily code

// Check for daily execution every minute
// Check every minute
// setInterval(function () {
//   io.emit("getNotification", {
//     id: new Date(),
//     user_id: uuidv4(),
//     type: "Preventive Maintenance",
//     title: "Hello Ahmed",
//     date: new Date(),
//   });
// }, 10000); // Check every minute

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
