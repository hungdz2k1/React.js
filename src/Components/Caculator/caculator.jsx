import { useState } from 'react';
import "./caculator.css";

function Caculator() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [lastOperator, setLastOperator] = useState(null);
  console.log(result);

  const ops = ['/', '*', '-', '+', '.'];

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(<button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>);
    }

    return digits;
  }

  const updateCalc = (value) => {
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      if (calc === "" || calc.slice(-1) === "+" || calc.slice(-1) === "-" || calc.slice(-1) === "*" || calc.slice(-1) === "/") {
        setCalc(calc.slice(0, -1) + value);
      } else {
        setCalc(calc + value);
      }
      setLastOperator(value);
    } else {
      setCalc(calc + value);
    }

    if (!ops.includes(value)) {
      setResult(parseFloat(calc + value).toString());
    }
  }

  const calculate = () => {
    const value = eval(calc);
    setCalc(value.toString());
    setResult("");
    setLastOperator(null);
  }

  const deleteLast = () => {
    const value = calc.slice(0, -1);
    setCalc(value);
    if (value) {
      setResult(parseFloat(value).toString());
    } else {
      setResult("");
    }
  }

  const clearAll = () => {
    setCalc("");
    setResult("");
    setLastOperator(null);
  }

  const toggleNeg = () => {
    if (calc === "") {
      return;
    }

    const value = parseFloat(calc);
    setCalc((-1 * value).toString());
    setResult((-1 * value).toString());
  }

  return ( 
    <div className="App">
      <div className="calculator">
        <div className="display">
          {calc || 0}
        </div>

        <div className="operators">
          <button className={lastOperator === "/" ? "active" : ""} onClick={() => updateCalc('/')}>/</button>
          <button className={lastOperator === "*" ? "active" : ""} onClick={() => updateCalc('*')}>x</button>
          <button className={lastOperator === "-" ? "active" : ""} onClick={() => updateCalc('-')}>-</button>
          <button className={lastOperator === "+" ? "active" : ""} onClick={() => updateCalc('+')}>+</button>
        </div>

        <div className="negative">
          <button onClick={toggleNeg}>+/-</button>
          <button onClick={deleteLast}>DEL</button>
          <button onClick={clearAll}>AC</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Caculator;