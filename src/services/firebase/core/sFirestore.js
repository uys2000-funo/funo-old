import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  arrayRemove,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import app from "./app";
const db = getFirestore(app);

export const createUserFirestore = function (uID, data) {
  data["events"] = [];
  data["joinEvent"] = [];
  const refDoc = doc(db, "U", uID);
  return setDoc(refDoc, data);
};
export const getUserFirestore = function (uID) {
  const refDoc = doc(db, "U", uID);
  return getDoc(refDoc);
};

export const createEventFirestore = function (data) {
  data["timestamp"] = serverTimestamp();
  data["joinEvent"] = [];
  data["joinEventCount"] = 0;
  const refCol = collection(db, "E");
  return addDoc(refCol, data);
};
export const createEventFirestoreUser = function (uID, eID) {
  const refCol = doc(db, "U", uID);
  return updateDoc(refCol, { events: arrayUnion(eID) });
};
export const getAllEvetntsFirestore = function () {
  const refCol = collection(db, "E");
  return getDocs(refCol);
};
export const getEventFirestore = function (eID) {
  const refDoc = doc(db, "E", eID);
  return getDoc(refDoc);
};
export const updateEvent = function (eID, event) {
  const refDoc = doc(db, "E", eID);
  return updateDoc(refDoc, event);
};
export const addUserToEventFirestore = function (uID, eID) {
  const refDoc = doc(db, "E", eID);
  return updateDoc(refDoc, {
    usersCount: increment(1),
    users: arrayUnion(uID),
  });
};
export const removeUserToEventFirestore = function (uID, eID) {
  const refDoc = doc(db, "E", eID);
  return updateDoc(refDoc, {
    usersCount: increment(-1),
    users: arrayRemove(uID),
  });
};
export const updateUser = function (uID, user) {
  const refDoc = doc(db, "U", uID);
  return updateDoc(refDoc, user);
};
export const addEventToUserFirestore = function (uID, eID) {
  const refDoc = doc(db, "U", uID);
  return updateDoc(refDoc, {
    joinEventCount: increment(1),
    joinEvent: arrayUnion(eID),
  });
};
export const removeEventToUserFirestore = function (uID, eID) {
  const refDoc = doc(db, "U", uID);
  return updateDoc(refDoc, {
    joinEventCount: increment(-1),
    joinEvent: arrayRemove(eID),
  });
};
export const getDocument = function (collection, document) {
  const refDoc = doc(db, collection, document);
  return getDoc(refDoc);
};
