import pool from "../config/connection.js";

export const getQuotes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM quotes");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createQuote = async (req, res) => {
  const { title, text, user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO quotes (title, text, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, text, user_id]
    );

    if (!title || !text || !user_id) {
      return res
        .status(400)
        .json({ message: "Title, text and user_id are required" });
    }
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating quote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
