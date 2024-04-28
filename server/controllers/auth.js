import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const { username, password } = req.body;
  // scheduleMaintenanceTasks();
  // checkPrevent();
  db.query(
    `SELECT * FROM (
      SELECT user_id AS id, role, username, password FROM users
      UNION
      SELECT admin_id AS id, role, username, password FROM admin
      UNION
      SELECT technician_id AS id, role, username, password FROM technicians
      UNION
      SELECT inventory_admin_id AS id, role, username, password FROM inventory_admin
  ) AS combined_users
  WHERE username = ?;`,
    [username],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = results[0];
      //   var hash = bcrypt.hashSync("1046031413", 8);
      // var hash = bcrypt.hashSync("12345678", 8);
      // console.log(hash);
      //   Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (bcryptError, match) => {
        if (bcryptError || !match) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }

        const token = jwt.sign(
          { username: user.username, user_id: user.id, role: user.role },
          process.env.JWT_SECRET
        );

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({
          message: `Login successful. Redirecting...`,
          username: user.username,
          user_id: user.id,
          role: user.role,
        });
      });
    }
  );
};

export const checkLogin = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return res.status(200).send({
      message: "Welcome ",
      user: req.user,
      exp: req.exp,
      iat: req.iat,
    });
  } catch (e) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logout successful" });
};
export const saveEditChange = (req, res) => {
  // Execute the SQL query
  // const { user_id } = req.body;
  const {
    fname,
    lname,
    password1,
    typej,
    typep,
    phone,
    username,
    password2,
    user_id,
    email,
    roles,
  } = req.body;

  let query;
  let pass = "";
  if (password1) {
    const hash = bcrypt.hashSync(password1, 8);
    pass = `,password='${hash}'`;
    // console.log(pass);
  }

  console.log(roles);
  if (roles === "Admin") {
    const sqlQueryUser = `
    UPDATE admin SET first_name= "${fname}" ,last_name = '${lname}',username="${username}"${pass}, phone='${phone}', email='${email}' WHERE admin_id = ?; `;

    query = sqlQueryUser;
  }
  if (roles === "Requester") {
    const sqlQueryUser = `
  UPDATE users SET first_name= "${fname}" ,username="${username}", last_name = '${lname}'${pass} ,job='${typej}', position='${typep}', phone='${phone}', email='${email}' WHERE user_id = ?; `;

    query = sqlQueryUser;
  }
  if (roles === "Technician") {
    const sqlQueryUser = `
  UPDATE technicians SET first_name= "${fname}" ,username="${username}", last_name = '${lname}'${pass}, phone='${phone}', email='${email}' WHERE technician_id = ?; `;

    query = sqlQueryUser;
  }
  if (roles === "Inventory") {
    const sqlQueryUser = `
  UPDATE inventory_admin SET first_name= "${fname}" ,username="${username}", last_name = '${lname}'${pass}, phone='${phone}', email='${email}' WHERE inventory_admin_id = ?; `;

    query = sqlQueryUser;
  }
  // const sqlQueryUser = `
  // UPDATE users SET first_name= "${fname}" ,last_name = '${lname}' ,password='${password1}', job='${typej}', position='${typep}', phone='${phone}', email='${email}' WHERE user_id = ?; `;

  db.query(query, [user_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    const token = jwt.sign(
      { username: username, user_id, role: roles },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true });
    // Return the query results as JSON
    // console.log(results);
    res.status(200).send("Succssfully Upadated");
  });
};
export const getSettingEdit = (req, res) => {
  // Execute the SQL query
  const { user_id } = req.body;
  // console.log(user_id);
  const sqlQuery = `
 
  SELECT * FROM (
    SELECT user_id AS id, role, username, first_name, last_name, job, position, phone, email FROM users
    UNION
    SELECT admin_id AS id, role, username, first_name, last_name, null as job, null as position, phone, email FROM admin
    UNION
    SELECT technician_id AS id, role, username, first_name, last_name, null as job, null as position, phone, email FROM technicians
    UNION
    SELECT inventory_admin_id  AS id, role, username, first_name, last_name, null as job, null as position, phone, email FROM inventory_admin
) AS combined_users
WHERE id=?;
  `;
  //   const sqlQuery = `

  //   SELECT * FROM (
  //     SELECT user_id AS id, role, username, first_name, last_name, job, position, phone, email FROM users
  //     UNION
  //     SELECT admin_id AS id, role, username, first_name, last_name, null as job, null as position, phone, email FROM admin
  // ) AS combined_users
  // WHERE id=?;
  //   `;

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
