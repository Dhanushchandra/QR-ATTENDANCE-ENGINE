export const getUserIp = () => {
  return new Promise((resolve, reject) => {
    fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((res) => resolve(res.ip))
      .catch((err) => reject(err));
  });
};

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Request the current position
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Retrieve latitude and longitude from the position object
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Create an object to store the latitude and longitude
          const location = {
            latitude: latitude,
            longitude: longitude,
          };

          // Resolve the promise with the location object
          resolve(location);
        },
        function (error) {
          // Reject the promise with the error
          reject(error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      reject(new Error("Geolocation is not supported"));
    }
  });
};
