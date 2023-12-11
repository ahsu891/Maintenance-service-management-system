import { db } from "../db.js";
// import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
export const getTechnicials = (req, res) => {
  const q = "SELECT * FROM `technicians`;";
  db.query(q, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
};
export const deleteTech = (req, res) => {
  const techId = req.params.technician_id;
  const query = `DELETE FROM technicians WHERE technician_id = ?`;

  db.query(query, [techId], (error, results) => {
    if (error) {
      console.error("Error deleting Course:", error.message);
      res.status(500).json({ error: "Error deleting Techninial" });
    } else {
      // console.log(`Deleted book with ID ${cousreId}`);
      res.status(200).json({ message: `Deleting the success` });
    }
  });
};

export const addTech = (req, res) => {
  const { fname, lname, password, username, email, specialzation, phone } =
    req.body;
  // console.log(fname, lname, password, username, email, specialzation, phone);
  const hash = bcrypt.hashSync(password, 8);
  // Use placeholders in the query to prevent SQL injection
  const insertQuery = `INSERT INTO technicians (technician_id, role, username, password, first_name, last_name, email, phone, specialization, available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Assuming you have a connection pool named 'db'
  db.query(
    insertQuery,
    [
      uuidv4(), // Generate a new UUID for the request_id
      "Technicain",
      username,
      hash,
      fname, // Assuming 'Pending' is a valid status value
      lname,
      email,
      phone, // Assuming technician_id starts as null
      specialzation,
      "inActive",
    ],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error Adding Member");
        return;
      }

      //   console.log("Data inserted successfully");
      res.status(200).send("Add Member successfully");
    }
  );
};
