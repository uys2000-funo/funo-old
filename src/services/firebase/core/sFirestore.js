import { f } from "@/services/c";
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
  where,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import app from "./app";
const db = getFirestore(app);

export const getEventsFirestore = function (statPoint, length) {
  const refCol = collection(db, "E");
  const q = query(
    refCol,
    orderBy("endDate.timestamp"),
    where("endDate.timestamp", ">", Timestamp.fromDate(new Date())),
    startAfter(statPoint),
    limit(length)
  );
  return getDocs(q);
};
export const getEventsWtihTagFirestore = function (tag, statPoint, length) {
  const refCol = collection(db, "E");
  const q = query(
    refCol,
    where("tags." + tag, "==", true),
    where("startDate.timestamp", ">", Timestamp.fromDate(new Date())),
    orderBy("startDate.timestamp"),
    startAfter(statPoint),
    limit(length)
  );
  return getDocs(q);
};
export const getNewUsersNotHiddenFirestore = function (length) {
  const refCol = collection(db, "U");
  const q = query(
    refCol,
    where("hidden", "==", false),
    orderBy("timestamp"),
    limit(length)
  );
  return getDocs(q);
};
const fuIDSWhere = function (fuIDs = []) {
  return fuIDs.map((fuID) => where("owner", "==", fuID));
};
export const getEventsFollowedFirestore = function (fuIDs, statPoint, length) {
  const refCol = collection(db, "E");
  const q = query(
    refCol,
    orderBy("endDate.timestamp"),
    where("endDate.timestamp", ">", Timestamp.fromDate(new Date())),
    ...fuIDSWhere(fuIDs),
    startAfter(statPoint),
    limit(length)
  );
  return getDocs(q);
};
export const getPopEventsFirestore = function () {
  const refCol = collection(db, "PE");
  return getDocs(refCol);
};
export const setPopEventFirestore = function (eID, usersCount) {
  const refDoc = doc(db, "PE", eID);
  return setDoc(refDoc, { eID: eID, usersCount: usersCount });
};
export const remPopEventFirestore = function (eID) {
  const refDoc = doc(db, "PE", eID);
  return deleteDoc(refDoc);
};
const __sendMsgFirestore = function (mID, message) {
  const refDoc = doc(db, "MU", mID);
  return updateDoc(refDoc, { messages: arrayUnion(message) });
};
export const sendMsgFirestore = function (mID, message) {
  return f(__sendMsgFirestore, mID, message);
};
const __setMsgFirestore = function (mID, message) {
  const refDoc = doc(db, "MU", mID);
  return setDoc(refDoc, { messages: message });
};
export const setMsgFirestore = function (mID, message) {
  return f(__setMsgFirestore, mID, message);
};
const __updateUserMsgFirestore = function (uID, mID) {
  const refDoc = doc(db, "U", uID);
  return updateDoc(refDoc, { messages: arrayUnion(mID) });
};
export const updateUserMsgFirestore = function (uID, mID) {
  return f(__updateUserMsgFirestore, uID, mID);
};
const __setUserMsgFirestore = function (uID, mID) {
  const refDoc = doc(db, "U", uID);
  return setDoc(refDoc, { messages: [mID] });
};
export const setUserMsgFirestore = function (uID, mID) {
  return f(__setUserMsgFirestore, uID, mID);
};
const __getMsgsFirestore = function (mID) {
  const refDoc = doc(db, "mID", mID);
  return getDoc(refDoc);
};
export const getMsgsFirestore = function (mID) {
  return f(__getMsgsFirestore, mID);
};
export const createUserFirestore = function (uID, data) {
  data["events"] = [];
  data["joinEvent"] = [];
  data["timestamp"] = serverTimestamp();
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
export const updateEventFirestore = function (data, eID) {
  data = dateUpdate(data);
  const refDoc = doc(db, "E", eID);
  return updateDoc(refDoc, data);
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
export const updateUser = function (uID, user) {
  const refDoc = doc(db, "U", uID);
  return updateDoc(refDoc, user);
};

export const addUserToEventFirestore = function (eID, uID) {
  const refDoc = doc(db, "E", eID);
  return updateDoc(refDoc, {
    usersCount: increment(1),
    users: arrayUnion(uID),
  });
};
export const removeUserFromEventFirestore = function (eID, uID) {
  const refDoc = doc(db, "E", eID);
  return updateDoc(refDoc, {
    usersCount: increment(-1),
    users: arrayRemove(uID),
  });
};
export const addEventToUserFirestore = function (eID, uID) {
  const refDoc = doc(db, "U", uID);
  return updateDoc(refDoc, {
    joinEventCount: increment(1),
    joinEvent: arrayUnion(eID),
  });
};
export const removeEventFromUserFirestore = function (eID, uID) {
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
