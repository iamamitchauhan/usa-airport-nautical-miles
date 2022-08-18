/**
 *
 * @param lat1 from latitude
 * @param lat2 to latitude
 * @param lon1 from longitude
 * @param lon2 to longitude
 * @returns
 */

export const distance = (lat1: number, lat2: number, lon1: number, lon2: number) => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let result = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let ans = 2 * Math.asin(Math.sqrt(result));

  // Radius of earth in kilometers.
  let radius = 6371;

  // calculate the result
  return ans * radius;
};
