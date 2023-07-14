import { useState } from 'react';
import './helloworld.css';
import { useTranslation } from "react-i18next";


function HelloWorld() {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='hello-world'>
      <h1 style={{paddingBottom: '1em'}}>{t("helloworld.title")}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          {t("helloworld.enter")}:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
      </form>
      <div>
        <label>{t("helloworld.entered")}:</label>{inputValue}
      </div>
    </div>
  );
}

export default HelloWorld;