import dictModel from "../models/dictionaryModel.js";

export const searchDictionary = (req, res) => {
  const searchWord = req.query.searchWord;

  if (searchWord) {
    const results = dictModel.getDefinitions(searchWord);

    if (results.length > 0) {
      dictModel.addPopularWords(searchWord);
      res.status(200).json(results);
    } else res.status(404).send("This word doesn't exist in the dictionary!");
  } else res.status(400).send("Search word is required!");
};

export const getPopularWords = (req, res) => {
  const popularWords = dictModel.getPopularWords();
  res.json(popularWords);
};
