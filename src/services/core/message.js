import { f } from "../c";
import { sendMessageFirestore } from "../firebase/core/sFirestore";

export const sendMessage = function (uID, uID2, message) {
  const mID = [uID, uID2].sort();
  f(sendMessageFirestore, mID, message);
};
