import {
  addDocument,
  deleteDocument,
  getCollectionCWCW,
  getDocument,
  increaseDocument,
  setDocument,
  timestampMillis,
  updateDocument,
} from "../firebase/firestore";
import { f, l } from "@/services/debug.js";
import { uploadFiles } from "../firebase/storage";

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
  return f(getDocument, ["Events", eID]).then(getEventDoc);
};

export const createEvent = function (uID, event, images) {
  l("Run - createEvent", arguments);
  const localEvent = getLocalEvent({ eID: "", ...event });
  return f(addDocument, ["Event", localEvent]).then(({ dID: eID }) => {
    const e = { eID: eID, uID: uID, isDeleted: false };
    return f(setDocument, ["UserCreatedEvent", eID, e])
      .then(() => f(increaseDocument, ["User", uID, "createEvent", 1]))
      .then(() => f(uploadFiles, [`Event/${eID}`, "image", images]));
  });
};

export const updateEvent = function (uID, event, images) {
  l("Run - updateEvent", arguments);
  const localEvent = getLocalEvent(event);
  return f(updateDocument, ["Event", event.eID, localEvent])
    .then(() => f(increaseDocument, ["User", uID, "updateEvent", 1]))
    .then(() => f(increaseDocument, ["Event", event.eID, "updateEvent", 1]))
    .then(() => f(uploadFiles, [`Event/${event.eID}`, "image", images]));
};
export const deleteEvent = function (uID, eID) {
  l("Run - deleteEvent", arguments);
  return f(deleteDocument, ["Event", eID])
    .then(() => f(deleteDocument, ["UserCreatedEvent", eID]))
    .then(() => f(increaseDocument, ["User", uID, "deleteEvent", 1]));
};

export const reportEvent = function (uID, eID, report) {
  l("Run - reportEvent", arguments);
  const r = { uID: uID, eID: eID, data: report, isChecked: false };
  return f(addDocument, ["ReportEvent", r])
    .then(() => f(increaseDocument, ["User", uID, "reportEvent", 1]))
    .then(() => f(increaseDocument, ["Event", eID, "reportEvent", 1]));
};

export const joinEvent = function (uID, eID) {
  l("Run - joinEvent", arguments);
  const event = { uID: uID, eID: eID, isJoined: true };
  const arg = ["UserJoinedEvent", "uID", "eID", "==", "==", uID, eID];
  return f(getCollectionCWCW, arg)
    .then(([{ dID }]) => {
      if (dID) return f(updateDocument, ["UserJoinedEvent", dID, event]);
      else return f(addDocument, ["UserJoinedEvent", event]);
    })
    .then(() => f(increaseDocument, ["User", uID, "joinEvent", 1]))
    .then(() => f(increaseDocument, ["Event", eID, "joinEvent", 1]));
};

export const exitEvent = function (uID, eID) {
  l("Run - exitEvent", arguments);
  const event = { isJoined: false };
  const arg = ["UserJoinedEvent", "uID", "eID", "==", "==", uID, eID];
  return f(getCollectionCWCW, arg)
    .then(([{ dID }]) => f(updateDocument, ["UserJoinedEvent", dID, event]))
    .then(() => f(increaseDocument, ["User", uID, "joinEvent", -1]))
    .then(() => f(increaseDocument, ["Event", eID, "joinEvent", -1]));
};
