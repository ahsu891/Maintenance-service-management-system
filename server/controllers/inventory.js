import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const addInventory = (req, res) => {
  const { iname, quantity, categories } = req.body;
  // const imageFilePath = req.file.path;

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
          console.error("Error inserting data into the database:", err);
          res.status(500).send("Error inserting data into the database");
          return;
        }
        console.log("Data inserted successfully");
        res.send("Data inserted successfully");
      }
    );
  } catch (e) {
    console.err("something went  wrong", e.message);
    res.status(500).send("Error inserting data into the database");
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
