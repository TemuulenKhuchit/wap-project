import React, { useState, useEffect } from "react";

const PopularTerms = () => {
  const [popularTerms, setPopularTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(25);

  useEffect(() => {
    const fetchPopularTerms = () => {
      setLoading(true);
      setError(null);

      fetch("http://localhost:5000/api/popular")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch popular terms");
          }
          return response.json();
        })
        .then((data) => {
          setPopularTerms(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchPopularTerms();

    const intervalId = setInterval(() => {
      fetchPopularTerms();
      setCounter(25);
    }, 25000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (counter > 0) {
      const timerId = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [counter]);

  if (loading) {
    return <p>Loading popular terms...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Top 10 Popular Search Terms (refreshing in {counter}s):</h2>
      <ul className="list-decimal list-inside">
        {popularTerms.length === 0 ? (
          <li>No popular terms found</li>
        ) : (
          popularTerms.map((term, index) => <li key={index}>{term}</li>)
        )}
      </ul>
    </div>
  );
};

export default PopularTerms;
