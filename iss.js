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
      const msg = `Status Code ${response.statusCode} when fetching coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (!body.success) {
      const msg = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(msg), null);
      return;
    }
    const coords = { latitude: body.latitude, longitude: body.longitude };
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (body.message !== "success") {
      const msg = `Message was ${body.message} when fetching fly over times for coordinates lat: ${coords.latitude} lon: ${coords.longitude}.`;
      callback(Error(msg), null);
    }
    callback(null, body.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsbyIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, response) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, response);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };