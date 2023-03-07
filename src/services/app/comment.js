import { Timestamp } from "firebase/firestore";
import {
  addDocument,
  deleteDocument,
  getCollectionOWU,
  increaseDocument,
  watchCollectionOWU,
} from "../firebase/firestore";
import comment from "@/services/app/comment.json";
import { f } from "../debug";

export const addComment = function (uID, oID, eID, photoURL, comment) {
  const c = { uID: uID, eID: eID, photoURL: photoURL, comment: comment };
  return f(addDocument, ["Comment", c])
    .then(() => f(increaseDocument, ["User", uID, "addComment", 1]))
    .then(() => f(increaseDocument, ["User", oID, "getComment", 1]))
    .then(() => f(increaseDocument, ["Event", eID, "getComment", 1]));
};
export const deleteComment = function (uID, oID, eID, cID) {
  return f(deleteDocument, ["Comment", cID])
    .then(() => increaseDocument("User", uID, "addComment", -1))
    .then(() => increaseDocument("User", oID, "getComment", -1))
    .then(() => increaseDocument("Event", eID, "getComment", -1));
};

export const getComments = function (eID, last) {
  comment.getComments[1].equality = eID;
  const args = ["Comment", last ? last : Timestamp.now(), comment.getComments];
  return f(getCollectionOWU, args);
};

export const watchComments = function (eID, addFunc, removeFunc) {
  comment.watchComments[1].equality = eID;
  const args = ["Comment", Timestamp.now(), comment.watchComments];
  return watchCollectionOWU(...args, addFunc, removeFunc);
};
