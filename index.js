require('dotenv').config();
const express = require('express');
const fetchData = require('./fetchData');
const storeData = require('./storeData');
const formatNumber = require('./formatNumber');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// Serve Bootstrap CSS/JS from node_modules
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static('assets'));


app.get('/', (req, res) => {
    res.render('index', { value: null });
});

app.post('/calculate', async (req, res) => {
    const domain = req.body.domain;
    const unit = req.body.unit
    const numberValue = parseFloat(req.body.number);
    const [result] = await fetchData(domain, unit, numberValue);
    const value = formatNumber(result.value);
    const source = result.source;
    const name = result.name;

    // Render the page with the calculated result
    res.render('index', { numberValue, unit, name, value, domain, source });
});

app.get('/contribute', (req, res) => {
    res.render('contribute', {message: null});
});

app.post('/contribute', async (req, res) => {
    const name = req.body.name;
    const value = req.body.value;
    const domain = req.body.domain;
    const unit = req.body.unit;
    const source = req.body.source;
    console.log(domain, unit, name, value, source);
    const message = await storeData(domain, unit, name, value, source);
    console.log("msg",message);
    res.render('contribute', {message});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
