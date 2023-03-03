import {
  addDocument,
  deleteDocument,
  getCollectionWithCOLS,
  getCollectionWithCOLSW,
  getCollectionWithTO,
  getDocument,
  setDocument,
  timestamp,
  timestampFromMillis,
  updateCounters,
  updateDocument,
  watchCollectionWithTO,
} from "../firebase/core/firestore";
import { c, f } from "../c";
import { getFile, getFiles, uploadFiles } from "../firebase/core/storage";
import { share } from "@/services/capacitor/share";

export const getEvent = function (eID) {
  c("getEvent", arguments);
  return f(getDocument, "-Events", eID).then((document) => ({
    ...document.data,
    eID: document.id,
  }));
};

export const getEventsForFlow = function (startDocument, length) {
  c("getEventsForFlow", arguments);
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

export const getEventsForUserCreated = function (uID, startDocument, length) {
  c("getEventsForUserCreated", arguments);
  return f(
    getCollectionWithCOLSW,
    "-Events",
    "timestamp",
    "general.oID",
    "asc",
    "<",
    timestamp(),
    uID,
    startDocument,
    length
  ).then((docs) =>
    docs.map((document) => ({
      ...document.data,
      eID: document.id,
    }))
  );
};

export const getEventsJoinedIDs = function (uID) {
  return getCollectionWithTO(`UCE-${uID}`);
};

export const getEventImage = function (eID) {
  c("getEventImage", arguments);
  return f(getFile, `-Events/${eID}/0-eImg`);
};

export const getEventImages = function (eID, amount) {
  c("getEventImages", arguments);
  return f(getFiles, `-Events/${eID}`, "-eImg", amount);
};

export const createEvent = function (uID, event, eImgs) {
  c("createEvent", arguments);
  let Event = event;
  Event.date.start = timestampFromMillis(event.date.start);
  Event.date.end = timestampFromMillis(event.date.end);
  const e = { isDeleted: false };
  return f(addDocument, "-Events", Event).then(({ id: eID }) =>
    f(setDocument, `UCE-${uID}`, eID, e).then((eID) =>
      f(uploadFiles, `-Events/${eID}`, "-eImg", eImgs).then(() =>
        f(updateCounters, "-Users", uID, {}, ["createdEvent"], [1])
      )
    )
  );
};

export const updateEvent = function (uID, event, eImgs) {
  c("updateEvent", arguments);
  let Event = event;
  const eID = event.eID;
  Event.date.start = timestampFromMillis(event.date.start);
  Event.date.end = timestampFromMillis(event.date.end);
  delete Event.eID;
  const e = { isDeleted: false };
  return f(updateDocument, "-Events", eID, Event)
    .then(() => f(updateDocument, `UCE-${uID}`, eID, e))
    .then(() => f(uploadFiles, `-Events/${eID}`, "-eImg", eImgs));
};

export const watchPopularEvents = function (addFunc, removeFunc, updateFunc) {
  c("watchPopularEvents", arguments);
  return watchCollectionWithTO(
    `-PopularEvents`,
    "desc",
    "<",
    addFunc,
    removeFunc,
    updateFunc
  );
};

export const watchJoinedEvents = function (
  uID,
  addFunc,
  removeFunc,
  updateFunc
) {
  c("watchJoinedEvents", arguments);
  return watchCollectionWithTO(
    `UJE-${uID}`,
    "desc",
    "<",
    addFunc,
    removeFunc,
    updateFunc
  );
};

export const reportEvent = function (eID, report) {
  c("reportEvent", arguments);
  return getDocument("-Reports", eID).then((doc) => {
    return f(addDocument, `ER-${eID}`, report).then(() => {
      if (!doc.data?.reportCounter)
        return f(setDocument, "-Reports", eID, { reportCounter: 1 });
      return f(updateCounters, "-Reports", eID, {}, ["reportCounter"], [1]);
    });
  });
};

export const shareEvent = function (eID) {
  c("shareEvent", arguments);
  return f(
    share,
    "Muhteşem Bir Etkiblik",
    "Yüce Bir etkinlik katılamyı düşünmelisin :)",
    `funo.funo/e-${eID}`
  );
};

export const deleteEvent = function (eID, uID) {
  c("deleteEvent", arguments);
  return f(getDocument, `-Events`, eID).then((doc) => {
    return f(deleteDocument, `-Events`, eID).then(() => {
      return f(updateDocument, `UCE-${uID}`, eID, {
        ...doc.data,
        isDeleted: true,
      });
    });
  });
};

export const joinEvent = function (eID, uID) {
  c("joinEvent", arguments);
  const user = { uID: uID, isActive: true };
  const event = { eID: eID, isActive: true };
  return getDocument(`UJE-${uID}`, eID, event).then((document) => {
    let doDocument = setDocument;
    if (document.data?.isActive == false) doDocument = updateDocument;
    else if (document.data?.isActive == true) return true;
    return f(doDocument, `EU-${eID}`, uID, user)
      .then(() => f(doDocument, `UJE-${uID}`, eID, event))
      .then(() => f(updateCounters, "-Events", eID, {}, ["joinedUser"], [1]))
      .then(() => f(updateCounters, "-Users", uID, {}, ["joinedEvent"], [1]));
  });
};
export const exitEvent = function (eID, uID) {
  c("joinEvent", arguments);
  const user = { isActive: false };
  const event = { isActive: false };
  return getDocument(`UJE-${uID}`, eID, event).then((document) => {
    if (!document.data) return false;
    return f(updateDocument, `EU-${eID}`, uID, user)
      .then(() => f(updateDocument, `UJE-${uID}`, eID, event))
      .then(() => f(updateCounters, "-Events", eID, {}, ["joinedUser"], [-1]))
      .then(() => f(updateCounters, "-Users", uID, {}, ["joinedEvent"], [-1]));
  });
};
