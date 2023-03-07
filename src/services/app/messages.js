import { Timestamp } from "firebase/firestore";
import { f, l } from "../debug";
import {
  addDocument,
  deleteDocument,
  getCollectionOWU,
  getDocumentsSubCollection,
  increaseDocument,
  setDocumentSubCollection,
  updateDocumentSubCollection,
  watchCollectionOWU,
  watchDocumentsSubCollection,
} from "../firebase/firestore";
import messages from "@/services/app/messages.json";
export const sendMessage = function (uID, rID, message) {
  l("Run - sendMessage", arguments);
  const m = { uID, rID, message };
  return f(addDocument, ["UserMessage", m])
    .then((r) => f(increaseDocument, ["User", uID, "sendMessage", 1], r))
    .then((r) => f(increaseDocument, ["User", rID, "receivedMessage", 1], r));
};

export const deleteMessage = function (uID, rID, message) {
  l("Run - deleteMessage", arguments);
  const m = { uID, rID, message };
  return f(deleteDocument, ["UserMessage", m])
    .then((r) => f(increaseDocument, ["User", uID, "sendMessage", -1], r))
    .then((r) => f(increaseDocument, ["User", rID, "receivedMessage", -1], r));
};

export const getOldSendedChatMessages = function (uID, rID, last) {
  messages.oldChatMessages[1].equality = uID;
  messages.oldChatMessages[2].equality = rID;
  return f(getCollectionOWU, [
    "UserMessage",
    last ? last : Timestamp.now(),
    messages.oldChatMessages,
  ]);
};
export const getOldReceivedChatMessages = function (uID, rID, last) {
  messages.oldChatMessages[1].equality = rID;
  messages.oldChatMessages[2].equality = uID;
  return f(getCollectionOWU, [
    "UserMessage",
    last ? last : Timestamp.now(),
    messages.oldChatMessages,
  ]);
};
export const watchNewChatMessages = function (uID, rID, addFunc) {
  messages.newChatMessages[1].equality = rID;
  messages.newChatMessages[2].equality = uID;
  console.log(messages.newChatMessages);
  return watchCollectionOWU(
    "UserMessage",
    Timestamp.now(),
    messages.newChatMessages,
    addFunc
  );
};

export const setMessageHistory = function (
  uID,
  rID,
  message,
  uPhotoURL,
  rPhotoURL
) {
  const uHistory = { uID: rID, lastMessage: message, photoURL: rPhotoURL };
  const rHistory = { uID: uID, lastMessage: message, photoURL: uPhotoURL };
  const uArgs = ["UserMessageHistory", uID, "History", rID, uHistory];
  const rArgs = ["UserMessageHistory", rID, "History", uID, rHistory];
  return f(setDocumentSubCollection, uArgs).then(() =>
    f(setDocumentSubCollection, rArgs)
  );
};

export const updateMessageHistory = function (
  uID,
  rID,
  message,
  uPhotoURL,
  rPhotoURL
) {
  const uHistory = { uID: rID, lastMessage: message, photoURL: rPhotoURL };
  const rHistory = { uID: uID, lastMessage: message, photoURL: uPhotoURL };
  const uArgs = ["UserMessageHistory", uID, "History", rID, uHistory];
  const rArgs = ["UserMessageHistory", rID, "History", uID, rHistory];
  return f(updateDocumentSubCollection, uArgs).then(() =>
    f(updateDocumentSubCollection, rArgs)
  );
};

export const getMessageHistory = function (uID, last) {
  const uArgs = [
    "UserMessageHistory",
    uID,
    "History",
    last ? last : Timestamp.now(),
  ];
  return f(getDocumentsSubCollection, uArgs);
};

export const watchMessageHistory = function (uID, addFunc) {
  const uArgs = ["UserMessageHistory", uID, "History"];
  return watchDocumentsSubCollection(...uArgs, addFunc);
};
