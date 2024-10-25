import DB from "../englishdictionary.json" assert { type: "json" };

let popularWords = new Map();

export const getDefinitions = (searchWord) => {
  return DB.entries.filter((row) => row.word && row.word.toLowerCase() === searchWord.toLowerCase());
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
