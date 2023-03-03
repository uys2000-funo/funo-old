import {
  getFirestore,
  getDoc,
  getDocs,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";
import app from "./app";

const db = getFirestore(app);

export const timestamp = () => Timestamp.now();

export const timestampFromDate = (date = new Date()) =>
  Timestamp.fromDate(date);

export const timestampFromMillis = (timestamp = new Date()) =>
  Timestamp.fromMillis(timestamp);

const returnId = (rawDoc) => ({ id: rawDoc.id });
const returnDoc = (rawDoc) => ({ id: rawDoc.id, data: rawDoc.data() });
const returnDocs = (rawCollection) => rawCollection.docs.map(returnDoc);

export const setDocument = function (table, column, data) {
  data["timestamp"] = serverTimestamp();
  data["utimestamp"] = serverTimestamp();
  const docRef = doc(db, table, column);
  return setDoc(docRef, data);
};
export const addDocument = function (table, data) {
  data["timestamp"] = serverTimestamp();
  data["utimestamp"] = serverTimestamp();
  const colRef = collection(db, table);
  return addDoc(colRef, data).then(returnId);
};
export const updateDocument = function (table, column, data) {
  data["utimestamp"] = serverTimestamp();
  const docRef = doc(db, table, column);
  return updateDoc(docRef, data);
};
export const updateCounters = function (
  table,
  column,
  data,
  counters = [""],
  values = [0]
) {
  counters.forEach((element, index) => {
    data[`counters.${element}`] = increment(values[index]);
    if (values[index] > 0)
      data[`countersTotal.${element}`] = increment(values[index]);
  });
  return updateDocument(table, column, data);
};
export const getDocument = function (table, column) {
  const docRef = doc(db, table, column);
  return getDoc(docRef).then(returnDoc);
};
export const getCollection = function (table) {
  const colRef = collection(db, table);
  return getDocs(colRef).then(returnDocs);
};
export const deleteDocument = function (table, column) {
  const docRef = doc(db, table, column);
  return deleteDoc(docRef);
};
