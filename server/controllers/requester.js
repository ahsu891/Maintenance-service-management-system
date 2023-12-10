import { db } from "../db.js";
// import fs from "fs";
import { v4 as uuidv4 } from "uuid";
// import { v4 as uuidv4 } from "uuid";
// import db from "./your-database-connection-file"; // Import your database connection file

export const makeRequest = (req, res) => {
  const { title, priority, user_id, block, description } = req.body;

  // Use placeholders in the query to prevent SQL injection
  const insertQuery = `INSERT INTO maintenance_requests (request_id, requester_id, request_date, completion_date, status, title, description, image, priority, block_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Assuming you have a connection pool named 'db'
  db.query(
    insertQuery,
    [
      uuidv4(), // Generate a new UUID for the request_id
      user_id,
      new Date(),
      null,
      "Pending", // Assuming 'Pending' is a valid status value
      title,
      description,
      null, // Assuming technician_id starts as null
      priority,
      block,
    ],
    (err, results) => {
      if (err) {
        // console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data into the database");
        return;
      }

      //   console.log("Data inserted successfully");
      res.status(200).send("Make request successfully");
    }
  );
};
