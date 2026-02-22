import { useState } from "react";

function CoinFlipper() {
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [count, setCount] = useState(0);

  const flipCoin = () => {
    if (flipping) return;

    setFlipping(true);

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(outcome);
      setCount(prev => prev + 1);
      setFlipping(false);
    }, 1000);
  };

  return (
    <div className="coin-container">
      <h2>Coin Flipper</h2>

      <div className={`coin ${flipping ? "flip" : ""}`}>
        {result ? result : "?"}
      </div>

      <button onClick={flipCoin} disabled={flipping}>
        {flipping ? "Flipping..." : "Flip Coin"}
      </button>

      <p>Total Flips: {count}</p>
    </div>
  );
}

export default CoinFlipper;