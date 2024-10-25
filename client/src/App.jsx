import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import DefinitionList from "./components/DefinitionList";
import PopularWords from "./components/PopularWords";

function App() {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = (searchWord) => {
    console.log(`Searching for the word: ${searchWord}`);
    setSearchWord(searchWord);
  };

  return (
    <div className="App">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1>WAP Online Dictionary</h1>
      </header>
      <main className="container mx-auto p-4">
        <SearchForm onSearch={handleSearch} />
        <DefinitionList searchWord={searchWord} />
        <PopularWords />
      </main>
    </div>
  );
}

export default App;
