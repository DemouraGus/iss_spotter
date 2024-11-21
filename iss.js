const needle = require("needle");

const fetchMyIP = function(callback) {
  needle.get("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ip = body.ip;
    callback(null, ip);
  });
};

const fetchCoordsbyIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (response.statusCode === 200 && body.success === false) {
      const msg = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(msg), null);
      return;
    }
    // if (!body.success) {
    //   const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
    //   callback(Error(message), null);
    //   return;
    // }
    
    const coordinates = { latitude: body.latitude, longitude: body.longitude };
    callback(null, coordinates);
  });
};

module.exports = { fetchMyIP, fetchCoordsbyIP };