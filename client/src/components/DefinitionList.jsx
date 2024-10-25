import React, { useEffect, useState } from "react";

const DefinitionList = ({ searchWord }) => {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchWord) {
      setLoading(true);
      setError(null);

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/search?word=${searchWord}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Word not found!");
          }
          return response.json();
        })
        .then((data) => {
          setDefinitions(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setDefinitions([]);
    }
  }, [searchWord]);

  if (loading) {
    return <p className="text-gray-500 text-center">Loading definitions, please wait...</p>;
  }

  if (error) {
    if (error === "Word not found!") {
      return <p className="text-gray-500 text-center">No definitions found for "{searchWord}".</p>;
    } else {
      return <p className="text-red-500 text-center">Error: Something went wrong! Please try again later.</p>;
    }
  }

  if (definitions.length === 0 && searchWord) {
    return <p className="text-gray-500 text-center">No definitions found.</p>;
  }

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Definitions for "{searchWord}":</h2>
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
