import { getNewUsersNotHiddenFirebase } from "../firebase/user";
import settings from "../settings.json";

const addUserID = function (rawItem) {
  return { uID: rawItem.id, ...rawItem.data() };
};

export const getNewUsersNotHidden = function () {
    return getNewUsersNotHiddenFirebase(settings.userDiscoverLimit).then(
      (rawUsers) => rawUsers.docs.map((rawUser) => addUserID(rawUser))
    );
  };