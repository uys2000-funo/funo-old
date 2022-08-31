import { f } from "../c";
import { getEventFirestore } from "../firebase/sFirestore";

const error = function (reject, err = "TimeOut") {
  return setTimeout(() => {
    reject(err);
  }, 5000);
};
const getEventsCreatedPromise = function (events = []) {
  return new Promise((resolve, reject) => {
    let e = [];
    const err = error(reject, ["TimeOut", e]);
    events.forEach((element) => {
      f(getEventFirestore, element).then((res) => {
        e.push({ ...res.data(), id: res.id });
        clearTimeout(err);
        if (e.length == events.length) resolve(e);
      });
    });
  });
};
export const getEventsCreated = function (events) {
  return f(getEventsCreatedPromise, events);
};
