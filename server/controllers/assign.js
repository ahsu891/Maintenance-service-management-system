import bcrypt from "bcryptjs";
import { db } from "../db.js";
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
    /////////////////////////////////////////////////////////////////

    data.forEach((element) => {
      const sql = `UPDATE technicians SET available = 'engaged' WHERE technician_id = ?;`;
      db.query(sql, [element], (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).send("Internal Server Error");
          return new Error("Internal Server Error");
        }
      });
    });
    //////////////////////////
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
  CONCAT(users.first_name, ' ', users.last_name) AS requester_name,
  blocks.lat,
    blocks.log
  
FROM
  technicians_assigned
LEFT JOIN
  maintenance_requests ON technicians_assigned.request_id = maintenance_requests.request_id
LEFT JOIN
  users ON maintenance_requests.requester_id = users.user_id
LEFT JOIN
  blocks ON maintenance_requests.block_id = blocks.blocks_id
  WHERE 
  technicians_assigned.technician_id=?
  ORDER BY maintenance_requests.request_date DESC
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

export const getAssGroup = (req, res) => {
  // Execute the SQL query
  const { request_id } = req.body;
  // console.log(user_id);
  const sqlQuery = `
  SELECT
  technicians_assigned.*,
 
  technicians.technician_id,
  technicians.phone,
  technicians.specialization,
  CONCAT(technicians.first_name, ' ', technicians.last_name) AS technician_name
FROM
  technicians_assigned
LEFT JOIN
  technicians ON technicians_assigned.technician_id = technicians.technician_id
  WHERE 
  technicians_assigned.request_id=?;


 
  `;

  db.query(sqlQuery, [request_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // console.log(results);
    // Return the query results as JSON
    res.status(200).json(results);
  });
};
export const finishAss = (req, res) => {
  // Execute the SQL query
  const { time, worker, request_id } = req.body;

  // console.log(time, material, worker);
  // console.log(user_id);
  const sqlQuery = `
  INSERT INTO finished_requests (finished_id, request_id, technician_id, time_took) VALUES (?,?, ?, ?);


 
  `;
  const sqlm = `
  INSERT INTO material_used (material_id, work_id, detail) VALUES (?,?,?);
  `;
  //   const sqld = `

  // DELETE FROM technicians_assigned
  // WHERE request_id=?;

  //   `;
  const sqlu = `
  
  UPDATE maintenance_requests
  SET 
    status = 'Completed',
    completion_date = NOW()
  WHERE request_id = ?;

  `;
  const sqlac = `
  
  UPDATE technicians SET available = 'active' WHERE technician_id = ?;

  `;
  try {
    console.log(worker);
    worker?.forEach((element) => {
      const id = uuidv4();
      db.query(sqlQuery, [id, request_id, element, time], (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          throw new Error("Something went wrong");
          // res.status(500).send("Internal Server Error");
          // return;
        }

        // material.forEach((element) => {
        //   db.query(sqlm, [uuidv4(), id, element.data], (error, results) => {
        //     if (error) {
        //       console.error("Error executing the query:", error);
        //       throw new Error("Something went wrong");
        //       // res.status(500).send("Internal Server Error");
        //       // return;
        //     }

        //     // console.log(results);
        //     // Return the query results as JSON
        //     // res.status(200).json(results);
        //   });
        // });

        // console.log(results);
        // Return the query results as JSON
        // res.status(200).json(results);
      });
    });
    worker?.forEach((element) => {
      db.query(sqlac, [element], (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          throw new Error("Something went wrong");
          // res.status(500).send("Internal Server Error");
          // return;
        }

        // console.log(results);
        // Return the query results as JSON
        // res.status(200).json(results);
      });
    });

    db.query(sqlu, [request_id], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        throw new Error("Something went wrong");
        // res.status(500).send("Internal Server Error");
        // return;
      }

      // console.log(results);
      // Return the query results as JSON
      // res.status(200).json(results);
      res.status(200).json("Sucessfully work the Task");
    });
    // db.query(sqld, [request_id], (error, results) => {
    //   if (error) {
    //     console.error("Error executing the query:", error);
    //     throw new Error("Something went wrong");
    //     // res.status(500).send("Internal Server Error");
    //     // return;
    //   }

    //   // console.log(results);
    //   // Return the query results as JSON
    //   res.status(200).json("Sucessfully work the Task");
    // });
  } catch (error) {
    console.error("Caught an error:", error.message);
    res.status(500).send("Internal Server Error");
  }
  // db.query(sqlQuery, [request_id], (error, results) => {
  //   if (error) {
  //     console.error("Error executing the query:", error);
  //     res.status(500).send("Internal Server Error");
  //     return;
  //   }

  //   // console.log(results);
  //   // Return the query results as JSON
  //   res.status(200).json(results);
  // });
};
export const conform = (req, res) => {
  // Execute the SQL query
  const { request_id } = req.body;
  // console.log(request_id);
  const sqld = `
  
DELETE FROM technicians_assigned
WHERE request_id=?;

  `;
  const sqlu = `
  
  UPDATE maintenance_requests
  SET 
    status = 'Closed',
    completion_date = NOW()
  WHERE request_id = ?;

  `;
  try {
    db.query(sqlu, [request_id], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        throw new Error("Something went wrong");
        // res.status(500).send("Internal Server Error");
        // return;
      }

      // console.log(results);
      // Return the query results as JSON
      // res.status(200).json(results);
    });

    db.query(sqld, [request_id], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        throw new Error("Something went wrong");
        // res.status(500).send("Internal Server Error");
        // return;
      }

      // console.log(results);
      // Return the query results as JSON
      res.status(200).json("Sucessfully work the Task");
    });
  } catch (error) {
    console.error("Caught an error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
export const RejectMassage = (req, res) => {
  // Execute the SQL query
  const { request_id, reason } = req.body;
  // console.log(request_id);
  const sqldRM = `INSERT INTO reject_message (id,message, request_id) VALUES (?, ?, ?);
  `;
  const sqlut = `
  
  UPDATE maintenance_requests SET status = 'Rejected' WHERE maintenance_requests.request_id = ?;
  `;
  try {
    db.query(sqldRM, [uuidv4(), reason, request_id], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        throw new Error("Something went wrong");
        // res.status(500).send("Internal Server Error");
        // return;
      }
      db.query(sqlut, [request_id], (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          throw new Error("Something went wrong");
          // res.status(500).send("Internal Server Error");
          // return;
        }

        // console.log(results);
        // Return the query results as JSON
        res.status(200).send("The Request is Rejected");
      });
      // console.log(results);
      // Return the query results as JSON
      // res.status(200).json(results);
    });
  } catch (error) {
    console.error("Caught an error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const getRejectMessage = (req, res) => {
  // Execute the SQL query
  const { request_id } = req.body;
  // console.log(request_id);
  const sqldRM = `SELECT * FROM reject_message WHERE request_id=?`;

  try {
    db.query(sqldRM, [request_id], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        throw new Error("Something went wrong");
        // res.status(500).send("Internal Server Error");
        // return;
      }

      res.status(200).send(results);
      // console.log(results);
      // Return the query results as JSON
      // res.status(200).json(results);
    });
  } catch (error) {
    console.error("Caught an error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
export const makeCancelReject = (req, res) => {
  // Execute the SQL query
  const { request_id } = req.body;
  // console.log(request_id);
  const sqldRM = `UPDATE maintenance_requests SET status = 'Cancelled' WHERE maintenance_requests.request_id = ?;`;

  try {
    db.query(sqldRM, [request_id], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        throw new Error("Something went wrong");
        // res.status(500).send("Internal Server Error");
        // return;
      }

      res.status(200).send("Deleted Succesfully");
      // console.log(results);
      // Return the query results as JSON
      // res.status(200).json(results);
    });
  } catch (error) {
    console.error("Caught an error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const ComplainMessege = (req, res) => {
  // Execute the SQL query
  const { request_id, description } = req.body;
  // console.log(request_id);
  const sqldRM = `INSERT INTO complain (id, request_id, created_at, description) VALUES (?, ?,?, ?); `;

  try {
    db.query(
      sqldRM,
      [uuidv4(), request_id, new Date(), description],
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          throw new Error("Something went wrong");
          // res.status(500).send("Internal Server Error");
          // return;
        }

        res.status(200).send("The thank you for complaint 😃");
        // console.log(results);
        // Return the query results as JSON
        // res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error("Caught an error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
