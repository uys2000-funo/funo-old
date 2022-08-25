export const getRoateTL = function (currentPosition, lastPosition) {
  let x = currentPosition[0] - lastPosition[0];
  let y = currentPosition[1] - lastPosition[1];
  return x - y;
};
export const getRoateTR = function (currentPosition, lastPosition) {
  let x = currentPosition[0] - lastPosition[0];
  let y = lastPosition[1] - currentPosition[1];
  return x - y;
};
export const getRoateBL = function (currentPosition, lastPosition) {
  let x = lastPosition[0] - currentPosition[0];
  let y = currentPosition[0] - lastPosition[1];
  return x - y;
};
export const getRoateBR = function (currentPosition, lastPosition) {
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
  if (side[0] && side[1]) return getRoateTL(gr[0], gr[1]);
  else if (!side[0] && side[1]) return this.rotateTR(gr[0], gr[1]);
  else if (side[0] && !side[1]) return this.rotateBL(gr[0], gr[1]);
  else return this.rotateBR(gr[0], gr[1]);
};
export const getLastValues = function (currentPosition, size) {
  return [currentPosition, getSide(currentPosition, size)];
};
export const getLastRotate = function (rotation) {
  this.trans = "; transition: 1s";
  const r = rotation % 90;
  const k = Math.floor(rotation / 90);
  if (rotation < 0)
    if (r < 45) return (k + 1) * 90;
    else return k * 90;
  else {
    if (r < 45) return k * 90;
    else return (k + 1) * 90;
  }
};
