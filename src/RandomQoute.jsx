import React, { useState } from "react";

const quotes = [
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Don’t let yesterday take up too much of today. – Will Rogers",
  "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you."
];

function RandomQuote() {
  const [quote, setQuote] = useState(quotes[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  // Inline styles
  const containerStyle = {
    textAlign: "center",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif"
  };

  const quoteStyle = {
    fontSize: "1.3rem",
    marginBottom: "15px",
    color: "#333"
  };

  const buttonStyle = {
    padding: "8px 16px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px"
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049"
  };

  // Optional: handle hover manually
  const [hover, setHover] = useState(false);

  return (
    <div style={containerStyle}>
      <p style={quoteStyle}>{quote}</p>
      <button
        style={{ ...buttonStyle, ...(hover ? buttonHoverStyle : {}) }}
        onClick={getRandomQuote}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Generate Quote
      </button>
    </div>
  );
}

export default RandomQuote;