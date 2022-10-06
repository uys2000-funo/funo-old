import {
  getNewUsersNotHiddenFirestore,
  getUserFirestore,
} from "./core/sFirestore";
import { c, f } from "../c";

export const getUser = function (id) {
  c("Run: getUser", id);
  return f(getUserFirestore, id).then((re) => {
    return c("Res: getUser", re.data());
  });
};

export const getNewUsersNotHiddenFirebase = function (length) {
  return f(getNewUsersNotHiddenFirestore, length);
};
