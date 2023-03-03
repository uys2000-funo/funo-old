import {
  addDocument,
  getCollection,
  getCollectionWithTO,
  watchCollection,
} from "../firebase/firestore";
import { f, c } from "@/services/debug.js";

export const shortMessages= function(messages){
  return messages.sort((a,b)=> b.timestamp.seconds - a.timestamp.seconds)
}
export const getTarget = function (uID, sID) {
  c("getTarget", [uID, sID]);
  const list = [uID, sID].sort();
  list.unshift("MH-");
  return list.join("");
};
export const setupMessage = function (uID, sID) {
  c("setupMessage", [uID, sID]);
  const addToUser = (uID, sID) => {
    return f(addDocument, `MU-${uID}`, { user: sID }).then(() => true);
  };
  return addToUser(uID, sID).then(() => addToUser(sID, uID));
};
export const sendMessage = function (target, uID, msg) {
  c("sendMessage", [target, uID, msg]);
  return addDocument(target, { user: uID, msg: msg });
};
export const getMessages = function (target) {
  c("getMessages", [target]);
  return f(getCollectionWithTO, target, "asc").then((rowMsgs) =>
    rowMsgs.docs.map((doc) => doc.data())
  );
};
export const getMessage = function(target, runFunc){
  c("getMessage", [target, runFunc]);
  return watchCollection(target, runFunc)
}
export const getMessageIDs = function (uID) {
  c("getMessageIDs", [uID]);
  return f(getCollection, `MU-${uID}`).then((rawCollection) =>
    rawCollection.docs.map((rawDocument) => rawDocument.data().user)
  );
};

