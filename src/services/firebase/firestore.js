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
  startAfter,
  onSnapshot,
} from "firebase/firestore";
import app from "./app";
import { l } from "../debug";

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

export const getCollectionOWU = function (
  table,
  start,
  qa = [
    {
      column: "",
      condition: "",
      equality: "",
      orderType: "desc",
      order: true,
      where: true,
      timestamp: false,
    },
  ]
) {
  const colRef = collection(db, table);
  let args = [colRef];
  qa.forEach((a) => {
    if (a.order)
      args.push(orderBy(a.column, a.orderType ? a.orderType : "desc"));
    if (a.where && !a.timestamp)
      args.push(where(a.column, a.condition, a.equality));
    else if (a.where) args.push(where(a.column, a.condition, Timestamp.now()));
  });
  args.push(where("isDeleted", "==", false));
  args.push(startAfter(start));
  const q = query(...args);
  l(`Arg: getCollectionOWU`, args);
  return getDocs(q).then(returnDocs);
};

export const watchCollectionOWU = function (
  table,
  start,
  qa = [
    {
      column: "",
      condition: "",
      equality: "",
      orderType: "desc",
      order: true,
      where: true,
      timestamp: false,
    },
  ],
  addFunc = () => ""
) {
  const colRef = collection(db, table);
  let args = [colRef];
  qa.forEach((a) => {
    if (a.order)
      args.push(orderBy(a.column, a.orderType ? a.orderType : "desc"));
    if (a.where && !a.timestamp)
      args.push(where(a.column, a.condition, a.equality));
    else if (a.where) args.push(where(a.column, a.condition, Timestamp.now()));
  });
  args.push(where("isDeleted", "==", false));
  args.push(startAfter(start));
  const q = query(...args);
  l(`Arg: getCollectionOWU`, args);
  return onSnapshot(q, (querySnapshot) => {
    console.log(querySnapshot);
    addFunc;
  });
};
