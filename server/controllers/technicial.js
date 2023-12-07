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
