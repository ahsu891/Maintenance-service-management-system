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
