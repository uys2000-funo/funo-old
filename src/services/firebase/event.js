import {
  createEventFirestore,
  createEventFirestoreUser,
  getAllEvetntsFirestore,
  getEventFirestore,
  addUserToEventFirestore,
  addEventToUserFirestore,
  removeEventToUserFirestore,
  removeUserToEventFirestore,
} from "./core/sFirestore";
import { createEventImgsStorage, getImage } from "./core/sStorage";
import { f } from "../c";

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
