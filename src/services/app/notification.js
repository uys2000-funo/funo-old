import { l } from "../debug";
import { addDocument, increaseDocument } from "../firebase/firestore";

export const sendNotification = function (uID, notification) {
  l("Run - sendNotification", arguments);
  const n = { uID: uID, notification: notification };
  return addDocument("UserNotification", n).then(() =>
    increaseDocument("User", uID, "receivedNotification", 1)
  );
};

export const deleteNotification = function (uID, notification) {
  l("Run - deleteNotification", arguments);
  const n = { uID: uID, notification: notification };
  return addDocument("UserNotification", n).then(() =>
    increaseDocument("User", uID, "receivedNotification", -1)
  );
};
