import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import DefinitionList from "./components/DefinitionList";
import PopularTerms from "./components/PopularTerms";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    console.log(`Searching for the term: ${term}`); // Debugging statement
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1>WAP Online Dictionary</h1>
      </header>
      <main className="container mx-auto p-4">
        <SearchForm onSearch={handleSearch} />
        <DefinitionList searchTerm={searchTerm} />
        <PopularTerms />
      </main>
    </div>
  );
}

export default App;
