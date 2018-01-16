const getLocation = () => new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  } else {
    reject();
  }
});

export default getLocation;
