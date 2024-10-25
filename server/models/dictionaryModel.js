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

export const addPopularWord = (searchWord) => {
  if (popularWords.has(searchWord)) {
    popularWords.set(searchWord, popularTerms.get(searchWord) + 1);
  } else {
    popularWords.set(searchWord, 1);
  }
};

export const getPopularDictionary = () => {
  return Array.from(popularWords.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
};
