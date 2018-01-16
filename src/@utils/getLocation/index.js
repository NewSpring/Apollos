import { Location, Permissions } from 'expo';

let locationStatus;

const getLocation = async (...options) => {
  if (typeof locationStatus === 'undefined') {
    locationStatus = await Permissions.getAsync(Permissions.LOCATION);
  }

  if (!locationStatus || locationStatus.status !== 'granted') {
    locationStatus = await Permissions.askAsync(Permissions.LOCATION);
  }

  if (locationStatus.status !== 'granted') throw new Error('Location permission not granted');

  return Location.getCurrentPositionAsync(...options);
};

export default getLocation;
