const { callbackify } = require("util");
const { fetchMyIP, fetchCoordsbyIP, fetchISSFlyOverTimes } = require("./iss");

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