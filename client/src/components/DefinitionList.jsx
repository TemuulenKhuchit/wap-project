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
          setDefinitions(data.definitions);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [searchTerm]);

  if (loading) {
    return <p>Loading definitions...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (definitions.length === 0 && searchTerm) {
    return <p>No definitions found.</p>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Definitions for "{searchTerm}":</h2>
      <ul className="list-disc list-inside">
        {definitions.map((definition, index) => (
          <li key={index}>{definition}</li>
        ))}
      </ul>
    </div>
  );
};

export default DefinitionList;
