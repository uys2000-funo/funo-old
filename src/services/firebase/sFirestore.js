import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import app from "./app";
import c from "../c";

const db = getFirestore(app);

export const createUserFirestore = function (uID, data) {
  c("Run: createUserFirestore", [uID, data]);
  data["events"] = [];
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

export const createEventFirestore = function (data) {
  c("Run: createEventFirestore", [data]);
  const refCol = collection(db, "E");
  return addDoc(refCol, data)
    .then((res) => c("Res: createEventFirestore", res))
    .catch((err) => c(["Res: createEventFirestore", err], false));
};
export const createEventFirestoreUser = function (uID, eID) {
  c("Run: createEventFirestoreUser", [uID, eID]);
  const refCol = doc(db, "U", uID);
  return updateDoc(refCol, { events: arrayUnion(eID) })
    .then((res) => c("Res: createEventFirestoreUser", res))
    .catch((err) => c(["Res: createEventFirestoreUser", err], false));
};
