import { Timestamp } from "firebase/firestore";
import { f, l } from "../debug";
import {
  addDocument,
  getCollectionOWU,
  increaseDocument,
  updateDocument,
  watchCollectionOWU,
} from "../firebase/firestore";
import notification from "@/services/app/notification.json";
export const createNotification = function (uID, notification) {
  l("Run - createNotification", arguments);
  const n = {
    uID: uID,
    notification: notification,
    nTimestamp: Timestamp.now(),
  };
  return f(addDocument, ["UserNotification", n]).then(() =>
    f(increaseDocument, ["User", uID, "createNotification", 1])
  );
};

export const sendNotification = function (uID, sID, notification, nTimestamp) {
  l("Run - sendNotification", arguments);
  const n = {
    uID: uID,
    notification: notification,
    nTimestamp: nTimestamp ? nTimestamp : Timestamp.now(),
  };
  return f(addDocument, ["UserNotification", n])
    .then(() => f(increaseDocument, ["User", uID, "receiveNotification", 1]))
    .then(() => f(increaseDocument, ["User", sID, "sendNotification", 1]));
};

export const deleteNotification = function (uID, nID) {
  l("Run - deleteNotification", arguments);
  return f(deleteNotification, ["UserNotification", nID]).then(() =>
    f(increaseDocument, ["User", uID, "deleteNotification", -1])
  );
};
export const updateNotification = function (uID, nID, data) {
  l("Run - updateNotification", arguments);
  return f(updateDocument, ["UserNotification", nID, data]).then(() =>
    f(increaseDocument, ["User", uID, "updateNotification", 1])
  );
};
export const getNotifications = function (uID, last) {
  l("Run - getNotifications", arguments);
  notification.getNotifications[1].equality = uID;
  return f(getCollectionOWU, [
    "UserNotification",
    last ? last : Timestamp.now(),
    notification.getNotifications,
  ]);
};

export const watchNotifications = function (uID, addFunc, removeFunc) {
  l("Run - watchNotifications", arguments);
  notification.watchNotifications[1].equality = uID;
  return watchCollectionOWU(
    "UserNotification",
    Timestamp.now(),
    notification.watchNotifications,
    addFunc,
    removeFunc
  );
};
