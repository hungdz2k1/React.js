import { useState } from 'react';
import "./caculator.css";
import * as math from 'mathjs';
import { Modal } from 'antd';
import { useTranslation } from "react-i18next";

function Calculator() {
  const { t } = useTranslation();
  const [calc, setCalc] = useState("");
  const [lastOperator, setLastOperator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
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
      if (calc === "" || ops.includes(calc.slice(-1))) {
        setCalc(calc.slice(0, -1) + value);
      } else {
        setCalc(calc + value);
      }
      setLastOperator(value);
    } else {
      setCalc(calc + value);
      setLastOperator(null);
    }
  }

  const calculate = () => {
    try {
      const value = math.evaluate(calc);
      setCalc(value.toString());
    } catch (error) {
      showModal(true);
    }
  }

  const deleteLast = () => {
    if (calc.length > 0) {
      const value = calc.slice(0, -1);
      setCalc(value);
      setLastOperator(null);
    }
  }

  const clearAll = () => {
    setCalc("");
    setLastOperator(null);
  }

  const toggleNeg = () => {
    if (calc === "") {
      return;
    }

    const value = parseFloat(calc);
    setCalc((-1 * value).toString());
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
          <button className={lastOperator === "-" ? "active" : ""} onClick={() =>updateCalc('-')}>-</button>
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

      <Modal title={t("modal.title")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{t("modal.content")}</p>
      </Modal>
    </div>
  );
}

export default Calculator;