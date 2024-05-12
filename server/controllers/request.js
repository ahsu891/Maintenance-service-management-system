import bcrypt from "bcryptjs";
import { db } from "../db.js";
// import fs from "fs";
// import { v4 as uuidv4 } from "uuid";
export const getReq = (req, res) => {
  // Execute the SQL query
  const sqlQuery = `
  SELECT
  maintenance_requests.*,
  users.phone,
  CONCAT(users.first_name, ' ', users.last_name) AS requester_name
FROM
  maintenance_requests
LEFT JOIN
  users ON maintenance_requests.requester_id = users.user_id
  WHERE 
  maintenance_requests.status='Pending';
  `;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).json(results);
  });
};
export const getDashTable = (req, res) => {
  // Execute the SQL query
  const { user_id } = req.body;
  const sqlQuery = `SELECT *
  FROM maintenance_requests
  WHERE requester_id = ?
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
export const getReqAss = (req, res) => {
  // Execute the SQL query
  const sqlQuery = `SELECT technicians_assigned.*,
  maintenance_requests.title,
  maintenance_requests.status,
  maintenance_requests.priority,
  maintenance_requests.block_id,
  CONCAT(technicians.first_name, ' ', technicians.last_name) AS technician_name,
  technicians.specialization,
  CONCAT(users.first_name, ' ', users.last_name) AS requester_name
  FROM technicians_assigned
  LEFT JOIN maintenance_requests ON technicians_assigned.request_id = maintenance_requests.request_id 
  LEFT JOIN technicians ON technicians_assigned.technician_id = technicians.technician_id 
  LEFT JOIN
  users ON maintenance_requests.requester_id = users.user_id
  WHERE maintenance_requests.status!='Pending';`;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).json(results);
  });
};
