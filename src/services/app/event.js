import {
  addDocument,
  getCollectionWithCOLS,
  timestamp,
  updateDocument,
  watchCollectionWithTO,
} from "../firebase/core/firestore";
import { c } from "../c";
import { arrayUnion, increment } from "firebase/firestore";
import { uploadFiles } from "../firebase/core/storage";

export const createEvent = function (uID, event, eImgs) {
  return addDocument("-Events", event).then((rawDoc) =>
    updateDocument("-Users", uID, {
      cEventsCount: increment(1),
      cEvents: arrayUnion(rawDoc.id),
    }).then(() => uploadFiles(`Events/${rawDoc.id}`, "-eImg", eImgs))
  );
};
export const getEvents = function (city, startDocument = null, length = 50) {
  return getCollectionWithCOLS(
    "-Events",
    "date.end.timestamp",
    "desc",
    "<",
    timestamp,
    startDocument,
    length
  ).then((docs) =>
    docs.map((doc) => ({
      eID: doc.id,
      ...doc.data(),
    }))
  );
};

export const watchPopularEvents = function (addFunc, removeFunc, updateFunc) {
  c("watchPopularEvents", arguments);
  return watchCollectionWithTO(`-PopularEvents`, (changes) => {
    changes.forEach((change) => {
      const doc = { nID: change.doc.id, ...change.doc.data() };
      if (change.type == "added") addFunc(doc);
      else if (change.type == "removed") removeFunc(doc);
      else if (change.type == "modified") updateFunc(change.oldIndex, doc);
    });
  });
};
