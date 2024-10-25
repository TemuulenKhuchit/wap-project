import express from "express";
import cors from "cors";
import dictionaryData from "./englishdictionary.json" assert { type: "json" };

const app = express();
const PORT = process.env.PORT || 5000;

let popularTerms = [];

app.use(cors());
app.use(express.json());

app.get("/api/search", (req, res) => {
  const term = req.query.term;

  if (!term) return res.status(400).send("Search term is required");

  const results = dictionaryData.entries.filter((item) => item.word && item.word.toLowerCase() === term.toLowerCase());

  if (results.length > 0) {
    popularTerms.push(term);
    res.json(results);
  } else res.status(404).send("Term not found");
});

app.get("/api/popular", (req, res) => {
  const uniqueTerms = [...new Set(popularTerms)];
  res.json(uniqueTerms.slice(0, 10));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
