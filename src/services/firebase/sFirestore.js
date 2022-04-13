import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "./app";
import c from "../c";

const db = getFirestore(app);

export const createUserFirestore = function (uID, data) {
  c("Run: createUserFirestore", [uID, data]);
  const refDoc = doc(db, "U", uID);
  return setDoc(refDoc, data)
    .then((res) => c(["Res: createUserFirestore", res], true))
    .catch((err) => c(["Res: createUserFirestore", err], false));
};
export const getUserFirestore = function (uID) {
  c("Run: getUserFirestore", uID);
  const refDoc = doc(db, "U", uID);
  return getDoc(refDoc)
    .then((res) => c("Res: getUserFirestore", res))
    .catch((err) => c(["Res: getUserFirestore", err], false));
};
