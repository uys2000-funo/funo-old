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
  deleteDoc,
  Timestamp,
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
const dateUpdate = function (data) {
  data["timestamp"] = serverTimestamp();
  const sDate = data.startDate.date.split("/");
  const sTime = data.startDate.time.split(":");
  const s = new Date(sDate[2], sDate[1], sDate[0], sTime[0], sTime[1]);
  const eDate = data.endDate.date.split("/");
  const eTime = data.endDate.time.split(":");
  const e = new Date(eDate[2], eDate[1], eDate[0], eTime[0], eTime[1]);
  data.startDate["timestamp"] = Timestamp.fromDate(s);
  data.endDate["timestamp"] = Timestamp.fromDate(e);
  return data;
};
export const createEventFirestore = function (data) {
  data = dateUpdate(data);
  const refCol = collection(db, "E");
  return addDoc(refCol, data);
};
export const createEventFirestoreUser = function (uID, eID) {
  const refCol = doc(db, "U", uID);
  return updateDoc(refCol, { events: arrayUnion(eID) });
};
export const deleteEventFirestoreUser = function (uID, eID) {
  const refCol = doc(db, "U", uID);
  return updateDoc(refCol, { events: arrayRemove(eID) });
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

export const deleteEventFirestore = function (eID) {
  const refDoc = doc(db, "E", eID);
  return deleteDoc(refDoc);
};

export const addCommentFirestore = function (eID, comment) {
  const refDoc = doc(db, "C", eID);
  return updateDoc(refDoc, { comments: arrayUnion(comment) }).catch((err) => {
    console.log(err);
    return setDoc(refDoc, { comments: [comment] });
  });
};
export const remCommentFirestore = function (eID, comment) {
  const refDoc = doc(db, "C", eID);
  return updateDoc(refDoc, { comments: arrayRemove(comment) });
};
export const getCommentFirestore = function (eID) {
  const refDoc = doc(db, "C", eID);
  return getDoc(refDoc);
};
