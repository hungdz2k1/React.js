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
        <div style={{display: 'flex',alignItems: 'center',gap: '0.5em'}}>
          <img
            style={{ objectFit: "cover", borderRadius: "50%" }}
            className="flag"
            src={vietnam}
            alt="Tiếng Việt"
          />
          <span>VI</span>
        </div>
      </Select.Option>
      <Select.Option value="en">
        <div style={{display: 'flex',alignItems: 'center',gap: '0.5em'}}>
          <img
            style={{ objectFit: "cover", borderRadius: "50%" }}
            className="flag"
            src={english}
            alt="English"
          />
          <span>EN</span>
        </div>
      </Select.Option>
    </Select>
  );
};

export default LanguageSelector;