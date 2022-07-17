import React from 'react';
import './style.css';

export default function App() {
  const [state, setState] = React.useState({
    binary: '',
    decimal: '',
    errorMessage: null,
  });
  const { binary, errorMessage, decimal } = state;

  const handleChange = (e) => {};

  const handleKeyPress = (e) => {
    if (e.key === '1' || e.key === '0') {
      setState((prevState) => {
        const newState = { ...prevState };

        if (prevState.binary.length > 7) {
          newState.errorMessage = 'The number is 8 digits long';
          return newState;
        }

        if (prevState.errorMessage) {
          newState.errorMessage = null;
        }

        newState.binary = prevState.binary + e.key;
        return newState;
      });
    } else {
      setState((prevState) => ({
        ...prevState,
        errorMessage: 'Enter either 1 or 0',
      }));
    }
  };

  const handleBackspace = () =>
    setState((prevState) => {
      const newState = { ...prevState };

      if (prevState.binary) {
        newState.binary = prevState.binary.slice(0, -1);

        if (prevState.decimal) {
          newState.decimal = '';
        }
        
        return newState;
      }

      return prevState;
    });

  const clearInput = () =>
    setState({
      decimal: '',
      binary: '',
      errorMessage: null,
    });

  const convertToDecimal = () =>
    setState((prevState) => {
      if (prevState.binary) {
        return {
          ...prevState,
          errorMessage: null,
          decimal: parseInt(prevState.binary, 2),
        };
      }
      return prevState;
    });

  return (
    <div>
      <h1>Binary to Decimal</h1>
      <label>
        Enter a binary digit (max length of 8)
        <br />
        <input
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={binary}
        />
      </label>
      <button onClick={handleBackspace}>backspace</button>
      <br />
      <span>{errorMessage}</span>
      <br />
      <button onClick={clearInput}>clear input</button>
      <button onClick={convertToDecimal}>convert</button>
      <br />
      {decimal && <span>Result: {decimal}</span>}
    </div>
  );
}
