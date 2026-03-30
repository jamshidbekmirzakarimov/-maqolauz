import pool from "../config/connection.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerUser = async (req, res) => {
  const { full_name, username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (full_name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
      [full_name, username, email, hashedPassword]
    );
    res.status(201).json({
      message: "User registered successfully",
      userId: result.rows[0],
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      if ((!username || !password)) {
        return res.status(400).json("majburiy maydon");
      }
      const result = await pool.query("select * from users where username = $1", [
        username,
      ]);
      const user = result.rows[0];
      console.log(user);
  
      if (!user) {
        return res.status(404).json({
          message: "username yoki password xato",
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(404).json({
          message: "username yoki password xato",
        });
      }
  
      // 30 sekundlik access token
      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "5m" }
      );
  
      //Refresh token (5 minutlik)
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_SECRET,
        { expiresIn: "60m" }
      );
  
      res.status(201).json({
        message: "muoffaqiyatli auth bo'ldi",
        userId: user.id,
        user: user.username,
        role: user.role,
        accessToken,
        refreshToken
  
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
