import { getImage } from "./core/sStorage";
import { f } from "../c";

export const getImg = function (imgDirection) {
  return f(getImage, imgDirection);
};
