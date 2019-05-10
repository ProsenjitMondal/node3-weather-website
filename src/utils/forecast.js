const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url =`https://api.darksky.net/forecast/7d628556714bd8180bb4e75f804454ae/${latitude},${longitude}`;

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (body.code === 400) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                temperatureHigh: body.daily.data[0].temperatureHigh,
                temperatureLow: body.daily.data[0].temperatureLow
            });
        }
    });
};

module.exports = forecast;