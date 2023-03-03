import {
  addDocument,
  getCollectionWithTO,
  updateDocument,
  watchCollectionWithTO,
} from "../firebase/firestore";
import { f, c } from "@/services/debug.js";
import { getFile } from "../firebase/storage";

export const shortNotifications = function (notifications) {
  return notifications.sort(
    (a, b) => b.timestamp.seconds - a.timestamp.seconds
  );
};
export const sendNotification = function (uID, type, innerType, data) {
  c("sendNotification", arguments);
  return f(addDocument, `NH-${uID}`, {
    type: type,
    innerType: innerType,
    data: data,
    isActive: true,
  }).then((rawDoc) => rawDoc.id);
};
export const getNotifications = function (uID) {
  c("getNotifications", arguments);
  return f(getCollectionWithTO, `NH-${uID}`, "asc").then((rowMsgs) =>
    rowMsgs.docs.map((doc) => ({ nID: doc.id, ...doc.data() }))
  );
};
export const watchNotifications = function (
  uID,
  addFunc,
  removeFunc,
  updateFunc
) {
  c("watchNotifications", arguments);
  return watchCollectionWithTO(
    `NH-${uID}`,
    "desc",
    "<",
    addFunc,
    removeFunc,
    updateFunc
  );
};
export const getNotificationImage = function (eID, oID) {
  return getFile(`E/${eID}/imgs/img0`).catch(() =>
    getFile(`U/${oID}/imgs/uImg`)
  );
};
export const disableNotification = function (uID, notification) {
  const nID = notification.nID;
  let n = notification;
  n.isActive = false;
  delete n.nID;
  return f(updateDocument, `NH-${uID}`, nID, n);
};
