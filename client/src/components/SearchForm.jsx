import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (term) {
      onSearch(term);
    }
  };

  return (
    <form className="flex items-center justify-center mt-4" onSubmit={handleSearch}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Enter a word to search..."
        className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-700 transition-all">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
