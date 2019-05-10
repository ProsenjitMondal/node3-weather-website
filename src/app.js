const path = require('path');
const express = require('express');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static derectory to serve
app.use(express.static(publicDirectoryPath));

// Setup ejs engine and views location
app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prosenjit Mondal'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                message: `${forecast.summary} It is currently ${forecast.temperature} degrees out. There is a ${forecast.precipProbability}% chance of rain`,
                forecast,
                location,
                address,
                temperatureHigh: forecast.temperatureHigh,
                temperatureLow: forecast.temperatureLow
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You have to provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Prosenjit Mondal'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Prosenjit Mondal'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prosenjit Mondal',
        errorMessage: 'Help Article Is Not Found!'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prosenjit Mondal',
        errorMessage: 'Page Not Found!'
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});