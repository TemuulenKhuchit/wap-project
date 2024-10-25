import { getDefinitions, addPopularWord, getPopularDictionary } from "../models/dictionaryModel.js";

export const searchDictionary = async (req, res) => {
  const searchWord = req.query.word;

  if (searchWord) {
    try {
      const results = await getDefinitions(searchWord);
      console.log("results.length: ", results.length);
      console.log("Results: ", results);

      if (results.length > 0) {
        await addPopularWord(searchWord);
        res.json(results);
      } else res.status(404).send("This word doesn't exist in the dictionary!");
    } catch (error) {
      console.error("Error while searching dictionary:", error);
      res.status(500).send("Internal server error");
    }
  } else res.status(400).send("Search word is required!");
};

export const getPopularWords = async (req, res) => {
  try {
    const popularWords = await getPopularDictionary();
    res.json(popularWords);
  } catch (error) {
    console.error("Error while fetching popular words:", error);
    res.status(500).send("Internal server error");
  }
};
