import { f } from "../c";
import { getDocument } from "./core/sFirestore";

export const checkOpenBetaUser = function (key) {
  return f(getDocument, "openBeta", "key").then((res) => {
    console.log(res.data().key == key, res.data().key, key);
    return res.data().key == key;
  });
};
