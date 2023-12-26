const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const conversionRates = {
    'USD_TO_EUR': 0.85,
    'USD_TO_GBP': 0.75,
    'USD_TO_INR': 85.0,
    'USD_TO_AUD': 1.35,
    'USD_TO_JPY': 110.0,
    'USD_TO_USD': 1.0,
  
    'EUR_TO_USD': 1.18,
    'EUR_TO_GBP': 0.88,
    'EUR_TO_INR': 92.0,
    'EUR_TO_AUD': 1.57,
    'EUR_TO_JPY': 130.0,
    'EUR_TO_EUR': 1.0,
  
    'GBP_TO_USD': 1.33,
    'GBP_TO_EUR': 1.14,
    'GBP_TO_INR': 105.0,
    'GBP_TO_AUD': 1.79,
    'GBP_TO_JPY': 150.0,
    'GBP_TO_GBP': 1.0,
  
    'INR_TO_USD': 0.012,
    'INR_TO_EUR': 0.011,
    'INR_TO_GBP': 0.0095,
    'INR_TO_AUD': 0.017,
    'INR_TO_JPY': 1.4,
    'INR_TO_INR': 1.0,
  
    'AUD_TO_USD': 0.74,
    'AUD_TO_EUR': 0.64,
    'AUD_TO_GBP': 0.56,
    'AUD_TO_INR': 58.0,
    'AUD_TO_JPY': 82.0,
    'AUD_TO_AUD': 1.0,
  
    'JPY_TO_USD': 0.0091,
    'JPY_TO_EUR': 0.0077,
    'JPY_TO_GBP': 0.0067,
    'JPY_TO_INR': 0.71,
    'JPY_TO_AUD': 0.012,
    'JPY_TO_JPY': 1.0,
  };

app.post('/convert', (req, res) => {
  const { from_currency, to_currency, amount } = req.body;
  const conversionKey = `${from_currency}_TO_${to_currency}`;

  try {
    if (!(conversionKey in conversionRates)) {
      console.error('Invalid currency pair:', conversionKey);
      return res.status(400).json({ error: 'Invalid currency pair.' });
    }

    const conversionRate = conversionRates[conversionKey];
    const convertedAmount = amount * conversionRate;

    // Log for debugging
    console.log('Conversion:', `${amount} ${from_currency} to ${convertedAmount.toFixed(2)} ${to_currency}`);

    res.json({
      result: `${amount} ${from_currency} is equal to ${convertedAmount.toFixed(2)} ${to_currency}`,
    });
  } catch (error) {
    console.error('Conversion Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
