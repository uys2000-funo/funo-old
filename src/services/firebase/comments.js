import { f } from "../c";
import { getCommentFirestore, addCommentFirestore } from "./core/sFirestore";

export const addComment = function (eID, comment) {
  return f(addCommentFirestore, eID, comment);
};

export const getComment = function (eID) {
  return f(getCommentFirestore, eID);
};
