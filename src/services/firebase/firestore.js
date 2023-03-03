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
  query,
  orderBy,
  where,
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
  data["isDeleted"] = false;
  const docRef = doc(db, table, column);
  return setDoc(docRef, data);
};
export const addDocument = function (table, data) {
  data["timestamp"] = serverTimestamp();
  data["utimestamp"] = serverTimestamp();
  data["isDeleted"] = false;
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
  data["itimestamp"] = serverTimestamp();
  data[`count.${key}`] = increment(count);
  if (count > 0) data[`countTotal.${key}`] = increment(count);
  return updateDocument(table, column, data);
};
export const increaseDocumentMultiple = function (table, column, keys, counts) {
  let data = {};
  data["itimestamp"] = serverTimestamp();
  keys.forEach((key, index) => {
    data[`count.${key}`] = increment(counts[index]);
    if (counts[index] > 0) data[`countTotal.${key}`] = increment(counts[index]);
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
  const data = { isDeleted: false, dtimestamp: serverTimestamp() };
  const docRef = doc(db, table, column);
  return updateDoc(docRef, data);
};

const order = "desc";

export const getCollectionCW = function (
  table,
  col1 = "timestamp",
  con1 = "<",
  equ1 = timestamp()
) {
  const colRef = collection(db, table);
  const q = query(
    colRef,
    orderBy(col1, order),
    where(col1, con1, equ1),
    orderBy("isDeleted", order),
    where("isDeleted", "==", false)
  );
  return getDocs(q);
};
export const getCollectionCWCW = function (
  table,
  col1 = "timestamp",
  col2 = "uID",
  con1 = "<",
  con2 = "==",
  equ1 = timestamp(),
  equ2 = "uID"
) {
  const colRef = collection(db, table);
  const q = query(
    colRef,
    orderBy(col1, order),
    where(col1, con1, equ1),
    orderBy(col2, order),
    where(col2, con2, equ2),
    orderBy("isDeleted", order),
    where("isDeleted", "==", false)
  );
  return getDocs(q);
};

export const getCollectionCWCWCW = function (
  table,
  col1 = "timestamp",
  col2 = "uID",
  col3 = "eID",
  con1 = "<",
  con2 = "==",
  con3 = "==",
  equ1 = timestamp(),
  equ2 = "uID",
  equ3 = "eID"
) {
  const colRef = collection(db, table);
  const q = query(
    colRef,
    orderBy(col1, order),
    where(col1, con1, equ1),
    orderBy(col2, order),
    where(col2, con2, equ2),
    orderBy(col2, order),
    where(col3, con3, equ3),
    orderBy("isDeleted", order),
    where("isDeleted", "==", false)
  );
  return getDocs(q);
};
