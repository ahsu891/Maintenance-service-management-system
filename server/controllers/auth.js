import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ?",
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
          { username: user.username, user_id: user.user_id, role: user.role },
          process.env.JWT_SECRET
        );

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({
          message: `Login successful. Redirecting...`,
          username: user.username,
          user_id: user.user_id,
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
