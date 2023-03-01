import {
  addDocument,
  setDocument,
  watchCollectionWithTO,
} from "../firebase/core/firestore";
import { c, f } from "../c";
import { uploadFiles } from "../firebase/core/storage";

export const createEvent = function (uID, event, eImgs) {
  const e = { isDeleted: false };
  return f(addDocument, "-Events", event)
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
