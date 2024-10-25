import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "wap-english-dictionary.c1waysg2q137.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "Temuulen123$",
  database: "wap_english_dictionary",
  port: 3306,
});

let popularWords = new Map();

export const getDefinitions = async (searchWord) => {
  try {
    const [rows] = await db.query("SELECT * FROM entries WHERE word = ?", [searchWord.toLowerCase()]);
    return rows;
  } catch (error) {
    console.error("Error fetching definitions:", error);
    throw error;
  }
};

export const addPopularWord = async (searchWord) => {
  try {
    const [rows] = await db.query("SELECT * FROM popular_words WHERE word = ?", [searchWord]);
    if (rows.length > 0) {
      await db.query("UPDATE popular_words SET count = count + 1, last_searched = CURRENT_TIMESTAMP WHERE word = ?", [
        searchWord,
      ]);
    } else {
      await db.query("INSERT INTO popular_words (word, count) VALUES (?, 1)", [searchWord]);
    }
  } catch (error) {
    console.error("Error updating popular words:", error);
    throw error;
  }
};

export const getPopularDictionary = async () => {
  try {
    const [rows] = await db.query("SELECT word FROM popular_words ORDER BY count DESC, last_searched DESC LIMIT 10");
    return rows.map((row) => row.word);
  } catch (error) {
    console.error("Error fetching popular words:", error);
    throw error;
  }
};
