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
  increment,
} from "firebase/firestore";
import app from "./app";

const db = getFirestore(app);

export const timestamp = () => Timestamp.now();

export const timestampDate = (date = new Date()) => Timestamp.fromDate(date);

export const timestampMillis = (timestamp = new Date()) =>
  Timestamp.fromMillis(timestamp);

const returnId = (rawDoc) => ({ dID: rawDoc.id });
const returnDoc = (rawDoc) => ({ dID: rawDoc.id, data: rawDoc.data() });
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
export const increaseDocument = function (table, column, key, count) {
  let data = {};
  data["utimestamp"] = serverTimestamp();
  data[key] = increment(count);
  const docRef = doc(db, table, column);
  return updateDoc(docRef, data);
};
export const increaseDocumentMultiple = function (table, column, keys, counts) {
  let data = {};
  data["utimestamp"] = serverTimestamp();
  keys.forEach((key, index) => (data[key] = increment(counts[index])));
  const docRef = doc(db, table, column);
  return updateDoc(docRef, data);
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
  const data = { isDeleted: false, dtimestamp: serverTimestamp() };
  const docRef = doc(db, table, column);
  return updateDoc(docRef, data);
};
