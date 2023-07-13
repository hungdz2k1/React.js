import { Select } from "antd";
import i18next from "./i18n";
import vietnam from "../../assets/vietnam.png"
import english from "../../assets/english.png";

const LanguageSelector = () => {
  const handleLanguageChange = (value) => {
    i18next.changeLanguage(value);
  };

  return (
    <Select defaultValue="en" onChange={handleLanguageChange}>
      <Select.Option value="vi">
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          className="flag"
          src={vietnam}
          alt="Tiếng Việt"
        />
      </Select.Option>
      <Select.Option value="en">
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          className="flag"
          src={english}
          alt="English"
        />
      </Select.Option>
    </Select>
  );
};

export default LanguageSelector;