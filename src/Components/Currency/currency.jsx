import {SwapOutlined} from "@ant-design/icons";
import { useState } from "react";
import "./currency.css";

const CurrencyConverter = () => {
  const [usdValue, setUsdValue] = useState("");
  const [vndValue, setVndValue] = useState("");
  const [isUsdToVnd, setIsUsdToVnd] = useState(true);

  const handleUsdChange = (event) => {
    const value = event.target.value;
    setUsdValue(value);
    setVndValue(value * 23000);
  };

  const handleVndChange = (event) => {
    const value = event.target.value;
    setUsdValue(value / 23000);
    setVndValue(value);
  };

  const handleToggle = () => {
    setIsUsdToVnd(!isUsdToVnd);
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="input-group">
        <label>
          {isUsdToVnd ? "USD" : "VND"}
          <input
            type="number"
            min="0"
            value={isUsdToVnd ? usdValue : vndValue}
            onChange={isUsdToVnd ? handleUsdChange : handleVndChange}
          />
        </label>
        <label>
          {isUsdToVnd ? "VND" : "USD"}
          <input
            type="number"
            min="0"
            value={isUsdToVnd ? vndValue : usdValue}
            onChange={isUsdToVnd ? handleVndChange : handleUsdChange}
          />
        </label>
      </div>
      <button onClick={handleToggle}>
        <SwapOutlined />
      </button>
    </div>
  );
};

export default CurrencyConverter;