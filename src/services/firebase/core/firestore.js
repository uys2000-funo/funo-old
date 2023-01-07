import {
  getFirestore,
  getDoc,
  getDocs,
  doc,
  collection,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import app from "./app";

const db = getFirestore(app);

export const setDocument = function (table, c, data) {
  data["timestamp"] = serverTimestamp();
  const docRef = doc(db, table, c);
  return setDoc(docRef, data);
};
export const addDocument = function (table, data) {
  data["timestamp"] = serverTimestamp();
  const colRef = collection(db, table);
  return setDoc(colRef, data);
};
export const updateDocument = function (table, c, data) {
  data["utimestamp"] = serverTimestamp();
  const docRef = doc(db, table, c);
  return setDoc(docRef, data);
};

export const getDocument = function (tabe, c) {
  const docRef = doc(db, tabe, c);
  return getDoc(docRef);
};
export const getCollection = function (table) {
  const colRef = collection(db, table);
  return getDocs(colRef);
};
export const getCollectionWithTO = function (
  table,
  cType = "desc",
  cCon = "<",
  tEqu = serverTimestamp(),
  l = 5000
) {
  const queryRef = query(
    collection(db, table),
    orderBy("timestamp", cType),
    where("timestamp", cCon, tEqu),
    limit(l)
  );
  return getDocs(queryRef);
};
export const getCollectionWithCO = function (
  table,
  c,
  cType = "desc",
  cCon = "==",
  cEqu = true
) {
  const queryRef = query(
    collection(db, table),
    orderBy(c, cType),
    where(c, cCon, cEqu)
  );
  return getDocs(queryRef);
};
export const getCollectionWithTOCO = function (
  table,
  c,
  cOrder,
  cType,
  cEqu,
  tType,
  tCon,
  tEqu = serverTimestamp()
) {
  const queryRef = query(
    collection(db, table),
    orderBy("timestamp", tType),
    where("timestamp", tCon, tEqu),
    orderBy(c, cOrder),
    where(c, cType, cEqu)
  );
  return getDocs(queryRef);
};
