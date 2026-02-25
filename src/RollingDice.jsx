import { useState } from "react";

export default function RollingDice() {
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling) return;

    setRolling(true);

    let rolls = 0;
    const interval = setInterval(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
      rolls++;

      if (rolls > 10) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 100);
  };

  const styles = {
    container: {
      width: "250px",
      margin: "50px auto",
      textAlign: "center",
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    dice: {
      fontSize: "80px",
      margin: "20px 0",
      transition: "transform 0.2s",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#646cff",
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <h2>🎲 Rolling Dice</h2>
      <div style={styles.dice}>{dice}</div>
      <button style={styles.button} onClick={rollDice}>
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
}