import {
  addDocument,
  getCollection,
  getCollectionWithTO,
  watchCollectionWithTO,
} from "../firebase/core/firestore";
import { f, c } from "../c";
import { getFile } from "../firebase/core/storage";

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
  }).then((rawDoc) => rawDoc.id);
};
export const getNotifications = function (uID) {
  c("getNotifications", arguments);
  return f(getCollectionWithTO, `NH-${uID}`, "asc").then((rowMsgs) =>
    rowMsgs.docs.map((doc) => doc.data())
  );
};
export const watchNotifications = function (uID, runFunc) {
  c("watchNotifications", arguments);
  return watchCollectionWithTO(`NH-${uID}`, runFunc);
};
export const getNotificationIDs = function (uID) {
  c("getNotificationIDs", arguments);
  return f(getCollection, `NH-${uID}`).then((rawCollection) =>
    rawCollection.docs.map((rawDocument) => rawDocument.data().user)
  );
};
export const getNotificationImage = function (eID, oID) {
  return getFile(`E/${eID}/imgs/img0`)
    .catch(() => getFile(`U/${oID}/imgs/uImg`))
};
