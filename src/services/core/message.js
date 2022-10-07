import { f } from "../c";
import {
  getMsgsFirestore,
  sendMsgFirestore,
  setMsgFirestore,
  setUserMsgFirestore,
  updateUserMsgFirestore,
} from "../firebase/core/sFirestore";
// uID = user id
// rID = receiver id
const updateUserMsgList = function (uID, rID) {
  return f(updateUserMsgFirestore, uID, rID).catch(() =>
    f(setUserMsgFirestore, uID, rID)
  );
};
export const updateUsersMsgList = function (uID, rID) {
  return updateUserMsgList(uID, rID).then(() => updateUserMsgList(rID, uID));
};
// sID = sender id
// mID = message id (uID + rID)
export const sendMessage = function (mID, sID, message) {
  return f(sendMsgFirestore, mID, { sID: sID, msg: message }).catch(() =>
    f(setMsgFirestore, mID, { sID: sID, msg: message })
  );
};
export const getMsgs = function (mID) {
  return f(getMsgsFirestore, mID).then((rawData) => rawData.data());
};
