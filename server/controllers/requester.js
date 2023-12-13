import bcrypt from "bcryptjs";
import { db } from "../db.js";
// import fs from "fs";
import { v4 as uuidv4 } from "uuid";
// import { v4 as uuidv4 } from "uuid";
// import db from "./your-database-connection-file"; // Import your database connection file

export const makeRequest = (req, res) => {
  const {
    title,
    priority,
    user_id,
    block,
    description,
    room,
    floor,
    categories,
  } = req.body;

  // Use placeholders in the query to prevent SQL injection
  const insertQuery = `INSERT INTO maintenance_requests (request_id, requester_id, request_date, completion_date, status, title,room,floor, description, image, priority, block_id,category) VALUES (?, ?, ?,?,?, ?, ?, ?, ?, ?, ?, ?,?)`;

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
      room,
      floor,
      description,
      null, // Assuming technician_id starts as null
      priority,
      block,
      categories,
    ],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data into the database");
        return;
      }

      //   console.log("Data inserted successfully");
      res.status(200).send("Make request successfully");
    }
  );
};
export const register = (req, res) => {
  const { fname, lname, password, email, phone, username } = req.body;

  // Use placeholders in the query to prevent SQL injection
  const insertQuery = `INSERT INTO users (user_id, role, username, password, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const hash = bcrypt.hashSync(password, 8);
  // Assuming you have a connection pool named 'db'
  db.query(
    insertQuery,
    [
      uuidv4(), // Generate a new UUID for the request_id
      "Requester",
      username,
      hash,
      fname, // Assuming 'Pending' is a valid status value
      lname,
      email,
      phone, // Assuming technician_id starts as null
    ],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error creating account ");
        return;
      }

      //   console.log("Data inserted successfully");
      res.status(200).send("Your successfully registered");
    }
  );
};
