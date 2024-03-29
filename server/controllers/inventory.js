import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const addInventory = (req, res) => {
  const { iname, quantity, categories } = req.body;
  // const imageFilePath = req.file.path;
  console.log(categories);
  const course_id = uuidv4();
  // const values = Object.values(req.body);
  // values.unshift(course_id);
  const item_thumbnail = req.file; // File object
  console.log(item_thumbnail.filename);
  // Generate a new file name
  // const originalFileName = course_thumbnail.originalname;
  // const fileExtension = originalFileName.split(".").pop();
  // const newFileName = `${course_id}.${fileExtension}`;

  // Construct the new file path
  const newFilePath = `image/${item_thumbnail.filename}`;
  const protocol = req.protocol;

  // Get the hostname (localhost in this case)
  const hostname = req.hostname;

  // Get the port number (3000 in this case)
  const port = req.get("host").split(":")[1] || "80"; // Extract port from host header or default to 80

  // Construct the full URL
  const fullUrl = `${protocol}://${hostname}:${port}/`;

  console.log("Full URL:", fullUrl);

  // Create the SQL insert query

  const last_update = new Date(); // Assuming you want to set the current date as the last_update

  // Define the SQL query to insert data into the database
  const query =
    "INSERT INTO inventory (item_name, item_category, image, last_update, quantity) VALUES (?, ?, ?, ?, ?)";

  // Execute the query
  try {
    db.query(
      query,
      [iname, categories, newFilePath, last_update, quantity],
      (err, result) => {
        if (err) {
          console.error(
            "Error inserting data into the database:",
            err.sqlMessage
          );
          res.status(500).send(err.sqlMessage);
          return;
        }
        console.log("Data inserted successfully");
        res.send("Data item inserted successfully");
      }
    );
  } catch (e) {
    console.err("something went  wrong", e.message);
    res.status(500).send(e.sqlMessage);
  }
  // Insert course details into the database

  // db.query(q, values, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return res
  //       .status(500)
  //       .json({ message: "Error adding course to the database" });
  //   }

  // Rename the file
  // fs.rename(req.file.path, newFilePath, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ message: "Error renaming the file" });
  //   }

  //   res.json({ message: "Course added successfully" });
  // });
  // });
};
export const getInvetory = (req, res) => {
  const protocol = req.protocol;
  const hostname = req.hostname;
  const port = req.get("host").split(":")[1] || "80"; // Extract port from host header or default to 80
  // Construct the full URL
  const fullUrl = `${protocol}://${hostname}:${port}/`;
  // console.log("Full URL:", fullUrl);

  // Create the SQL insert query
  try {
    db.query(
      "SELECT * FROM inventory ORDER BY last_update DESC;",
      (err, results) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          res.status(500).send(err.message);
          return;
        }
        // console.log("Query results:", results);
        const data = results.map((data) => {
          const singleData = data;
          singleData.image = fullUrl + singleData.image;
          return singleData;
        });
        res.json(data); // Send the query results as JSON response
      }
    );
  } catch (r) {
    res.status(500).send(r.message);
  }
  // });
};

export const deleteSingleInventory = (req, res) => {
  const id = req.params.id;

  const deleteQuery = "DELETE FROM inventory WHERE id = ?";

  db.query(deleteQuery, [id], (error, results, fields) => {
    if (error) {
      console.error("Error executing DELETE query:", error);
      res.status(500).send("Some thing went wrong !");
    } else {
      res.status(200).send("Deleted successfully");
    }
  });
};

export const updateInventory = (req, res) => {
  const Id = req.params.id;
  const { iname, category, image, quantity } = req.body;
  console.log(iname, category, image, quantity, Id);

  const updateQuery =
    "UPDATE inventory SET item_name = ?,item_category=?, image=?,last_update=?,quantity=? WHERE id = ?;";
  const values = [iname, category, `image/${image}`, new Date(), quantity, Id];

  db.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error("Error toggling Course:", error.message);
      res.status(500).send(error.message);
    } else {
      // console.log(`Deleted book with ID ${cousreId}`);
      res.status(200).send(`Updated the successfully`);
    }
  });
};

export const updatesingleImage = (req, res) => {
  const Id = req.params.id;

  const item_thumbnail = req.file; // File object
  console.log(item_thumbnail.filename);
  // Generate a new file name
  // const originalFileName = course_thumbnail.originalname;
  // const fileExtension = originalFileName.split(".").pop();
  // const newFileName = `${course_id}.${fileExtension}`;

  // Construct the new file path
  const newFilePath = `image/${item_thumbnail.filename}`;

  const updateQuery = "UPDATE inventory SET image = ? WHERE id = ?;";

  db.query(updateQuery, [newFilePath, Id], (error, results) => {
    if (error) {
      console.error("Error toggling Course:", error.message);
      res.status(500).send(error.message);
    } else {
      console.log(`Upadted Successfully`);
      res.status(200).send(`Updated the successfully`);
    }
  });
};
export const getReq = (req, res) => {
  // Execute the SQL query
  const { technician_id } = req.body;
  // console.log(technician_id);
  const sqlQuery = `
    SELECT
      maintenance_requests.request_id,
      maintenance_requests.title,
      technicians_assigned.assignment_id
    FROM
      maintenance_requests
    LEFT JOIN
      technicians_assigned ON technicians_assigned.request_id = maintenance_requests.request_id
    WHERE
      technicians_assigned.technician_id = ?
  `;

  db.query(sqlQuery, [technician_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).json(results);
  });
};
export const makeReq = (req, res) => {
  const { materiald_id, request_id } = req.body;
  // console.log(materiald_id, request_id);

  // Check if the request_id exists in the maintenance_requests table
  const checkQuery = "SELECT * FROM maintenance_requests WHERE request_id = ?";
  db.query(checkQuery, [request_id], (checkError, checkResults) => {
    if (checkError) {
      console.error("Error checking request_id:", checkError);
      res.status(500).send("Error checking maintenance request.");
      return;
    }

    // If the request_id does not exist, send an error response
    if (checkResults.length === 0) {
      res
        .status(400)
        .send("Invalid request_id. Maintenance request does not exist.");
      return;
    }

    // Iterate through materiald_id array and insert into maintenance_request_materials
    materiald_id.forEach((element) => {
      const sqlQuery = `INSERT INTO maintenance_request_materials (material_id,request_id, quantity_used, status) 
      VALUES (?, ?, ?, 'Pending');`;
      db.query(
        sqlQuery,
        [uuidv4(), request_id, element.count],
        (error, results) => {
          if (error) {
            console.error("Error executing the query:", error);
            // Send an error response to the client
            res.status(500).send("Error creating maintenance requests.");
            return;
          }
          // Log success message
          // console.log("Maintenance request created successfully.");
        }
      );
    });

    // Send success response to the client
    res.status(200).send("Maintenance requests created successfully.");
  });
};
