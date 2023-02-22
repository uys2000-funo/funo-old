import {
  cancelLocalNotification,
  scheduleLocalNotification,
} from "../capacitor/localNotifications";

export const scheduleEventNotification = function (
  type,
  eName,
  nID,
  seconds
) {
  const nearEvent = {
    title: "Etkinlik Yaklaşıyor :)",
    body: `${eName} adlı etkinlik yaklaşıyor. Hala katılmayı düşünüyor musun? :)`,
    schedule: { at: new Date((seconds - 10) * 100) },
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

export const cancelScheduledEventNotifications = function (
  seconds,
  seconds2
) {
  cancelLocalNotification((seconds - 10) * 100);
  cancelLocalNotification(seconds * 100);
  cancelLocalNotification(seconds2 * 100);
};
