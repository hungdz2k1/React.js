import { useState } from 'react';
import './helloworld.css';

function HelloWorld() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You entered: ${inputValue}`);
  };

  return (
    <div className='hello-world'>
      <h1>Input Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a value:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
      </form>
      <div>
        <label>You entered: </label>{inputValue}
      </div>
    </div>
  );
}

export default HelloWorld;