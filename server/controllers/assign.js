import bcrypt from "bcryptjs";
import { db } from "../db.js";
// import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const AssignTech = (req, res) => {
  const { data, request_id } = req.body;
  // console.log(data, request_id);
  try {
    data.forEach((element) => {
      const sql = `INSERT INTO technicians_assigned (assignment_id, request_id, technician_id, assignment_date) VALUES (?, ?, ?,?)`;
      db.query(
        sql,
        [uuidv4(), request_id, element, new Date()],
        (error, results) => {
          if (error) {
            console.error("Error executing the query:", error);
            res.status(500).send("Internal Server Error");
            return new Error("Internal Server Error");
          }
        }
      );
    });

    const mysql = `UPDATE maintenance_requests SET status = 'Assigned' WHERE request_id = "${request_id}"`;

    db.query(mysql, (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }
    });

    res.status(200).send("successfully assign ");
  } catch (err) {
    res.status(500).send("something went wrong ");
  }
};

export const getAssign = (req, res) => {
  // Execute the SQL query
  const { user_id } = req.body;
  // console.log(user_id);
  const sqlQuery = `
  SELECT
  technicians_assigned.*,
  maintenance_requests.*,
  users.phone,
  CONCAT(users.first_name, ' ', users.last_name) AS requester_name
  
FROM
  technicians_assigned
LEFT JOIN
  maintenance_requests ON technicians_assigned.request_id = maintenance_requests.request_id
LEFT JOIN
  users ON maintenance_requests.requester_id = users.user_id
  WHERE 
  technicians_assigned.technician_id=?;
 
  `;

  db.query(sqlQuery, [user_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).json(results);
  });
};
