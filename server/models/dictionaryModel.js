import DB from "./englishdictionary.json" assert { type: "json" };

let popularWords = [];

export const getDefinitions = (searchWord) => {
  return DB.entries.filter((row) => row.word && row.word.toLowerCase() === searchWord.toLowerCase());
};

export const addPopularWords = (searchWord) => {
  popularWords.push(searchWord);
};

export const getPopularWords = () => {
  return [...new Set(popularWords)].slice(0, 10);
};
