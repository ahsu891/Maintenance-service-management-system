import { db } from "../db.js";
// import fs from "fs";
// import { v4 as uuidv4 } from "uuid";
export const getTechnicials = (req, res) => {
  const q = "SELECT * FROM `technicians`;";
  db.query(q, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
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
