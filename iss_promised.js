const needle = require("needle");

const fetchMyIP = function() {
  return needle("get", "https://api.ipify.org?format=json")
    .then((response) => {
      const ip = response.body.ip;
      return ip;
    });
};

const fetchCoordsbyIP = function(ip) {
  return needle("get", `http://ipwho.is/${ip}`)
    .then((response) => {
      const coords = { latitude: response.body.latitude, longitude: response.body.longitude };
      return coords;
    });
};

const fetchISSFlyOverTimes = function(coords) {
  return needle("get", `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
    .then((response) => {
      const passTimes = response.body.response;
      return passTimes;
    });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsbyIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passTimes) => {
      return passTimes;
    });
};

module.exports = { nextISSTimesForMyLocation };