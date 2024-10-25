import React, { useEffect, useState } from "react";

const DefinitionList = ({ searchTerm }) => {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          setDefinitions(data);
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

  if (loading) {
    return <p className="text-gray-500 text-center">Loading definitions, please wait...</p>;
  }

  if (error) {
    if (error === "Term not found") {
      return <p className="text-gray-500 text-center">No definitions found for "{searchTerm}".</p>;
    } else {
      return <p className="text-red-500 text-center">Error: Something went wrong. Please try again later.</p>;
    }
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
