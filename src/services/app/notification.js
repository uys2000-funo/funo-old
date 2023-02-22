import {
  addDocument,
  getCollection,
  getCollectionWithTO,
  watchCollectionWithTO,
} from "../firebase/core/firestore";
import { f, c } from "../c";

export const shortNotifications = function (notifications) {
  return notifications.sort(
    (a, b) => b.timestamp.seconds - a.timestamp.seconds
  );
};
export const sendNotification = function (uID, type, data) {
  c("sendNotification", arguments);
  return f(addDocument,`NH-${uID}`, { type: type, data: data });
};
export const getNotifications = function (target) {
  c("getNotifications", arguments);
  return f(getCollectionWithTO, target, "asc").then((rowMsgs) =>
    rowMsgs.docs.map((doc) => doc.data())
  );
};
export const getNotification= function (target, runFunc) {
  c("getNotification", arguments);
  return watchCollectionWithTO(target, runFunc);
};
export const getNotificationIDs = function (uID) {
  c("getNotificationIDs", arguments);
  return f(getCollection, `MU-${uID}`).then((rawCollection) =>
    rawCollection.docs.map((rawDocument) => rawDocument.data().user)
  );
};
