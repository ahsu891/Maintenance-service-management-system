import bcrypt from "bcryptjs";
import { db } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const getRep = (req, res) => {
  // Execute the SQL query
  const sqlQuery = `SELECT 
  finished_requests.*,
  maintenance_requests.request_id,
  maintenance_requests.title,
    CONCAT(users.first_name, ' ', users.last_name) AS requester_name,
  maintenance_requests.category,
  maintenance_requests.completion_date,
  CONCAT(technicians.first_name, ' ', technicians.last_name) AS technician_full_name
FROM 
  finished_requests
JOIN 
  maintenance_requests ON finished_requests.request_id = maintenance_requests.request_id
JOIN 
  technicians ON finished_requests.technician_id = technicians.technician_id
  JOIN 
  users ON users.user_id = maintenance_requests.requester_id
GROUP BY 
  maintenance_requests.request_id;
;
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
export const getSingleRep = (req, res) => {
  const { requestId } = req.body; // Replace with the actual request ID from req.params or req.body

  // Execute the SQL queries
  const sqlQuery = `
    SELECT 
      finished_requests.*,
      maintenance_requests.request_id,
      maintenance_requests.title,
      maintenance_requests.category,
      CONCAT(users.first_name, ' ', users.last_name) AS requester_name,
      maintenance_requests.category,
      maintenance_requests.completion_date,
      users.phone,
      users.job,
      CONCAT(technicians.first_name, ' ', technicians.last_name) AS technician_full_name
    FROM 
      finished_requests
    JOIN 
      maintenance_requests ON finished_requests.request_id = maintenance_requests.request_id
    JOIN 
      technicians ON finished_requests.technician_id = technicians.technician_id
    JOIN 
      users ON users.user_id = maintenance_requests.requester_id
    WHERE  maintenance_requests.request_id=?
    GROUP BY 
      maintenance_requests.request_id
  `;

  const technicianQuery = `
    SELECT 
      CONCAT(technicians.first_name, ' ', technicians.last_name) AS technician_full_name
    FROM 
      finished_requests
    JOIN 
      maintenance_requests ON finished_requests.request_id = maintenance_requests.request_id
    JOIN 
      technicians ON finished_requests.technician_id = technicians.technician_id
    JOIN 
      users ON users.user_id = maintenance_requests.requester_id
    WHERE  maintenance_requests.request_id=?
  `;

  const materialQuery = `
    SELECT material_used.detail
    FROM finished_requests
    JOIN material_used ON material_used.work_id = finished_requests.finished_id
    JOIN maintenance_requests ON maintenance_requests.request_id = finished_requests.request_id
    WHERE maintenance_requests.request_id = ?;
  `;

  // Execute the queries in parallel
  db.query(sqlQuery, [requestId], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    // console.log(results);
    const responseObj = {
      maintenanceDetails: results,
    };

    db.query(technicianQuery, [requestId], (error, technicianResults) => {
      if (error) {
        console.error("Error executing the query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      responseObj.technicianDetails = technicianResults;

      db.query(materialQuery, [requestId], (error, materialResults) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).send("Internal Server Error");
          return;
        }

        responseObj.materialDetails = materialResults;

        // Return the combined results as JSON
        res.status(200).json(responseObj);
      });
    });
  });
};