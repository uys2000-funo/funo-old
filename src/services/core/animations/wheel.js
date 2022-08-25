export const getRotateTL = function (currentPosition, lastPosition) {
  let x = currentPosition[0] - lastPosition[0];
  let y = currentPosition[1] - lastPosition[1];
  return x - y;
};
export const getRotateTR = function (currentPosition, lastPosition) {
  let x = currentPosition[0] - lastPosition[0];
  let y = lastPosition[1] - currentPosition[1];
  return x - y;
};
export const getRotateBL = function (currentPosition, lastPosition) {
  let x = lastPosition[0] - currentPosition[0];
  let y = currentPosition[1] - lastPosition[1];
  return x - y;
};
export const getRotateBR = function (currentPosition, lastPosition) {
  let x = lastPosition[0] - currentPosition[0];
  let y = lastPosition[1] - currentPosition[1];
  return x - y;
};
export const getSide = function (lastPosition, size) {
  let [x, y] = [false, false];
  if (lastPosition[0] < size[0] / 2) x = true;
  if (lastPosition[1] < size[1] / 2) y = true;
  return [x, y];
};
export const getRotate = function (currentPosition, lastPosition, side) {
  const gr = [currentPosition, lastPosition];
  if (side[0] && side[1]) return getRotateTL(gr[0], gr[1]);
  else if (!side[0] && side[1]) return getRotateTR(gr[0], gr[1]);
  else if (side[0] && !side[1]) return getRotateBL(gr[0], gr[1]);
  else return getRotateBR(gr[0], gr[1]);
};
export const getLastValues = function (currentPosition, size) {
  return [currentPosition, getSide(currentPosition, size)];
};
export const getLastRotate = function (rotation, p) {
  const e = rotation % p;
  const k = Math.floor(rotation / p);
  if (rotation < 0)
    if (e < p / 2) return (k + 1) * p;
    else return k * p;
  else {
    if (e < p / 2) return k * p;
    else return (k + 1) * p;
  }
};
