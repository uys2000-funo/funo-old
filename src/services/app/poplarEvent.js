import { f, l } from "../debug";
import { setDocument, updateDocument } from "../firebase/firestore";

export const addPopularEvent = function (eID, eventData) {
  l("Run - addPopularEvent", arguments);
  const e = {
    eID: eID,
    count: { user: eventData.count.joinEvent },
    name: eventData.general.name,
    photoURL: eventData.general.photoURLs[0],
  };
  return f(setDocument, ["EventPopular", eID, e]);
};
export const updatePopularEvent = function (eID, eventData) {
  l("Run - updatePopularEvent", arguments);
  const e = {
    count: { user: eventData.count.joinEvent },
    name: eventData.general.name,
    photoURL: eventData.general.photoURLs[0],
  };
  return f(updateDocument, ["EventPopular", eID, e]);
};
export const removePopularEvent = function (eID, count) {
  l("Run - removePopularEvent", arguments);
  const e = { isDeleted: true };
  if (count != undefined) e["count"] = count;
  return f(updateDocument, ["EventPopular", eID, e]);
};
