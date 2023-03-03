import { l } from "../debug";
import {
  addDocument,
  deleteDocument,
  increaseDocument,
} from "../firebase/firestore";

export const sendMessage = function (uID, rID, message) {
  l("Run - sendMessage", arguments);
  const m = { uID, rID, message };
  return addDocument("UserMessage", m)
    .then(() => increaseDocument("User", uID, "sendMessage", 1))
    .then(() => increaseDocument("User", rID, "receivedMessage", 1));
};

export const deleteMessage = function (uID, rID, message) {
  l("Run - deleteMessage", arguments);
  const m = { uID, rID, message };
  return deleteDocument("UserMessage", m)
    .then(() => increaseDocument("User", uID, "sendMessage", -1))
    .then(() => increaseDocument("User", rID, "receivedMessage", -1));
};
