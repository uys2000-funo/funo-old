import {
  addDocument,
  deleteDocument,
  getCollectionOWU,
  getDocument,
  increaseDocument,
  setDocument,
  timestampMillis,
  updateDocument,
  watchCollectionOWU,
} from "../firebase/firestore";
import { f, l, p } from "@/services/debug.js";
import { uploadFiles } from "../firebase/storage";
import { getFiles } from "../firebase/storage";

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

export const reportEvent = function (uID, eID, report) {
  l("Run - reportEvent", arguments);
  const r = { uID: uID, eID: eID, data: report, isChecked: false };
  return f(addDocument, ["ReportEvent", r])
    .then(() => f(increaseDocument, ["User", uID, "reportEvent", 1]))
    .then(() => f(increaseDocument, ["Event", eID, "reportEvent", 1]));
};

export const joinEvent = function (uID, eID) {
  uID, eID;
  l("Run - exitEvent", arguments);
  return f(p);
};

export const exitEvent = function (uID, eID) {
  uID, eID;
  l("Run - exitEvent", arguments);
  return f(p);
};

export const getEvents = function (
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
  ]
) {
  return f(getCollectionOWU, ["Event", start, queryArgs]);
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
  ]
) {
  return f(watchCollectionOWU, ["Event", start, queryArgs]);
};

export const watchEventsJoined = function (
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
  ]
) {
  return f(watchCollectionOWU, ["UserJoinedEvent", start, queryArgs]);
};
