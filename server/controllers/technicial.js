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
      const Tetch = data.map((data) => {
        delete data.password;
        return data;
      });
      res.json(Tetch);
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
      "Technician",
      username,
      hash,
      fname, // Assuming 'Pending' is a valid status value
      lname,
      email,
      phone, // Assuming technician_id starts as null
      specialzation,
      "inactive",
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

export const toggele = (req, res) => {
  const techId = req.params.technician_id;
  const { toggle } = req.body;
  // console.log(toggle);
  const updateQuery =
    "UPDATE technicians SET available = ? WHERE technician_id = ?";
  const values = [toggle, techId];

  db.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error("Error toggling Course:", error.message);
      res.status(500).json({ error: "Error Toggling Techninial" });
    } else {
      // console.log(`Deleted book with ID ${cousreId}`);
      res.status(200).json({ message: `Toggling the success` });
    }
  });
};
export const getDashTableTech = (req, res) => {
  // Execute the SQL query
  const { user_id } = req.body;
  const sqlQuery = `SELECT 
  maintenance_requests.*
  FROM 
  maintenance_requests
  JOIN 
  finished_requests ON finished_requests.request_id = maintenance_requests.request_id
  
  WHERE finished_requests.technician_id=? And maintenance_requests.status='Closed'
  ORDER BY request_date DESC;
  `;

  db.query(sqlQuery, [user_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).send(results);
  });
};
export const getTheTechicianNME = (req, res) => {
  // Execute the SQL query

  const sqlQuery = `SELECT finall.*,
  CONCAT(mrr.first_name, ' ', mrr.last_name) AS requester_full_name 
  FROM (SELECT result.*,
        mri.technician_id
  FROM (
  SELECT c.description , 
        mr.request_id,
         mr.title 
  FROM complain c
  JOIN maintenance_requests mr ON c.request_id = mr.request_id) as result
  JOIN finished_requests mri ON result.request_id = mri.request_id) as finall
  JOIN technicians mrr ON finall.technician_id = mrr. technician_id
  `;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).send(results);
  });
};
