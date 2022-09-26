import {
  createEventFirestore,
  createEventFirestoreUser,
  getEventFirestore,
  getPopEventsFirestore,
  addUserToEventFirestore,
  addEventToUserFirestore,
  removeEventFromUserFirestore,
  removeUserFromEventFirestore,
  deleteEventFirestoreUser,
  deleteEventFirestore,
  updateEventFirestore,
  getEventsFirestore,
  setPopEventFirestore,
  remPopEventFirestore,
} from "./core/sFirestore";
import { createEventImgsStorage, getImage } from "./core/sStorage";
import { f } from "../c";
import { exitEventDB } from "../core/events";

export const getEventsFirebase = function (startPoint, length) {
  return f(getEventsFirestore, startPoint, length);
};
export const getEventFirebase = function (eID) {
  return f(getEventFirestore, eID);
};
export const getPopEventsFirebase = function () {
  return f(getPopEventsFirestore);
};
export const setPopEventFirebase = function (eID, usersCount) {
  return f(setPopEventFirestore, eID, usersCount);
};
export const remPopEventFirebase = function (eID) {
  return f(remPopEventFirestore, eID);
};
export const addEventFunction = function (uID, data, eImgs, uName) {
  data["owners"] = [uID];
  data["ownersNames"] = [uName];
  data["imgCount"] = eImgs.length;
  return f(createEventFirestore, data).then((res) => {
    return f(createEventFirestoreUser, uID, res.id).then(() => {
      return f(createEventImgsStorage, res.id, eImgs);
    });
  });
};
export const updateEventFunction = function (data, eID) {
  return f(updateEventFirestore, data, eID);
};

export const getImgStorage = function (iPath) {
  return f(getImage, iPath);
};

export const getEvent = function (eID) {
  return f(getEventFirestore, eID);
};
export const addEventToUserFirebase = function (eID, uID) {
  return f(addEventToUserFirestore, eID, uID);
};
export const removeEventFromUserFirebase = function (eID, uID) {
  return f(removeEventFromUserFirestore, eID, uID);
};
export const addUserToEventFirebase = function (eID, uID) {
  return f(addUserToEventFirestore, eID, uID);
};
export const removeUserFromEventFirebase = function (eID, uID) {
  return f(removeUserFromEventFirestore, eID, uID);
};

const deleteEvent_ = function (eID, oID, resolve, reject) {
  f(deleteEventFirestoreUser, oID, eID)
    .then(() =>
      f(deleteEventFirestore, eID)
        .then(() => resolve(true))
        .catch((err) => reject([false, "deleteEvent", err]))
    )
    .catch((err) => reject([false, "deleteEventFirestoreUser", err]));
};
export const deleteEvent = function (eID, oID, uIDs) {
  console.log("deleteEvent", eID, oID, uIDs);
  const rP = new Promise((resolve, reject) => {
    let u = 0;
    if (uIDs)
      uIDs.forEach((uID) => {
        f(exitEventDB, uID, eID)
          .then(() => {
            u += 1;
            if (u == uIDs.length) deleteEvent_(eID, oID, resolve, reject);
          })
          .catch((err) => reject([false, "exitEvent", err]));
      });
    else deleteEvent_(eID, oID, resolve, reject);
  });
  return rP;
};
