import {
  getFirestore,
  getDoc,
  getDocs,
  doc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  setDoc,
  onSnapshot,
  Timestamp,
  startAfter,
  updateDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";
import app from "./app";
import { c } from "@/services/c";

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
export const watchCollection = function (table, runFunc = (doc) => doc) {
  const colRef = collection(db, table);
  return onSnapshot(colRef, (rawCollection) =>
    runFunc(rawCollection.docChanges())
  );
};
export const watchCollectionWithTO = function (
  table,
  order,
  condition,
  runFunc
) {
  c("watchCollectionWithTO", arguments);
  const queryRef = query(
    collection(db, table),
    orderBy("timestamp", order),
    where("timestamp", condition, Timestamp.now()),
    limit(1000)
  );
  return onSnapshot(queryRef, (changes) => {
    changes.forEach((change) => {
      runFunc({ dID: change.id, ...change.data() });
    });
  });
};
export const watchCollectionWithTOW = function (
  table,
  column,
  value,
  runFunc = (doc) => doc
) {
  const queryRef = query(
    collection(db, table),
    orderBy("timestamp", "asc"),
    where("timestamp", "<", Timestamp.now()),
    where(column, "==", value),
    limit(1000)
  );
  return onSnapshot(queryRef, (rawCollection) =>
    runFunc(rawCollection.docChanges())
  );
};
export const getCollectionWithW = function (
  table,
  column,
  columnCondition = "==",
  columnEquality = "",
  l = 5000
) {
  const queryRef = query(
    collection(db, table),
    where(column, columnCondition, columnEquality),
    limit(l)
  );
  return getDocs(queryRef).then(returnDocs);
};
export const getCollectionWithTO = function (
  table,
  cType = "desc",
  cCon = "<",
  tEqu = Timestamp.fromDate(new Date()),
  l = 5000
) {
  const queryRef = query(
    collection(db, table),
    orderBy("timestamp", cType),
    where("timestamp", cCon, tEqu),
    limit(l)
  );
  return getDocs(queryRef).then(returnDocs);
};
export const getCollectionWithCO = function (
  table,
  column,
  cType = "desc",
  cCon = "==",
  cEqu = true
) {
  const queryRef = query(
    collection(db, table),
    orderBy(column, cType),
    where(column, cCon, cEqu)
  );
  return getDocs(queryRef).then(returnDocs);
};
export const getCollectionWithTOCO = function (
  table,
  column,
  cOrder,
  cType,
  cEqu,
  tType,
  tCon,
  tEqu = Timestamp.fromDate(new Date())
) {
  const queryRef = query(
    collection(db, table),
    orderBy("timestamp", tType),
    where("timestamp", tCon, tEqu),
    orderBy(column, cOrder),
    where(column, cType, cEqu)
  );
  return getDocs(queryRef).then(returnDocs);
};
export const getCollectionWithCOLS = function (
  table,
  orderColumn,
  orderType = "desc",
  columnCondition = "==",
  columnEquality = true,
  startDocument = null,
  length = 50
) {
  const colRef = collection(db, table);
  startDocument;
  const queryRef = query(
    colRef,
    orderBy(orderColumn, orderType),
    where(orderColumn, columnCondition, columnEquality),
    startAfter(startDocument),
    limit(length)
  );
  return getDocs(queryRef).then(returnDocs);
};
