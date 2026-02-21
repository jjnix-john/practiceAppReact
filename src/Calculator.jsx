import React, { Component } from "react";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleClick = (value) => {
    this.setState({
      input: this.state.input + value
    });
  };

  calculateResult = () => {
    try {
      this.setState({
        input: eval(this.state.input).toString()
      });
    } catch {
      this.setState({
        input: "Error"
      });
    }
  };

  clearInput = () => {
    this.setState({
      input: ""
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <h2>Simple Calculator</h2>

        <input
          type="text"
          value={this.state.input}
          readOnly
          style={styles.display}
        />

        <div style={styles.buttons}>
          <button onClick={() => this.handleClick("7")}>7</button>
          <button onClick={() => this.handleClick("8")}>8</button>
          <button onClick={() => this.handleClick("9")}>9</button>
          <button onClick={() => this.handleClick("/")}>/</button>

          <button onClick={() => this.handleClick("4")}>4</button>
          <button onClick={() => this.handleClick("5")}>5</button>
          <button onClick={() => this.handleClick("6")}>6</button>
          <button onClick={() => this.handleClick("*")}>*</button>

          <button onClick={() => this.handleClick("1")}>1</button>
          <button onClick={() => this.handleClick("2")}>2</button>
          <button onClick={() => this.handleClick("3")}>3</button>
          <button onClick={() => this.handleClick("-")}>-</button>

          <button onClick={() => this.handleClick("0")}>0</button>
          <button onClick={this.clearInput}>C</button>
          <button onClick={this.calculateResult}>=</button>
          <button onClick={() => this.handleClick("+")}>+</button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: "250px",
    margin: "50px auto",
    textAlign: "center",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  display: {
    width: "100%",
    height: "40px",
    marginBottom: "10px",
    fontSize: "18px",
    textAlign: "right",
    paddingRight: "5px"
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "5px"
  }
};

export default Calculator;