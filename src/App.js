import React from "react";
import "./App.css";

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ["/", "*", "-", "+"];
const ids = {
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero",
  "/": "divide",
  "*": "multiply",
  "-": "subtract",
  "+": "add",
};

class App extends React.Component {
  state = {
    lastPressed: undefined,
    calc: "0",
    operation: undefined,
  };

  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText) {
      case "AC": {
        this.setState({
          calc: "0",
        });
        break;
      }

      case "=": {
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated,
        });
        break;
      }

      case ".": {
        const splitted = calc.split(/[+\-*/]/);
        const last = splitted.slice(-1)[0];

        if (!last.includes(".")) {
          this.setState({
            calc: calc + ".",
          });
        }

        break;
      }

      default: {
        let e = undefined;
        if (operations.includes(innerText)) {
          if (operations.includes(lastPressed) && innerText !== "-") {
            const lastNumberIdx = calc
              .split("")
              .reverse()
              .findIndex((char) => char !== " " && numbers.includes(+char));
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else {
          e = calc === "0" ? innerText : calc + innerText;
        }

        this.setState({
          calc: e,
        });
      }
    }

    this.setState({
      lastPressed: innerText,
    });
  };

  render() {
    const { calc } = this.state;

    return (
      <div className="calculator">
        <div id="display" className="display">
          {calc}
        </div>

        <div className="numbers-container">
          <button
            className="bigger-h grey ac"
            onClick={this.handleClick}
            id="clear"
          >
            AC
          </button>
          {/* <button
            className="cyan divide"
            onClick={this.handleClick}
            id="divide"
          >
            /
          </button> */}

          {numbers.map((num) => (
            <button
              className={`grey ${num === 0 && "big-h"}`}
              key={num}
              onClick={this.handleClick}
              id={ids[num]}
            >
              {num}
            </button>
          ))}

          <button className="grey" onClick={this.handleClick} id="decimal">
            .
          </button>
        </div>
        <div className="operations-container">
          {operations.map((op) => (
            <button
              className="cyan"
              key={op}
              onClick={this.handleClick}
              id={ids[op]}
            >
              {op}
            </button>
          ))}

          <button
            className="cyan equals"
            onClick={this.handleClick}
            id="equals"
          >
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;
