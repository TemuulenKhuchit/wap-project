import React, { useState, useEffect } from "react";

const PopularTerms = () => {
  const [popularTerms, setPopularTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(25);

  // Fetch popular terms every 25 seconds
  useEffect(() => {
    const fetchPopularTerms = () => {
      setLoading(true);
      setError(null);

      // Placeholder for API call (replace this with actual API call later)
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

    // Fetch terms initially
    fetchPopularTerms();

    // Set an interval to fetch terms every 25 seconds
    const intervalId = setInterval(() => {
      fetchPopularTerms();
      setCounter(25); // Reset the countdown timer after each refresh
    }, 25000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (counter > 0) {
      const timerId = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [counter]);

  // Render loading, error, or the list of popular terms
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
