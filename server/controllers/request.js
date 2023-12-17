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
