import {
  createEventFirestore,
  createEventFirestoreUser,
  getAllEvetntsFirestore,
  getEventFirestore,
  addUserToEventFirestore,
  addEventToUserFirestore,
  removeEventToUserFirestore,
  removeUserToEventFirestore,
  deleteEventFirestoreUser,
  deleteEventFirestore,
  updateEventFirestore,
  getEventsFirestore,
} from "./core/sFirestore";
import { createEventImgsStorage, getImage } from "./core/sStorage";
import { f } from "../c";

export const getEventsFirebase = function (startPoint, length) {
  return f(getEventsFirestore, startPoint, length);
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
export const getAllEvents = function () {
  return f(getAllEvetntsFirestore);
};

export const getImgStorage = function (iPath) {
  return f(getImage, iPath);
};

export const getEvent = function (eID) {
  return f(getEventFirestore, eID);
};
export const joinEvent = function (uID, eID) {
  return f(addEventToUserFirestore, uID, eID).then(() =>
    f(addUserToEventFirestore, uID, eID)
  );
};
export const exitEvent = function (uID, eID) {
  return f(removeEventToUserFirestore, uID, eID).then(() =>
    f(removeUserToEventFirestore, uID, eID)
  );
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
        f(exitEvent, uID, eID)
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
