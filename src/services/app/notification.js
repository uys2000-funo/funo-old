import { Timestamp } from "firebase/firestore";
import { f, l } from "../debug";
import { addDocument, increaseDocument } from "../firebase/firestore";

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
