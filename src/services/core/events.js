import {
  addEventToUserFirebase,
  addUserToEventFirebase,
  getEventFirebase,
  getEventsFollowedFirebase,
  getEventsWtihTagFirebase,
  getPopEventsFirebase,
  removeEventFromUserFirebase,
  removeUserFromEventFirebase,
  remPopEventFirebase,
  setPopEventFirebase,
} from "../firebase/event";
import { getEventsFirebase } from "@/services/firebase/event";
import settings from "../settings.json";

export const checkOwner = function (eventId = "", events = []) {
  return events.some((val) => val == eventId);
};
const addEventID = function (rawEvent) {
  return { eID: rawEvent.id, ...rawEvent.data() };
};
export const getEvents = function (startPoint = 0) {
  return getEventsFirebase(startPoint, settings.eventFlowRequestLimit).then(
    (rawEvents) => rawEvents.docs.map((rawEvent) => addEventID(rawEvent))
  );
};
export const getEventsWtihTag = function (tag, statPoint, length) {
  return getEventsWtihTagFirebase(tag, statPoint, length).then((rawEvents) =>
    rawEvents.docs.map((rawEvent) => addEventID(rawEvent))
  );
};
export const getEvent = function (eID) {
  return getEventFirebase(eID).then((rawEvent) => addEventID(rawEvent));
};
export const getPopEvents = function () {
  return getPopEventsFirebase().then((rawEvents) =>
    rawEvents.docs.map((rawEvent) => rawEvent.data())
  );
};
export const getEventsFollowed = function (fuIDs, statPoint, length) {
  return getEventsFollowedFirebase(fuIDs, statPoint, length).then((rawEvents) =>
    rawEvents.docs.map((rawEvent) => rawEvent.data())
  );
};
export const updatePopEventDB = function (eventNew, eventOld) {
  return setPopEventFirebase(eventNew.eID, eventNew.usersCount).then(() => {
    if (eventOld) remPopEventFirebase(eventOld.eID).then(() => true);
    else return true;
  });
};
export const joinEventDB = function (eID, uID) {
  return addUserToEventFirebase(eID, uID).then(() =>
    addEventToUserFirebase(eID, uID)
  );
};
export const exitEventDB = function (eID, uID) {
  return removeUserFromEventFirebase(eID, uID).then(() =>
    removeEventFromUserFirebase(eID, uID)
  );
};
