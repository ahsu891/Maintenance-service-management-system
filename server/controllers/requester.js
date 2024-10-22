import bcrypt from "bcryptjs";
import { db } from "../db.js";
// import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
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
  const { fname, lname, password, phone, username, job, position, email } =
    req.body;
  const id = uuidv4();
  // Use placeholders in the query to prevent SQL injection
  const insertQuery = `INSERT INTO users (user_id, role, username, password, first_name, last_name, job,position, phone,email) VALUES (?, ?,?, ?, ?,?,?, ?, ?, ?)`;
  const hash = bcrypt.hashSync(password, 8);
  // Assuming you have a connection pool named 'db'
  db.query(
    insertQuery,
    [
      id, // Generate a new UUID for the request_id
      "Requester",
      username,
      hash,
      fname, // Assuming 'Pending' is a valid status value
      lname,
      job,
      position,
      phone,
      email, // Assuming technician_id starts as null
    ],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error creating account ");
        return;
      }
      const token = jwt.sign(
        { username: username, user_id: id, role: "requester" },
        process.env.JWT_SECRET
      );

      res.cookie("token", token, { httpOnly: true });
      //   console.log("Data inserted successfully");
      res.status(200).send({
        message: "Your successfully registered",
        user_id: id,
      });
    }
  );
};

export const getSingleRequester = (req, res) => {
  // Execute the SQL query
  const { requester_id } = req.body;
  const sqld = `SELECT * FROM maintenance_requests 
  WHERE requester_id=? AND maintenance_requests.status!="Closed" AND maintenance_requests.status!="Cancelled" 
  ORDER BY maintenance_requests.request_date DESC `;

  db.query(sqld, [requester_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      throw new Error("Something went wrong");
      // res.status(500).send("Internal Server Error");
      // return;
    }

    // console.log(results);
    // Return the query results as JSON
    res.status(200).json(results);
  });
};

export const getTheRequester = (req, res) => {
  // Execute the SQL query

  const sqld = `SELECT user_id, CONCAT(first_name, ' ', last_name) AS full_name, job, phone
  FROM users; `;

  db.query(sqld, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      throw new Error("Something went wrong");
      // res.status(500).send("Internal Server Error");
      // return;
    }

    // console.log(results);
    // Return the query results as JSON
    res.status(200).send(results);
  });
};
export const deleteTheRequester = (req, res) => {
  // Execute the SQL query
  const { user_id } = req.body;
  const sqld = `DELETE FROM users WHERE users.user_id = ? `;

  db.query(sqld, [user_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      throw new Error("Something went wrong");
      // res.status(500).send("Internal Server Error");
      // return;
    }

    // console.log(results);
    // Return the query results as JSON
    res.status(200).send("Successfully Deleted");
  });
};
export const dashboardSuper = (req, res) => {
  // Execute the SQL query
  const { user_id } = req.body;
  const sqld = `SELECT 
  (SELECT COUNT(*) FROM users) AS total_users,
  (SELECT COUNT(*) FROM technicians) AS total_technicians; `;

  db.query(sqld, [user_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      throw new Error("Something went wrong");
      // res.status(500).send("Internal Server Error");
      // return;
    }

    // console.log(results);
    // Return the query results as JSON
    res.status(200).send(results);
  });
};
export const getstatus = (req, res) => {
  // Execute the SQL query

  const sqld = `SELECT status FROM control  WHERE id="1046031413"`;
  db.query(sqld, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      throw new Error("Something went wrong");
      // res.status(500).send("Internal Server Error");
      // return;
    }

    // console.log(results);
    // Return the query results as JSON
    res.status(200).send(results);
  });
};
export const toggleStatus = (req, res) => {
  // Execute the SQL query
  const { status } = req.body;
  let g;
  if (status) {
    g = 0;
  }
  if (!status) {
    g = 1;
  }
  console.log(g);
  const sqld = `UPDATE control SET status = ? WHERE control.id = '1046031413';`;
  db.query(sqld, [g], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      throw new Error("Something went wrong");
      // res.status(500).send("Internal Server Error");
      // return;
    }

    // console.log(results);
    // Return the query results as JSON
    res.status(200).send("Successfully Submmited");
  });
};
