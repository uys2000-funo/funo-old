import { scheduleLocalNotification } from "../capacitor/localNotifications";
import localNotifications from "@/services/app/localNotifications.json";
import { f, l } from "../debug";

export const scheduleLocalEventNotificattion = function (eID, eData, nIDs) {
  l("scheduleLocalEventNotificattion", arguments);
  const near = localNotifications.event.near;
  const nid = eData.date.start.seconds - 1000;
  near.body = near.body.replace("{eName}", eData.general.name);
  near.extra.url = near.extra.url.replace("{nID}", nIDs[0]);
  f(scheduleLocalNotification, [
    near.title,
    near.body,
    nid,
    { at: new Date(nid * 1000) },
    near.extra,
  ]);

  const start = localNotifications.event.start;
  l("scheduleLocalEventNotificattion", start);
  const sid = eData.date.start.seconds;
  start.body = start.body.replace("{eName}", eData.general.name);
  start.extra.url = start.extra.url.replace("{nID}", nIDs[1]);
  f(scheduleLocalNotification, [
    start.title,
    start.body,
    sid,
    { at: new Date(sid * 1000) },
    start.extra,
  ]);

  const end = localNotifications.event.end;
  const eid = eData.date.end.seconds;
  end.body = end.body.replace("{eName}", eData.general.name);
  end.extra.url = end.extra.url.replace("{nID}", nIDs[2]);
  f(scheduleLocalNotification, [
    end.title,
    end.body,
    eid,
    { at: new Date(eid * 1000) },
    end.extra,
  ]);
};
