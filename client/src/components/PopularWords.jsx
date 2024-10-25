import React, { useState, useEffect } from "react";

const PopularWords = () => {
  const [popularWords, setPopularWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(25);

  useEffect(() => {
    const fetchPopularWords = () => {
      setLoading(true);
      setError(null);

      fetch("http://localhost:5000/api/popular")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch popular words!");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Popular words fetched:", data);
          setPopularWords(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchPopularWords();

    const intervalId = setInterval(() => {
      fetchPopularWords();
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
    return <p>Loading popular words...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Top 10 Popular Search Words (refreshing in {counter}s):</h2>
      <ul className="list-decimal list-inside">
        {popularWords.length === 0 ? (
          <li>No popular words found</li>
        ) : (
          popularWords.map((word, index) => <li key={index}>{word}</li>)
        )}
      </ul>
    </div>
  );
};

export default PopularWords;
