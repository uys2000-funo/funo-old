import { LocalNotifications } from "@capacitor/local-notifications";

export const checkLocalNotificationsPermission = function () {
  return LocalNotifications.checkPermissions();
};

export const requestLocalNotificationsPermission = function () {
  return LocalNotifications.requestPermissions();
};

export const scheduleLocalNotification = function (
  title = "",
  body = "",
  id = 0,
  schedule = { at: new Date() },
  extra = { url: "" }
) {
  return LocalNotifications.schedule({
    notifications: [
      {
        title: title,
        body: body,
        id: id,
        schedule: schedule,
        extra: extra,
      },
    ],
  });
};

export const cancelLocalNotification = function (id = 0) {
  return LocalNotifications.cancelNotification([{ id: id }]);
};
