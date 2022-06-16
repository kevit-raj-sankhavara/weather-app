const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=60919a9564807f8d1ef7cf8893858cb5&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (err, res) => {
        if (err)
            callback("Something went wrong!!", undefined);
        else {
            if (res.body.error)
                callback("Data not found. Please enter appropiate value", undefined);
            else {
                const data = res.body;
                callback(undefined, data)
            }
        }
    })
}

module.exports = forecast;