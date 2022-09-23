import { f } from "../c";
import {
  getCommentFirestore,
  addCommentFirestore,
  remCommentFirestore,
} from "./core/sFirestore";

export const addComment = function (eID, comment) {
  return f(addCommentFirestore, eID, comment);
};

export const getComment = function (eID) {
  return f(getCommentFirestore, eID);
};

export const remComment = function (eID, comment) {
  return f(remCommentFirestore, eID, comment);
};
