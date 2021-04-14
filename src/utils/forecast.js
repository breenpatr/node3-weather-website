const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0cca3cf55f5ca3f4af8c93fd398c9ec6&query=' + longitude + ',' + latitude
    console.log(url)
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ' It is currently ' 
            + response.body.current.temperature + ' degress out but it feels like ' 
            + response.body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast



