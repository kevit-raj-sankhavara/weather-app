const request = require("postman-request");

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=facd7a7332ae5e462b3c59f071fb3c12&query=${encodeURIComponent(address)}&limit=1`;

    request({ url, json: true }, (err, res) => {
        if (err)
            callback("Something went wrong!!", undefined);
        else {
            if (res.body.error || res.body.data.length === 0) {
                callback("Data not found. Please enter appropiate value", undefined);
            }
            else {
                const data = res.body.data[0];
                const coordinates = { latitude: data.latitude, longitude: data.longitude, place: data.name };
                callback(undefined, coordinates);
            }
        }
    })
}

module.exports = geocode;