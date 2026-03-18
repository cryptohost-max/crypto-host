require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Crypto Host - Currency Converter', result: null });
});

app.get('/api/convert', async (req, res) => {
    try {
        const { from, to, amount } = req.query;
        if (!from || !to || !amount) {
            return res.status(400).json({ error: 'Missing parameters' });
        }
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`;
        const response = await axios.get(url);
        if (!response.data[from] || !response.data[from][to]) {
            return res.status(404).json({ error: 'Conversion rate not found' });
        }
        const rate = response.data[from][to];
        const convertedAmount = parseFloat(amount) * rate;
        res.json({ from, to, amount: parseFloat(amount), rate, result: convertedAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
