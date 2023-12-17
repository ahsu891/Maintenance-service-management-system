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
