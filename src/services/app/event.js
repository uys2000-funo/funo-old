import {
  addDocument,
  deleteDocument,
  getCollectionOWU,
  getDocument,
  increaseDocument,
  removeDocument,
  setDocument,
  timestampMillis,
  unionDocument,
  updateDocument,
  watchCollectionOWU,
} from "../firebase/firestore";
import { f, l } from "@/services/debug.js";
import { uploadFiles } from "../firebase/storage";
import { getFiles } from "../firebase/storage";
import { Timestamp } from "firebase/firestore";

const getEventDoc = (doc) => ({ eID: doc.id, data: doc.data });

const getLocalEvent = function (event) {
  let localEvent = { ...event };
  localEvent.date.start = timestampMillis(event.date.start);
  localEvent.date.end = timestampMillis(event.date.end);
  delete localEvent.eID;
  return localEvent;
};
export const getEvent = function (eID) {
  l("Run - getEvent", arguments);
  return f(getDocument, ["Event", eID]).then(getEventDoc);
};

export const createEvent = function (uID, event, images) {
  l("Run - createEvent", arguments);
  const localEvent = getLocalEvent({ eID: "", ...event });
  return f(addDocument, ["Event", localEvent]).then(({ dID: eID }) => {
    const e = { eID: eID, uID: uID, isDeleted: false };
    return f(setDocument, ["UserCreatedEvent", eID, e])
      .then(() => f(increaseDocument, ["User", uID, "createEvent", 1]))
      .then(() => f(uploadFiles, [`Event/${eID}`, "image", images]))
      .then(() => f(getFiles, [`Event/${eID}/image`, images.length]))
      .then(({ urls }) =>
        f(updateDocument, ["Event", eID, { "general.photoURLs": urls }])
      );
  });
};

export const updateEvent = function (uID, event, images) {
  l("Run - updateEvent", arguments);
  let localEvent = getLocalEvent(event);
  return f(uploadFiles, [`Event/${event.eID}`, "image", images])
    .then(() => f(getFiles, [`Event/${event.eID}/image`, images.length]))
    .then(({ urls }) => {
      localEvent.general.photoURLs = urls;
      return localEvent;
    })
    .then(() => f(updateDocument, ["Event", event.eID, localEvent]))
    .then(() => f(increaseDocument, ["User", uID, "updateEvent", 1]))
    .then(() => f(increaseDocument, ["Event", event.eID, "updateEvent", 1]));
};

export const deleteEvent = function (uID, eID) {
  l("Run - deleteEvent", arguments);
  return f(deleteDocument, ["Event", eID])
    .then(() => f(deleteDocument, ["UserCreatedEvent", eID]))
    .then(() => f(increaseDocument, ["User", uID, "deleteEvent", 1]));
};

export const reportEvent = function (uID, oID, eID, report) {
  l("Run - reportEvent", arguments);
  const r = { uID: uID, oID: oID, eID: eID, report: report, isChecked: false };
  return f(addDocument, ["ReportEvent", r])
    .then(() => f(increaseDocument, ["User", uID, "reportEvent", 1]))
    .then(() => f(increaseDocument, ["Event", eID, "reportEvent", 1]));
};

export const joinEvent = function (
  uID,
  eID,
  dateEnd,
  photoURL,
  userPhotoURLs = []
) {
  l("Run - joinEvent", arguments);
  const addImage = userPhotoURLs.length <= 10 && photoURL;
  const event = {
    uID,
    eID,
    dateEnd: dateEnd,
    isJoining: true,
    isJoined: false,
  };
  return f(addDocument, ["UserJoinedEvent", event])
    .then(() => ["Event", eID, "general.userPhotoURLs", photoURL]) //these are arguments of bottom function
    .then((args) => (addImage ? f(unionDocument, args) : ""))
    .then(() => f(increaseDocument, ["User", uID, "joinEvent", 1]))
    .then(() => f(increaseDocument, ["Event", eID, "joinEvent", 1]));
};

export const exitEvent = function (
  uID,
  eID,
  dID,
  photoURL,
  userPhotoURLs = []
) {
  l("Run - exitEvent", arguments);
  const removeImage = userPhotoURLs.includes(photoURL);
  return f(updateDocument, ["UserJoinedEvent", dID, { isJoining: false }])
    .then(() => ["Event", eID, "general.userPhotoURLs", photoURL])
    .then((args) => (removeImage ? f(removeDocument, args) : ""))
    .then(() => f(increaseDocument, ["User", uID, "joinEvent", -1]))
    .then(() => f(increaseDocument, ["Event", eID, "joinEvent", -1]));
};

export const getEvents = function (
  last,
  queryArgs = [
    {
      column: "",
      condition: "",
      equality: "",
      orderType: "desc",
      order: true,
      where: true,
      serverTimestamp: false,
    },
  ],
  table = "Event"
) {
  return f(getCollectionOWU, [table, last ? last : Timestamp.now(), queryArgs]);
};

export const watchEvents = function (
  start,
  queryArgs = [
    {
      column: "",
      condition: "",
      equality: "",
      orderType: "desc",
      order: true,
      where: true,
      serverTimestamp: false,
    },
  ],
  addFunc,
  remoreFunc,
  table = "Event"
) {
  l("Run - watchEvents", arguments);
  return watchCollectionOWU(table, start, queryArgs, addFunc, remoreFunc);
};
