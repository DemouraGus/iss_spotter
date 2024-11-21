const { callbackify } = require("util");
const { fetchMyIP, fetchCoordsbyIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsbyIP("173.181.12.16242", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(coordinates);
// });

// fetchISSFlyOverTimes({ latitude: 49.2827291, longitude: -123.1207375}, (error, response) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(response);
// });
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});

