import {
  cancelLocalNotification,
  checkLocalNotificationsPermission,
  requestLocalNotificationsPermission,
  scheduleLocalNotification,
} from "../capacitor/localNotifications";
import { c, f } from "../c";
import { Timestamp } from "firebase/firestore";

const earlierMultipler = 50;

export const setSecondsForComingEvent = function (timestamp) {
  c("setSecondsForComingEvent", arguments);
  return timestamp - earlierMultipler;
};

export const isTimestampPast = function (timestamp) {
  c("isTimestampPast", arguments);
  const now = new Date().getTime();
  if (now > timestamp) return true;
  return false;
};

export const setupLocalNotifications = function () {
  c("setupLocalNotifications", arguments);
  return f(checkLocalNotificationsPermission).then(({ display: status }) => {
    if (status != "denied") return false;
    return f(requestLocalNotificationsPermission);
  });
};

export const scheduleNotification = function ({ title, body, seconds, extra }) {
  c("scheduleNotification", arguments);
  seconds = seconds * 100;
  if (isTimestampPast(seconds)) seconds = Timestamp.now();
  return f(
    scheduleLocalNotification,
    title,
    body,
    seconds,
    { at: new Date(seconds) },
    extra
  );
};

export const cancelScheduledNotification = function (seconds) {
  c("cancelScheduledNotification", arguments);
  return f(cancelLocalNotification, seconds * 100);
};

/*
const getDefaultEventArgs = function (timestamp, nID) {
  return {
    id: timestamp,
    extra: { url: `com.funo.funo/app/notifications/${nID}` },
    schedule: { at: new Date(timestamp) },
  };
};
*/

/*
  export const scheduleEventNotification = function (type, eName, nID, seconds) {
    const nearEvent = {
      title: "Etkinlik Yaklaşıyor :)",
      body: `${eName} adlı etkinlik yaklaşıyor. Hala katılmayı düşünüyor musun? :)`,
      schedule: { at: new Date((seconds - earlierMultipler) * 100) },
    };
    const startedEvent = {
      title: "Etkinlik Başladı :)",
      body: `${eName} adlı etkinlik başladı. Etkinliğe Katıldın mı? Daha da önemlisi Atmosferi paylaşmak ister misin? :)`,
      schedule: { at: new Date(seconds * 100) },
    };
    const endedEvent = {
      title: "Etkinlik Bitti :)",
      body: `${eName} adlı etkinlik bitti. Etkinlik ile ilgili yorumları alalım :)`,
      schedule: { at: new Date(seconds * 100) },
    };
    const load =
      type == "near" ? nearEvent : type == "started" ? startedEvent : endedEvent;
  
    load["extra"] = { url: `com.funo.funo/app/notifications/${nID}` };
    load["id"] = load.schedule.at.getTime();
    return scheduleLocalNotification(...load);
  };
  export const cancelScheduledEventNotifications = function (seconds, seconds2) {
    cancelLocalNotification((seconds - earlierMultipler) * 100);
    cancelLocalNotification(seconds * 100);
    cancelLocalNotification(seconds2 * 100);
  };
  */
