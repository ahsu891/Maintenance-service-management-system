import express from "express";
import { db } from "./db.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
///////////////////////////////////////

app.use("/api/auth", authRoutes);

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
