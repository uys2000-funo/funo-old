import { f } from "../c";
import { getDocument } from "./core/sFirestore";

export const checkOpenBetaUser = function (key) {
  return f(getDocument, "openBeta", "key").then((res) => {
    return res.data().key == key;
  });
};
