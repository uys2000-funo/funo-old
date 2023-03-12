import { scheduleLocalNotification } from "../capacitor/localNotifications";
import localNotifications from "@/services/app/localNotifications.json";

export const scheduleLocalEventNotificattion = function (eID, eData, nIDs) {
  const near = localNotifications.near;
  const nid = eData.date.start.seconds - 1000;
  near.body = near.body.replace("{eName}", eData.general.name);
  near.extra.url = near.extra.url.replace("{nID}", nIDs[0]);
  scheduleLocalNotification(
    near.title,
    near.body,
    nid,
    { at: new Date(nid * 1000) },
    near.extra
  );

  const start = localNotifications.near;
  const sid = eData.date.start.seconds;
  start.body = start.body.replace("{eName}", eData.general.name);
  start.extra = start.extra.replace("{nID}", nIDs[1]);
  scheduleLocalNotification(
    start.title,
    start.body,
    sid,
    { at: new Date(sid * 1000) },
    end.extra
  );

  const end = localNotifications.end;
  const eid = eData.date.end.seconds;
  end.body = end.body.replace("{eName}", eData.general.name);
  end.extra = end.extra.replace("{nID}", nIDs[2]);
  scheduleLocalNotification(
    near.title,
    near.body,
    eid,
    { at: new Date(eid * 1000) },
    end.extra
  );
};
