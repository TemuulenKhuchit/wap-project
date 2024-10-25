import React, { useEffect, useState } from "react";

const DefinitionList = ({ searchTerm }) => {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch definitions when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:5000/api/search?term=${searchTerm}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Term not found");
          }
          return response.json();
        })
        .then((data) => {
          setDefinitions(data); // Set definitions as the entire array of matched definitions
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setDefinitions([]);
    }
  }, [searchTerm]);

  // Render loading, error, or the list of definitions
  if (loading) {
    return <p className="text-gray-500 text-center">Loading definitions...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (definitions.length === 0 && searchTerm) {
    return <p className="text-gray-500 text-center">No definitions found.</p>;
  }

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Definitions for "{searchTerm}":</h2>
      <ul className="list-disc list-inside">
        {definitions.map((item, index) => (
          <li key={index} className="text-lg text-gray-700">
            <strong>{item.wordtype ? `${item.wordtype}: ` : ""}</strong>
            {item.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DefinitionList;
