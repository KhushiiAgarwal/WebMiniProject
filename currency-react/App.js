// npm install concurrently --save-dev
// npm install express body-parser

// Add ServiceWorkerRegistration.js outside src with package.json

// package.json changes

// "scripts": {
//   "start": "concurrently \"npm run start:backend\" \"npm run start:frontend\"",
//   "start:backend": "node server.js",
//   "start:frontend": "react-scripts start",
//   "build": "react-scripts build",
//   "test": "react-scripts test",
//   "eject": "react-scripts eject"
// }
import React, { useState } from 'react';
import axios from 'axios';

const currencyOptions = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'JPY'];

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [error, setError] = useState('');

  const convertCurrency = async () => {
    try {
      const response = await axios.post('http://localhost:3001/convert', {
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount: parseFloat(amount),
      });

      setConvertedAmount(response.data.result);
      setError('');
    } catch (err) {
      setConvertedAmount('');
      setError('Error converting currency. Please enter a valid amount.');
    }
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div>
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To Currency:</label>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Enter Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={convertCurrency}>Convert</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {convertedAmount && <p>{convertedAmount}</p>}
    </div>
  );
}

export default App;
