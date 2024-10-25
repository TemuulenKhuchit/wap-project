import express from "express";
import cors from "cors";
import dictionaryData from "./englishdictionary.json" assert { type: "json" };

const app = express();
const PORT = process.env.PORT || 5000;

let popularTerms = [];

// Middleware
app.use(cors());
app.use(express.json());

// Route to get definitions of a word
app.get("/api/search", (req, res) => {
  const term = req.query.term;

  console.log("Received search term:", term);

  if (!term) {
    return res.status(400).send("Search term is required");
  }

  // Use `.filter()` to find all entries for the word
  const results = dictionaryData.entries.filter((item) => item.word && item.word.toLowerCase() === term.toLowerCase());

  if (results.length > 0) {
    // Add to popular terms list
    popularTerms.push(term);
    res.json(results);
  } else {
    res.status(404).send("Term not found");
  }
});

// Route to get popular search terms
app.get("/api/popular", (req, res) => {
  // Get top 10 most popular search terms
  const uniqueTerms = [...new Set(popularTerms)];
  res.json(uniqueTerms.slice(0, 10));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
