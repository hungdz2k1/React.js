import { SwapOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./currency.css";
import { useTranslation } from "react-i18next";

const CurrencyConverter = () => {
  const { t } = useTranslation();
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
      <h2>{t("currency.title")}</h2>
      <div className="input-group">
        <label>
          <select value={isUsdToVnd ? "USD" : "VND"} onChange={(e) => setIsUsdToVnd(e.target.value === "USD")}>
            <option value="USD">USD</option>
            <option value="VND">VND</option>
          </select>
          <input
            type="number"
            min="0"
            value={isUsdToVnd ? usdValue : vndValue}
            onChange={isUsdToVnd ? handleUsdChange : handleVndChange}
          />
        </label>
        <label>
          <select value={isUsdToVnd ? "VND" : "USD"} onChange={(e) => setIsUsdToVnd(e.target.value === "USD")}>
            <option value="VND">VND</option>
            <option value="USD">USD</option>
          </select>
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