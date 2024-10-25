import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create a connection pool to MySQL
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Temuulen123$",
  database: "entries",
});

// Route to get definitions of a word
app.get("/api/search", async (req, res) => {
  const term = req.query.term;

  if (!term) {
    return res.status(400).send("Search term is required");
  }

  try {
    // Fetch word definitions from MySQL database
    const [results] = await db.query("SELECT * FROM entries WHERE word = ?", [term]);

    if (results.length > 0) {
      // Add or update the popular term in the popular_terms table
      const [existingTerm] = await db.query("SELECT * FROM popular_terms WHERE term = ?", [term]);

      if (existingTerm.length > 0) {
        await db.query("UPDATE popular_terms SET count = count + 1, last_searched = CURRENT_TIMESTAMP WHERE term = ?", [
          term,
        ]);
      } else {
        await db.query("INSERT INTO popular_terms (term) VALUES (?)", [term]);
      }

      res.json(results);
    } else {
      res.status(404).send("Term not found");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get popular search terms
app.get("/api/popular", async (req, res) => {
  try {
    const [popularTerms] = await db.query(
      "SELECT term, COUNT(term) AS count FROM popular_terms GROUP BY term ORDER BY count DESC LIMIT 10"
    );
    res.json(popularTerms.map((term) => term.term));
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
