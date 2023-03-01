import {
  addDocument,
  getCollectionWithCOLS,
  getDocument,
  setDocument,
  timestamp,
  timestampFromMillis,
  updateDocument,
  watchCollectionWithTO,
} from "../firebase/core/firestore";
import { c, f } from "../c";
import { getFile, uploadFiles } from "../firebase/core/storage";
import { increment } from "firebase/firestore";
import { share } from "@/services/capacitor/share";
export const getEvents = function (startDocument, length) {
  c("getEvents", arguments);
  return f(
    getCollectionWithCOLS,
    "-Events",
    "date.end",
    "asc",
    ">",
    timestamp(),
    startDocument,
    length
  ).then((docs) =>
    docs.map((document) => ({
      ...document.data,
      eID: document.id,
    }))
  );
};
export const createEvent = function (uID, event, eImgs) {
  c("createEvent", arguments);
  let Event = event;
  Event.date.start = timestampFromMillis(event.date.start);
  Event.date.end = timestampFromMillis(event.date.end);
  const e = { isDeleted: false };
  return f(addDocument, "-Events", Event)
    .then(({ id: eID }) => f(setDocument, `CE-${uID}`, eID, e).then(() => eID))
    .then((eID) => f(uploadFiles, `-Events/${eID}`, "-eImg", eImgs));
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
export const getEventImage = function (eID) {
  c("getEventImage", arguments);
  return f(getFile, `-Events/${eID}/0-eImg`);
};
export const reportEvent = function (eID, report) {
  return getDocument("-Reports", eID).then((doc) => {
    return f(addDocument, `ER-${eID}`, report).then(() => {
      if (!doc.data?.reportCounter)
        return f(setDocument, "-Reports", eID, { reportCounter: 1});
      return f(updateDocument, "-Reports", eID, {
        reportCounter: increment(1),
      });
    });
  });
};
export const shareEvent = function (eID) {
  return f(
    share,
    "Muhteşem Bir Etkiblik",
    "Yüce Bir etkinlik katılamyı düşünmelisin :)",
    `funo.funo/e-${eID}`
  );
};
