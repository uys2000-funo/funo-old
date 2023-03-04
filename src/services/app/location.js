import { getCurrentPosition, requestPermissions } from "../capacitor/location";
import { f } from "../debug";
import { getLocationApi } from "../geoCode/geocode";

export const getLocation = function (coordinates) {
  return f(getLocationApi, [coordinates[0], coordinates[1]]).then(
    ({ text, locations }) => {
      let result = {
        status: false,
        text: "",
        city: "",
        coordinates: { latitude: coordinates[0], longitude: coordinates[1] },
      };
      if (locations.length < 2) return result;
      result.status = true;
      result.address = text;
      result.city = locations[locations.length - 2].GeoObject.name;

      return result;
    }
  );
};

export const getCurrentLocation = function () {
  return f(getCurrentPosition)
    .catch(() => f(requestPermissions))
    .then(() => f(getCurrentPosition))
    .then(({ coords: { latitude, longitude } }) =>
      f(getLocation, [[latitude, longitude]])
    )
    .catch((res) => res);
};
