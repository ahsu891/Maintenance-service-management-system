import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "ahmedsufiyan854@gmail.com",
    pass: process.env.APP_PASS,
  },
});

export const login = (req, res) => {
  const { username, password } = req.body;
  // scheduleMaintenanceTasks();
  // checkPrevent();
  db.query(
    `SELECT * FROM (
      SELECT user_id AS id, role,first_name,last_name, username, password FROM users
      UNION
      SELECT admin_id AS id, role,first_name,last_name,  username, password FROM admin
      UNION
      SELECT technician_id AS id, role, first_name,last_name,username,  password FROM technicians
      UNION
      SELECT inventory_admin_id AS id, role,first_name,last_name, username,  password FROM inventory_admin
      UNION
      SELECT head_id AS id, role,first_name,last_name, username,  password FROM head
      UNION
      SELECT super_id AS id, role,first_name,last_name, username,  password FROM super
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
      // console.log(hash);\
      // console.log(user);
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
          full_name: `${user.first_name} ${user.last_name}`,

          role: user.role,
        });
      });
    }
  );
};

export const checkLogin = (req, res) => {
  const token = req.cookies.token;
  // console.log(token);
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
  // res.redirect("/login");
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

  if (roles === "Head") {
    const sqlQueryUser = `
  UPDATE head SET first_name= "${fname}" ,username="${username}", last_name = '${lname}'${pass}, phone='${phone}', email='${email}' WHERE head_id = ?; `;

    query = sqlQueryUser;
  }
  if (roles === "Super") {
    const sqlQueryUser = `
  UPDATE super SET first_name= "${fname}" ,username="${username}", last_name = '${lname}'${pass}, phone='${phone}', email='${email}' WHERE super_id = ?; `;

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
    res.status(200).json({
      message: "Successfully Updated",
      full_name: `${fname} ${lname}`,
    });
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
    UNION
    SELECT head_id  AS id, role, username, first_name, last_name, null as job, null as position, phone, email FROM head
    UNION
    SELECT super_id  AS id, role, username, first_name, last_name, null as job, null as position, phone, email FROM super
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
    res.status(200).send(results);
  });
};
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const sql = `SELECT * FROM (
    SELECT user_id AS id, role,first_name,last_name,email, username FROM users
    UNION
    SELECT admin_id AS id, role,first_name,last_name,email,  username FROM admin
    UNION
    SELECT technician_id AS id, role, first_name,last_name,email,username FROM technicians
    UNION
    SELECT inventory_admin_id AS id, role,first_name,last_name,email, username FROM inventory_admin
    UNION
    SELECT head_id AS id, role,first_name,last_name,email, username FROM head
    UNION
    SELECT super_id AS id, role,first_name,last_name,email, username FROM super
) AS combined_users

WHERE email = ?

`;
  console.log(process.env.APP_PASS);

  db.query(sql, [email], async (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    const [rows] = results;

    if (results.length === 0) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist." });
    }
    // console.log(rows);
    const user = rows;
    // const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const url = `http://localhost:5173/resetPassword/${token}`;

    // await transporter.sendMail({

    //   subject: "Reset Password",
    //   html: `<p>Click <a href="${url}">here</a> to reset your password</p>`,
    // });

    await transporter.sendMail({
      from: '"Wachemo University 👻" <ahmedsufiyan854@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Reset Password", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Click <a href="${url}">here</a> to reset your password</p>`, // html body
    });
    res.json({ message: "Password reset link sent to your email." });

    // Return the query results as JSON
    // res.status(200).json(results);
  });

  // const [rows] = await db.query(sql, [email]);

  // if (rows.length === 0) {
  //   return res
  //     .status(400)
  //     .json({ message: "User with this email does not exist." });
  // }

  // const user = rows[0];
  // // const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

  // const token = jwt.sign(
  //   { id: user.id, role: user.role },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: "1h",
  //   }
  // );

  // const url = `http://localhost:5173/resetPassword/${token}`;

  // await transporter.sendMail({
  //   to: user.email,
  //   subject: "Reset Password",
  //   html: `<p>Click <a href="${url}">here</a> to reset your password</p>`,
  // });

  // res.json({ message: "Password reset link sent to your email." });

  // db.query(sqlQuery, [user_id], (error, results) => {
  //   if (error) {
  //     console.error("Error executing the query:", error);
  //     res.status(500).send("Internal Server Error");
  //     return;
  //   }

  //   // Return the query results as JSON
  //   res.status(200).json(results);
  // });
};
export const resetPassword = async (req, res) => {
  // const { email } = req.body;
  const sql = `SELECT * FROM (
    SELECT user_id AS id, role,first_name,last_name,email, username FROM users
    UNION
    SELECT admin_id AS id, role,first_name,last_name,email,  username FROM admin
    UNION
    SELECT technician_id AS id, role, first_name,last_name,email,username FROM technicians
    UNION
    SELECT inventory_admin_id AS id, role,first_name,last_name,email, username FROM inventory_admin
    UNION
    SELECT head_id AS id, role,first_name,last_name,email, username FROM head
    UNION
    SELECT super_id AS id, role,first_name,last_name,email, username FROM super
) AS combined_users

WHERE id = ?

`;

  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const [rows] = await db.query(sql, [decoded.id]);
    db.query(sql, [decoded.id], async (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        throw new Error("Something went wrong");
        // res.status(500).send("Internal Server Error");
        // return;
      }
      const [rows] = results;
      if (results.length === 0) {
        return res
          .status(400)
          .json({ message: "Invalid token or user does not exist." });
      }

      const user = rows;
      // console.log(decoded.role, user);
      // if (new Date() > new Date(user.reset_token_expiry)) {
      //   return res.status(400).json({ message: 'Token has expired.' });
      // }
      const hashedPassword = await bcrypt.hash(password, 8);
      let query;
      if (decoded.role === "Admin") {
        const sqlQueryUser = `
        UPDATE admin SET  password=? WHERE admin_id = ?; `;
        query = sqlQueryUser;
      }

      if (decoded.role === "Requester") {
        const sqlQueryUser = `
        UPDATE users SET  password=? WHERE user_id = ?; `;
        query = sqlQueryUser;
      }
      if (decoded.role === "Technician") {
        const sqlQueryUser = `
        UPDATE technicians SET  password=? WHERE technician_id = ?; `;
        query = sqlQueryUser;
      }
      if (decoded.role === "Inventory") {
        const sqlQueryUser = `
        UPDATE inventory_admin SET  password=? WHERE inventory_admin_id = ?; `;
        query = sqlQueryUser;
      }
      if (decoded.role === "Head") {
        const sqlQueryUser = `
        UPDATE head SET  password=? WHERE head_id = ?; `;
        query = sqlQueryUser;
      }
      if (decoded.role === "Super") {
        const sqlQueryUser = `
        UPDATE super SET  password=? WHERE super_id = ?; `;
        query = sqlQueryUser;
      }

      // await db.query(query, [hashedPassword, user.id]);

      db.query(query, [hashedPassword, user.id], async (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Return the query results as JSON
        res.json({ message: "Password has been reset successfully." });
        // res.status(200).json(results);
      });
      // console.log(results);
      // Return the query results as JSON
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid token or token has expired." });
  }
};
