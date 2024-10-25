import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  connectTimeout: 5000,
});

export const getDefinitions = async (searchWord) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM entries WHERE word = ?", [searchWord.toLowerCase()]);
    return rows;
  } catch (error) {
    console.error("Error fetching definitions:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export const addPopularWord = async (searchWord) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM popular_words WHERE word = ?", [searchWord]);
    if (rows.length > 0) {
      await connection.query(
        "UPDATE popular_words SET count = count + 1, last_searched = CURRENT_TIMESTAMP WHERE word = ?",
        [searchWord]
      );
    } else {
      await connection.query("INSERT INTO popular_words (word, count) VALUES (?, 1)", [searchWord]);
    }
  } catch (error) {
    console.error("Error updating popular words:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export const getPopularDictionary = async () => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query(
      "SELECT CONCAT(word, ' (', count, ')') as word FROM popular_words ORDER BY count DESC, last_searched DESC LIMIT 10"
    );
    return rows.map((row) => row.word);
  } catch (error) {
    console.error("Error fetching popular words:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
